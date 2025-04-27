import socketio
from random import randint
from quiz_gen.gen_quiz import gen_quiz
from quiz_gen.type_annotations import Details
from utils.verify_user_jwt import supabase
import time
sio = socketio.AsyncServer(async_mode="asgi", cors_allowed_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
        "https://localhost",
        "http://localhost",
        "https://quizar-app--quazar-test001.us-central1.hosted.app",
        "*"
    ])
socket_app = socketio.ASGIApp(sio, socketio_path="/ws/socket.io")

rooms = {}
async def gen_roomid():
    """Generates a random room id"""
    while True:
        room_id = randint(100000, 999999)
        if room_id not in rooms:
            return str(room_id)
        
@sio.event(namespace='/create')
async def create_quiz(sid, data: Details):
    """Connects the create quiz route"""
    details = Details(**data)
    await gen_quiz(details, sio, sid)

@sio.event(namespace='/room')
async def connect(sid, environ):
    print(f"client {sid} connected successfuly! 0")

@sio.event(namespace='/room')
async def connect_player(sid, data):
    "Connects a player to the quiz"
    room_id = data.get("room_id")
    username = data.get("username")
    if room_id in rooms and username:
        await sio.enter_room(sid, room_id, namespace='/room')
        await sio.save_session(sid, {"type": "player", "username": username, "score": 0, "ans_status": "time_up"}, namespace='/room')
        players_list = await get_players_in_room(room_id)
        await sio.emit("player_list", players_list, namespace='/room', room=room_id)
        
        await sio.emit("player_connected_successfuly", {"username": username}, namespace='/room', room=room_id)

@sio.event(namespace='/room')
async def host(sid):
    "Connects a host to the quiz"
    print(f"Client connected: {sid}")

    room_id = str(await gen_roomid())
    rooms.update({room_id: {"current_question_index": 0}})

    await sio.enter_room(sid, room_id, namespace='/room')
    print(f"yay! room {room_id} was created")
    
    await sio.emit("room_created", {"room_id": room_id}, namespace='/room', room=room_id)
  
@sio.event(namespace='/room')
async def get_question(sid, data):
    """gets a question from db and sends it to the player and host."""
    url = data.get("url")
    index = data.get("index")
    room_id = data.get("room_id")
    rooms[room_id]["current_question_index"] = index
    
    response = (
        supabase.table("quizzes")
        .select("questions").eq("url", url)
        .execute()
    )
    questions = list(response.data[0]["questions"])
    question = questions[index]
    answers = response.data[0]["questions"][question]

    await reset_players_time_up(room_id)

    rooms[room_id]["current_question"] = {"question": question, "answers": answers[1:], "info": answers[0]["info"]}
    rooms[room_id]["question_duration"] = answers[0]["info"]["duration"]
    rooms[room_id]["question_start_time"]  = time.time()
    print(len(questions))
    rooms[room_id]["final_question"] = len(questions)-1 <= index
    print(rooms[room_id]["final_question"])

    await sio.emit("question_response", {"question": question, "answers": answers[1:], "info": answers[0]["info"]}, namespace='/room', room=room_id)
    await sio.emit("client_question_response", {"question": question, "answers": [next(iter(item)) for item in answers[1:]]}, namespace='/room', room=room_id)

@sio.event(namespace='/room')
async def validate_question(sid, data):
    index = data.get("index")
    room_id = data.get("room_id")
    session = await sio.get_session(sid, namespace='/room')
    if session.get("ans_status") != "time_up":
        return

    state = rooms.get(room_id, {})
    is_correct, = rooms[room_id]["current_question"]["answers"][index].values()
    start = state.get("question_start_time", time.time())
    total_secs = float(state.get("question_duration", 0))
    time_taken = time.time() - start
        
    if is_correct == True and time_taken < total_secs:
        max_score = 1000
        min_score = 500
        score = round(min_score + (max_score-min_score) * ((total_secs-time_taken)/total_secs)**1.5)
        await increment_player_score(sid, score)
        print(score)
    else:
        await player_wrong(sid)
        print("answer is wrong")

@sio.event(namespace='/room')
async def question_finished(sid, data):
    """
    Triggered when a question round ends.
    Expects: {"room_id": str}
    Emits both the full leaderboard and per-player statuses.
    """
    print("question is finished.")
    room_id = data.get("room_id")
    if not room_id:
        await sio.emit(
            "error",
            {"message": "Missing room_id"},
            namespace="/room",
            room=sid
        )
        return

    # broadcast the sorted leaderboard
    if not rooms[room_id]["final_question"]:
        await emit_current_leaderboard(room_id)
        # then send each player their own status/place
        await emit_personal_status(room_id)
    else:
        await emit_current_leaderboard(room_id, "final_leaderboard")
        # then send each player their own status/place
        await emit_personal_status(room_id, "final_player_status")

