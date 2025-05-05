// "use client";

// import { useState } from "react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { QuestionsTable } from "./questions-table";
// import { PlayersTable } from "./players-table";
// import { DifficultyAnalysis } from "./difficulty-analysis";
// import { SummaryMetrics } from "./summary-metrics";
// import type { Analytics, GameResult, PlayerAnalytics, QuestionAnalytics } from "./types";

// interface QuizAnalyticsProps {
//   gameResult: GameResult;
//   className?: string;
//   data: Analytics | null;
//   questions: QuestionAnalytics[];
//   players: PlayerAnalytics[]
// }

// export function QuizAnalytics({
//   gameResult,
//   className = "",
//   data,
//   questions,
//   players
// }: QuizAnalyticsProps) {
//   const [activeTab, setActiveTab] = useState("overview");

//   if (data)
//     return (
//       <div className={`space-y-6 ${className}`}>
//         <SummaryMetrics
//           gameResult={gameResult}
//           questions={questions}
//           players={players}
//         />

//         <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//           <TabsList className="grid w-full grid-cols-3">
//             <TabsTrigger value="overview">Questions</TabsTrigger>
//             <TabsTrigger value="players">Players</TabsTrigger>
//             <TabsTrigger value="difficulty">Difficulty Analysis</TabsTrigger>
//           </TabsList>

//           <TabsContent value="overview" className="space-y-6 pt-4">
//             <QuestionsTable questions={questions} />
//           </TabsContent>

//           <TabsContent value="players" className="pt-4">
//             <PlayersTable players={players} />
//           </TabsContent>

//           <TabsContent value="difficulty" className="pt-4">
//             <DifficultyAnalysis
//               hardQuestions={data.hard_questions}
//               easyQuestions={data.easy_questions}
//             />
//           </TabsContent>
//         </Tabs>
//       </div>
//     );
// }
