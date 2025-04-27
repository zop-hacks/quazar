export interface LeaderboardObject {
    username: string
    score: string
  }
  
  export interface LeaderboardProps {
    leaderboard: Array<LeaderboardObject>
    nextQuestion: () => void
  }