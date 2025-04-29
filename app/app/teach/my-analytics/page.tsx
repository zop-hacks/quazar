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
import { CalendarIcon, ChartNoAxesColumnIncreasing, PencilIcon, PlayIcon, Users } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const page = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }
  console.log(data.user.id);
  const { data: results, error: resulterror } = await supabase
    .from("game_results")
    .select("created_at, id, quiz_title, player_count")
    .eq("user_id", data.user.id);
  console.log(results)
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-left mb-6 gap-5">
        <h1 className="text-2xl font-bold">My Game Analytics</h1>
        <Link href="/gen-quiz">
          <Button className="w-fit">
            <PencilIcon className="mr-2 h-4 w-4" />
            Create New Quiz
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results &&
          results.map((result) => (
            <Card
              key={result.id}
              className="overflow-hidden hover:shadow-md transition-shadow"
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">{result.quiz_title}</CardTitle>
                <CardDescription className="flex items-center text-xs">
                  <CalendarIcon className="mr-1 h-3 w-3" />
                  {new Date(result.created_at).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-zinc-600  line-clamp-2 flex gap-1">
                {result.player_count}
                  <Users />
                  
                </p>
              </CardContent>
              <CardFooter className="h-full items-end flex justify-between pb-2">
                <Link href={`/teach/my-analytics/${result.id}`}>
                  <Button>
                    <ChartNoAxesColumnIncreasing />
                    Show Analytics
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
      </div>

      {results === null ||
        (results.length === 0 && resulterror && (
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
