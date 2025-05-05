import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";
import { CalendarIcon, PencilIcon, PlayIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const page = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }
  const { data: quizzes, error: quizerror } = await supabase
    .from("quizzes")
    .select("title, url, id, description, created_at")
    .eq("user_id", data.user.id);
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-left mb-6 gap-5">
        <h1 className="text-2xl font-bold">My Quizzes</h1>
        <Link href="/gen-quiz">
          <Button className="w-fit">
            <PencilIcon className="mr-2 h-4 w-4" />
            Create New Quiz
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes &&
          quizzes.map((quiz) => (
            <Card
              key={quiz.id}
              className="overflow-hidden hover:shadow-md transition-shadow"
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">{quiz.title}</CardTitle>
                <CardDescription className="flex items-center text-xs">
                  <CalendarIcon className="mr-1 h-3 w-3" />
                  {new Date(quiz.created_at).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-zinc-600  line-clamp-2">
                  {quiz.description}
                </p>
              </CardContent>
              <CardFooter className="h-full items-end flex justify-between pb-2">
                <Link href={`/teach/host?quiz=${quiz.url}`}>
                  <Button>
                    <PlayIcon />
                    Play
                  </Button>
                </Link>
                <Link href={`/teach/edit-quiz?quiz=${quiz.url}`}>
                  <Button variant="secondary">
                    <PencilIcon />
                    Edit
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
      </div>

      {quizzes === null ||
        (quizzes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-zinc-500  mb-4">
              You haven't created any quizzes yet.
            </p>
            <Link href="/gen-quiz">
              <Button>Create Your First Quiz</Button>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default page;
