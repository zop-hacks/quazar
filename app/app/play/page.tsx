"use client";
import { useSearchParams } from "next/navigation";

import { JoinGameForm } from "@/components/quiz/client/join";
import { Suspense } from "react";

const JoinGamePage = () => {
  const searchParams = useSearchParams();
  let roomId: string | undefined | null = searchParams.get("roomId");
  if (!roomId) {
    roomId = undefined;
  }
  return (
    <div className="min-h-[calc(100vh-4rem)] w-full bg-gradient-to-b from-sky-50 to-white flex items-center justify-center p-4">
      {/* Main content */}
      <div className="z-10 w-full">
        <JoinGameForm defaultRoomId={roomId} />
      </div>
    </div>
  );
};
const Page = () => {
  return (
    <Suspense>
      <JoinGamePage></JoinGamePage>
    </Suspense>
  );
};

export default Page;
