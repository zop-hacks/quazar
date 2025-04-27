"use client";
import { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { ClientLobby } from "./ClientLobby";
import { ClientPresentQuestion } from "./client-present-question";
import { PresentFinalPlayerState, ShowPlayerState } from "./PlayerState";
import { CurrentPlayerState } from "@/app/types";
import { API_ADDRESS } from "@/lib/utils";

type PlayerData = {
  score: number;
  place: number;
  ans_status: CurrentPlayerState;
};
type CurrentQuestion = {
  question: string
  answers: []
  
}

// Connects the client on a socketio conenction (multiplayer) with the server, which sends the current status, current question, etc... and sends feedback based on responses.

export default function GameConnector({
  room_id,
  username,
}: {
  room_id: string;
  username: string;
}) {
  const [connecting, setConnecting] = useState(false);
  const [gameState, setGameState] = useState("lobby");
  const [currentQuestion, setCurrentQuestion] = useState<CurrentQuestion>({question: "", answers: []});
  const [answer, setAnswer] = useState(-1);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);

  useEffect(() => {
    const roomSocket = io(`${API_ADDRESS}/room`, {
      path: "/ws/socket.io",
      transports: ["websocket"],
    });
    setSocket(roomSocket);

    roomSocket.on("connect", () => {
      console.log("Connected to /room namespace");
      roomSocket.emit("connect_player", {
        username: username,
        room_id: room_id,
      });
    });
    roomSocket.on("client_question_response", (data) => { // displays a question when event is received
      setGameState("question");
      setCurrentQuestion(data);
      setAnswer(-1);
    });
    roomSocket.on("player_status", (data) => { // receives an event of current player status, when the leaderboard is shown in the host
      console.log(data);
      setPlayerData({
        score: data.score,
        place: data.place,
        ans_status: data.ans_status,
      });
      setGameState("leaderboard");
    });

    roomSocket.on("final_player_status", (data) => {
      console.log(data);
      setPlayerData({
        score: data.score,
        place: data.place,
        ans_status: data.ans_status,
      });
      setGameState("final_leaderboard");
    });

    roomSocket.on("connect_error", (err) => {
      console.error("Connection error:", err);
    });

    return () => {
      roomSocket.disconnect();
    };
  }, [connecting]);

  if (gameState === "lobby") {
    return <ClientLobby username={username} />;
  } else if (gameState === "question") {
    return (
      // displays a question
      <ClientPresentQuestion
        socket={socket}
        question={currentQuestion.question}
        answers={currentQuestion.answers}
        roomId={room_id}
      />
    );
  } else if (gameState === "leaderboard") {
    if (!playerData?.ans_status) return;
    return (
      // displays a current player state
      <ShowPlayerState
        state={playerData?.ans_status}
        score={playerData?.score}
        place={playerData?.place}
      />
    );
  } else if (gameState === "final_leaderboard") {
    // displays a final player state
    if (!playerData?.ans_status) return;
    return (
      <PresentFinalPlayerState
        state={playerData?.ans_status}
        score={playerData?.score}
        place={playerData?.place}
        username={username}
      />
    );
  }
}