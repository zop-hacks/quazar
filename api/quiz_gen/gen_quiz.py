from quiz_gen.file_handler import file_handler
from socketio import AsyncServer
from quiz_gen.type_annotations import ContentError, Details, FileError, QuestionCreatingError
from quiz_gen.type_annotations import Details
from quiz_gen.agent_utils import agent_prompts as ap
from quiz_gen.agent_utils import question_workflow as qw
from utils.verify_user_jwt import supabase, verify_user

async def gen_quiz(data: Details, sio: AsyncServer, sid):
    """ Generates Quizzes based on user provided information.
        This uses SocketIO in order to update the user with their quiz creation status.

    Args:
        data (Details): User provided details 
        sio (AsyncServer): socketIO SIO
        sid (_type_): SocketIO user ID

    Raises:
        Exception: 
            ContentError: in case the content is not safe or complete gibberish, this will raise ContentError.
    """
    try:
        user = await verify_user(data.token)
        user_id = user.user.id
        if not user:
            sio.emit("status", {"message": "Authentication Required: Please Login to Continue", "type": "Error"}, namespace="/create")

    except Exception as e:
        await sio.emit("status", {"message": "Authentication Required: Please Login to Continue", "type": "Error"}, namespace="/create")
        raise Exception(e) 
    
    
    try:

        # Verifies user info, and makes sure it's safe
        await ap.verify_input(data)
        await sio.emit("status", {"message": "Analyzing Your Topic: Summarizing Key Information", "type": "sum"}, namespace="/create")

        # Summarizes user provided info
        suminfo = await ap.summarize_info(data)

        print(suminfo)
        await sio.emit("status", {"message": "Researching Your Topic: Gathering Relevant Content", "type": "research"}, namespace="/create")
        source_url = data.sourceMaterial
        content_sum = None
        if source_url:
            print("there's content!")
            content = await file_handler(source_url)
            if content:
                content_sum = await ap.summarize_content(suminfo, content)
                print(content_sum)


        # Researches on topic
        gathered_info = await ap.research(suminfo, content_sum)
        print(gathered_info)

        # Generates questions
        await sio.emit("status", {"message": "Generating Questions: Crafting Engaging Quiz Content", "type": "gen"}, namespace="/create")
        questions = await ap.gen_questions(suminfo, data, gathered_info)
        print(questions)

        # Adds incorrect answers, and verifies questions, in parallel.
        await sio.emit("status", {"message": "Verifying Questions: Ensuring Accuracy and Quality", "type": "iter"}, namespace="/create")
        new_questions = await qw.iter_questions(questions, suminfo, gathered_info)
        print(new_questions)

        # Uploades User provided info on supabase
        await sio.emit("status", {"message": "Saving Your Quiz: Adding to Your Collection", "type": "database"}, namespace="/create")
        response = (
            supabase.table("quizzes")
            .insert({"title": suminfo.title,
                    "questions": new_questions, "description": suminfo.description, "gathered_info": gathered_info, "user_info": suminfo.model_dump(), "user_id": user_id},
                        returning="representation")
            .execute()
        )
        await sio.emit("status", {"message": "Quiz Complete! Redirecting to Your Quizzes", "type": "finish"}, namespace="/create")
        await sio.disconnect(sid=sid)
    except ContentError as e:
        await sio.emit("status", {"message": e, "type": "Error"}, namespace="/create")

    except QuestionCreatingError as e:
        await sio.emit("status", {"message": e, "type": "Error"}, namespace="/create")
    
    except FileError as e:
        await sio.emit("status", {"message": e, "type": "Error"}, namespace="/create")

