"use client";
import { redirect } from "next/navigation";
import QuizCreator from "./quiz-creator";

const Page = () => {
  const onRedirect = (url: string) => {
    redirect(url);
  };
  return (
    <QuizCreator onRedirect={onRedirect}/>
  );
};
export default Page;
