"use client";
import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { getJWTtoken } from "@/utils/gen-jwt";
import { FormValues, QuizForm } from "../../components/quiz-creator/quiz-form";
import { ShowQuizStatus } from "@/components/quiz-creator/show-quiz-creator";
import { API_ADDRESS } from "@/lib/utils";
import { FileUploader } from "./supa-file-uploader";

interface CreateQuizPayload extends FormValues {
  token: string;
}

type QuizCreatorProps = {
  onRedirect: (url: string) => void;
};

export default function QuizCreator({ onRedirect }: QuizCreatorProps) {
  const [payload, setPayload] = useState<CreateQuizPayload | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [is_connected, setConnected] = useState<boolean>(false);
  const [quizStatMessage, setQuizStatMessage] =
    useState<string>("Connecting to API");

  useEffect(() => {
    if (!payload) return;

    const socket = io(`${API_ADDRESS}/create`, {
      path: "/ws/socket.io",
      transports: ["websocket"],
    });
    setSocket(socket);

    socket.on("connect", () => {
      console.log("Connected to /create namespace");
      setConnected(true);
      socket.emit("create_quiz", payload);
    });
    socket.on("status", (data) => {
      console.log(data);
      if (data.type === "error") {
        console.log("error");
        onRedirect(`/error?message=${data.message}`);
      } else if (data.type === "finish") {
        onRedirect("/teach/my-quizzes");
      }
      setQuizStatMessage(data.message);
    });
    socket.on("error", (data) => {
      onRedirect(`/error?message=${data.message}`)
    });
    return () => {
      socket.disconnect();
      setSocket(null);
    };
  }, [payload, onRedirect]);

  // Called by the form
  const submitForm = async (values: FormValues) => {
    let sourceMaterialUrl: string | undefined;

    if (values.sourceMaterial instanceof File) {
      sourceMaterialUrl = await FileUploader(values.sourceMaterial.name, values.sourceMaterial)
    }

    try {
      const token = await getJWTtoken();
      setPayload({ ...values, sourceMaterial: sourceMaterialUrl, token });
    } catch (err) {
      console.error("JWT error:", err);
      
    }
  };

  return (
    <>
      {is_connected ? (
        <DisplayQuizStatus quizStatMessage={quizStatMessage} />
      ) : (
        <ShowQuizForm submitForm={submitForm} />
      )}
    </>
  );
}

const ShowQuizForm = ({
  submitForm,
}: {
  submitForm: (p: FormValues) => void;
}) => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center py-6">
      <div className="container max-w-4xl px-4 md:px-6">
        <div className="mb-8 space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Create Quiz</h1>
          <p className="text-muted-foreground">
            Fill in the details below to generate a custom quiz with our AI
          </p>
        </div>
        <div className="mx-auto w-full">
          <QuizForm submitForm={submitForm} />
        </div>
      </div>
    </div>
  );
};

const DisplayQuizStatus = ({
  quizStatMessage,
}: {
  quizStatMessage: string;
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] bg-gradient-to-b from-zinc-50 to-white p-4">
      <ShowQuizStatus quizStatMessage={quizStatMessage} />
    </div>
  );
};
