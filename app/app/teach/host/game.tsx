"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import { Lobby } from "@/app/teach/host/Lobby";
import { PresentQuestion } from "./question";
import { ShowCorrectAnswer } from "./show-correct-answer";
import {
  Leaderboard,
  PlayerMap,
  Question,
  RoomConnectorProps,
} from "@/app/types";
import { PresentFinalLeaderboard, PresentLeaderboard } from "./leaderboard";
import { API_ADDRESS } from "@/lib/utils";

// The RoomConnector Component is a host component, that connects the host to the socketio API (that has multiplayer capabilities), It contains:
// a Lobby component, a Question display component, a reveal_answer component, a leaderboard, and a final leaderboard & reveal_answer
export default function RoomConnector({
  quizTitle,
  quizUrl,
}: RoomConnectorProps) {
  const [roomId, setRoomId] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [playerList, setPlayerList] = useState<PlayerMap>({});
  const [gameState, setGameState] = useState<string>("lobby");
  const questionIndex = useRef<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question>({
    question: "",
    answers: [{ "": false }],
    info: { duration: 0 },
  });
  const [leaderboard, setLeaderboard] = useState<Leaderboard>();
  const fetchingRef = useRef(false);

  const socketRef = useRef<Socket>(null);
  useEffect(() => {
    if (!connecting) return;

    const roomSocket = io(`${API_ADDRESS}/room`, {
      path: "/ws/socket.io",
      transports: ["websocket"],
    });
    socketRef.current = roomSocket;

    roomSocket.on("connect", () => {
      console.log("Connected to /room namespace");
      roomSocket.emit("host");
    });

    roomSocket.on("room_created", (room) => {
      console.log("Room created:", room.room_id);
      setRoomId(room.room_id);
    });
    roomSocket.on("connect_error", (err) => {
      console.error("Connection error:", err);
    });

    roomSocket.on("question_response", (data) => {
      setCurrentQuestion(data);

      fetchingRef.current = false;
    });

    roomSocket.on("player_list", (players) => {
      //receives a player_list event from the server, to update the current player list locally
      setPlayerList(players);
    });
    roomSocket.on("current_leaderboard", (leaderboard) => {
      setLeaderboard(leaderboard);
      setGameState("reveal_answer");
    });

    roomSocket.on("final_leaderboard", (leaderboard) => {
      setLeaderboard(leaderboard);
      setGameState("final_reveal_answer");
    });
    return () => {
      roomSocket.disconnect();
    };
  }, [connecting]);

  const fetchQuestion = useCallback(() => {
    if (!socketRef.current || !roomId) return;

    socketRef.current.emit("get_question", {
      index: questionIndex.current,
      url: quizUrl,
      room_id: roomId,
    });
  }, [roomId, quizUrl]);

  const nextQuestion = () => {
    if (!fetchingRef.current) {
      fetchingRef.current = true;
      setCurrentQuestion({
        question: "",
        answers: [{ "": false }],
        info: { duration: 0 },
      })
      
      fetchQuestion();
      questionIndex.current +=  1;
      setTimeout(() => {
        setGameState("question");
      }, 300);
    }
  };
  const finishQuestion = () => {
    if (!socketRef.current || !roomId) return;

    socketRef.current.emit("question_finished", {
      room_id: roomId,
    });
  };

  useEffect(() => {
    if (connecting && gameState === "question" && roomId) {
      if (!fetchingRef.current) {
        fetchingRef.current = true;
        fetchQuestion();
        questionIndex.current += 1;
      }
    }
  }, [connecting, gameState, roomId, fetchQuestion]);
  const RenderState = () => {
    if (gameState === "lobby") {
      // Lobby state of the game
      return (
        <Lobby
          quizTitle={quizTitle}
          playerList={playerList}
          setGameState={setGameState}
          setConnecting={setConnecting}
          roomId={roomId}
        />
      );
    } else if (gameState === "question") {
      // Displays the question

      return (
        <>
          <PresentQuestion
            question={currentQuestion.question}
            answers={currentQuestion.answers.map((ans) => Object.keys(ans)[0])}
            duration={Number(currentQuestion.info.duration)}
            finishQuestion={finishQuestion}
          />
        </>
      );
    } else if (gameState === "reveal_answer") {
      // Reveals the correct answer

      return (
        <>
          <ShowCorrectAnswer
            answers={currentQuestion.answers}
            setLeaderboard={() => setGameState("leaderboard")}
          />
        </>
      );
    } else if (gameState === "final_reveal_answer" && leaderboard) {
      // Reveals the correct answer for the final time, before the final leaderboard

      return (
        <>
          <ShowCorrectAnswer
            answers={currentQuestion.answers}
            setLeaderboard={() => setGameState("final_leaderboard")}
          />
        </>
      );
    } else if (gameState === "leaderboard" && leaderboard) {
      // Displays a current leaderboard of the game

      return (
        <PresentLeaderboard
          leaderboard={leaderboard.leaderboard}
          nextQuestion={nextQuestion}
        />
      );
    } else if (gameState === "final_leaderboard" && leaderboard) {
      // Displays the final leaderboard, which displays the 1st, 2nd and 3rd places
      return <PresentFinalLeaderboard leaderboard={leaderboard.leaderboard} />;
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)]">
      <RenderState />
    </div>
  );
}
