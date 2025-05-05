import { JoinGameForm } from "@/components/quiz/client/join"

const JoinGamePage = async ({searchParams} : {searchParams: { roomid?: string }}) => {
  const roomId = searchParams.roomid ?? "";
  return (
    <div className="min-h-[calc(100vh-4rem)] w-full bg-gradient-to-b from-sky-50 to-white flex items-center justify-center p-4">
      {/* Main content */}
      <div className="z-10 w-full">
        <JoinGameForm defaultRoomId={roomId}/>
      </div>
    </div>
  )
}

export default JoinGamePage