@sio.event(namespace='/room')
async def disconnect(sid):
    print(f"Client disconnected: {sid}")
    await sio.save_session(sid, {}, namespace='/room')

async def reset_players_time_up(room_id: str):
    """
    For every player in the given room, automatically set session['ans_status']='time_up',
    in case they won't answer the question, they will receive a time_up response when the question will end.
    """
    room_sids = sio.manager.rooms.get('/room', {}).get(room_id, set())
    for sid in room_sids:
        session = await sio.get_session(sid, namespace='/room')
        if not session or session.get("type") != "player":
            continue

        session["ans_status"] = "time_up"
        await sio.save_session(sid, session, namespace='/room')

async def emit_current_leaderboard(room_id: str, event_name: str = "current_leaderboard"):
    """
    Sends a 'current_leaderboard' event to everyone in the room,
    with a list of players sorted top-to-bottom by score.
    Payload:
      {"leaderboard": [{"username": str, "score": int}, …]}
    """
    players = await get_players_in_room(room_id)  # { sid: [username, score], … }
    # sort into [(sid, [username, score]), …] by score desc
    sorted_players = sorted(players.items(), key=lambda it: it[1][1], reverse=True)

    # build a simple list of dicts for the leaderboard
    leaderboard = [
        {"username": username, "score": score}
        for _, (username, score) in sorted_players
    ]

    await sio.emit(
        event_name,
        {"leaderboard": leaderboard},
        namespace="/room",
        room=room_id
    )

async def emit_personal_status(room_id: str, event_name: str = "player_status"):
    """
    Sends a 'player_status' event to each individual player SID with:
      {"ans_status": str, "score": int, "place": int}
    where place is 1-based index in the leaderboard.
    """
    players = await get_players_in_room(room_id)
    sorted_players = sorted(players.items(), key=lambda it: it[1][1], reverse=True)

    for place, (sid, (username, score)) in enumerate(sorted_players, start=1):
        session = await sio.get_session(sid, namespace="/room")
        if not session:
            continue

        await sio.emit(
            event_name,
            {
                "ans_status": session.get("ans_status"),
                "score": score,
                "place": place
            },
            namespace="/room",
            room=sid
        )

async def increment_player_score(
    sid: str,
    points: int
) -> bool:
    """
    Increment a player's score by the given points.

    Parameters:
      sid (str): Socket.IO session ID of the player.
      room_id (str): Room identifier where the player is.
      points (int): Number of points to add to the player's score.

    Returns:
      bool: True if update succeeded, False otherwise.
    """

    session = await sio.get_session(sid, namespace='/room')
    if not session:
        return False

    if session.get("type") != "player":
        return False

    current_score = session.get("score", 0)    
    session["score"] = current_score + points

    session["ans_status"] = 'correct'


    await sio.save_session(sid, session, namespace='/room')

async def player_wrong(
    sid: str,
) -> bool:
    """
    Saves that the user was wrong

    Parameters:
      sid (str): Socket.IO session ID of the player.

    Returns:
      bool: True if update succeeded, False otherwise.
    """

    session = await sio.get_session(sid, namespace='/room')
    if not session:
        return False

    if session.get("type") != "player":
        return False

    session["ans_status"] = 'wrong'
        

    await sio.save_session(sid, session, namespace='/room')
    return True

async def get_players_in_room(room_id: str) -> dict:
    """
    Returns a dictionary of players in the specified room.
    
    The structure of the returned dictionary is:
        {
            sid: [username, score],
            ...
        }
    Only sessions where "type" == "player" are included.
    
    Parameters:
        room_id (str): The room identifier.

    Returns:
        dict: A dictionary mapping each player SID to their [username, score].
    """
    players = {}
    # Access the set of all session IDs in the room
    room_sids = sio.manager.rooms.get('/room', {}).get(room_id, set())

    for sid in room_sids:
        # Retrieve the session data for each sid in the /room namespace
        session = await sio.get_session(sid, namespace="/room")
        # Check if session exists and if it's of type 'player'
        if session and session.get("type") == "player":
            username = session.get("username")
            score = session.get("score", 0)
            players[sid] = [username, score]
    
    return players