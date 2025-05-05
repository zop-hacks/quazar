"use client";
import { Analytics, AnalyticsSum, GameResult} from "@/app/components/analytics";
import { QuizAnalytics } from "@/app/components/analytics/quiz-analytics";
import { H1 } from "@/components/ui/utypography";
import { useEffect, useState } from "react";
import { summarizeAnalytics } from "./actions";
import { SummaryButton } from "@/app/components/analytics/info-summary";

const LoadAnalytics = ({ results }: { results: GameResult }) => {
  const [ analytics, setAnalytics ] = useState<Analytics | null>(null)
  const [ hasClicked, setHasClicked ] = useState<boolean>(false)
  const [ analyticsSum, setAnalyticsSum] = useState<AnalyticsSum | null>(null)
  useEffect(() => {
    if (!analytics || !hasClicked) return 

    const sendAnalytics = async(analytics: Analytics) => {
      const analyticsSummary = await summarizeAnalytics(analytics)
      setAnalyticsSum(analyticsSummary)
    }

    sendAnalytics(analytics)
  }, [hasClicked])
  if(results) {
    return (
      <>
          <div className="container mx-auto py-8 flex flex-col gap-3">
           <H1>Quiz Results: {results.quiz_title}</H1>
           <QuizAnalytics gameResult={results} analytics={analytics} setAnalytics={setAnalytics}/>
           <SummaryButton analytics={analytics} setHasClicked={setHasClicked} analyticsSum={analyticsSum}/>
         </div>
      </>
    );
  }
  
};

export default LoadAnalytics;
