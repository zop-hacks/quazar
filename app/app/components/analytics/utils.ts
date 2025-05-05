import type {
  GameResult,
  QuestionAnalytics,
  PlayerAnalytics,
  AvgQuestions,
} from "./types";

export function processQuestionAnalytics(
  gameResult: GameResult
): QuestionAnalytics[] {
  const questions = Object.keys(gameResult.question_results);

  return questions.map((question) => {
    const result = gameResult.question_results[question][0];
    const correct = result.correct || 0;
    const wrong = result.wrong || 0;
    const not_answered = result.not_answered || 0;
    const total = correct + wrong + not_answered;

    return {
      question,
      correct,
      wrong,
      not_answered,
      total,
      correctPercentage: total > 0 ? (correct / total) * 100 : 0,
    };
  });
}

export function processPlayerAnalytics(
  gameResult: GameResult
): PlayerAnalytics[] {
  const players = Object.keys(gameResult.player_data);

  return players.map((username) => {
    const playerAnswers = gameResult.player_data[username];
    let correct = 0;
    let wrong = 0;
    let not_answered = 0;

    Object.values(playerAnswers).forEach((status) => {
      if (status === "correct") correct++;
      else if (status === "wrong") wrong++;
      else if (status === "time_up") not_answered++;
    });

    const total = correct + wrong + not_answered;

    return {
      username,
      correct,
      wrong,
      not_answered,
      total,
      correctPercentage: total > 0 ? (correct / total) * 100 : 0,
    };
  });
}

export function getAvgQuestion(gameResult: GameResult): AvgQuestions {
  const questions = Object.keys(gameResult.question_results);
  const playerCount = gameResult.player_count;

  let correct = 0;
  let wrong = 0;
  let not_answered = 0;

  questions.forEach((q) => {
    const result = gameResult.question_results[q][0];
    if (result.correct) {
      correct += 1;
    } else if (result.wrong) {
      wrong += 1;
    } else if (result.not_answered) {
      not_answered += 1;
    }
  });
  return {
    correct: correct / playerCount,
    wrong: wrong / playerCount,
    not_answered: not_answered / playerCount,
  };
}

export function getHardQuestions(
  questions: QuestionAnalytics[]
): QuestionAnalytics[] {
  return questions.filter((q) => q.correctPercentage < 25);
}

export function getEasyQuestions(
  questions: QuestionAnalytics[]
): QuestionAnalytics[] {
  return questions.filter((q) => q.correctPercentage > 75);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

