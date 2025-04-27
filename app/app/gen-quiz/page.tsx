"use client";
import { redirect } from "next/navigation";
import QuizCreator from "./quiz-creator";

const Page = () => {
  const onRedirect = (url: string) => {
    setTimeout(() => {
    redirect(url);
    }, 150)
  };
  return (
    <QuizCreator onRedirect={onRedirect}/>
  );
};
export default Page;
