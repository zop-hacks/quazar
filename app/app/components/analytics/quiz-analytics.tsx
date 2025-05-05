"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QuestionsTable } from "./questions-table";
import { PlayersTable } from "./players-table";
import { DifficultyAnalysis } from "./difficulty-analysis";
import { SummaryMetrics } from "./summary-metrics";
import type {
  Analytics,
  GameResult,
  PlayerAnalytics,
  QuestionAnalytics,
} from "./types";
import {
  processQuestionAnalytics,
  processPlayerAnalytics,
  getHardQuestions,
  getEasyQuestions,
  getAvgQuestion,
} from "./utils";

interface QuizAnalyticsProps {
  gameResult: GameResult;
  setAnalytics: Dispatch<SetStateAction<Analytics | null>>;
  className?: string;
  analytics: Analytics | null;
}

export function QuizAnalytics({
  gameResult,
  className = "",
  analytics,
  setAnalytics,
}: QuizAnalyticsProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [players, setPlayers] = useState<PlayerAnalytics[]>();
  const [questions, setQuestions] = useState<QuestionAnalytics[]>();

  useEffect(() => {
    if (analytics) return;
    const qs = processQuestionAnalytics(gameResult);
    const ps = processPlayerAnalytics(gameResult);
    setQuestions(qs);
    setPlayers(ps);
    const hardQuestions = getHardQuestions(qs);
    const easyQuestions = getEasyQuestions(qs);
    const avgQuestion = getAvgQuestion(gameResult);
    const id = gameResult.id;
    setAnalytics({
      question_analytics: qs,
      player_analytics: ps,
      hard_questions: hardQuestions,
      easy_questions: easyQuestions,
      avg_questions: avgQuestion,
      id: id,
    });
  }, [analytics, gameResult, setAnalytics]);
  if (questions && players && analytics) {
    return (
      <div className={`space-y-6 ${className}`}>
        <SummaryMetrics
          gameResult={gameResult}
          questions={questions}
          players={players}
        />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Questions</TabsTrigger>
            <TabsTrigger value="players">Players</TabsTrigger>
            <TabsTrigger value="difficulty">Difficulty Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 pt-4">
            <QuestionsTable questions={questions} />
          </TabsContent>

          <TabsContent value="players" className="pt-4">
            <PlayersTable players={players} />
          </TabsContent>

          <TabsContent value="difficulty" className="pt-4">
            <DifficultyAnalysis
              hardQuestions={analytics.hard_questions}
              easyQuestions={analytics.easy_questions}
            />
          </TabsContent>
        </Tabs>
      </div>
    );
  } else {
    return <div>Loading analytics…</div>;
  }
}
