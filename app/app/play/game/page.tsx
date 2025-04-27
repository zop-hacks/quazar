"use server"
import { redirect } from "next/navigation";
import GameConnector from "./game-logic";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { roomid, username  } = await searchParams;
  if (!roomid || typeof roomid !== "string" || !username || typeof username !== "string") {
    redirect('/host/quiz-error?message=No quiz id was provided, or was not valid, try creating a new quiz instead.')
  }
  console.log(roomid, username)
  
  return (
      <GameConnector room_id={roomid} username={username}/>
  );
};
export default page;
