"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type ControllerRenderProps } from "react-hook-form";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileUpload } from "@/components/ui/ufile-upload";

// the form component for the quiz creation process, uses zod for form validation
export const formSchema = z.object({
  topic: z
    .string()
    .min(2, {
      message: "Quiz topic must be at least 2 characters.",
    })
    .max(100, {
      message: "Quiz topic must not exceed 100 characters.",
    }),
  sourceMaterial: z.any().optional(),
  focusAreas: z
    .string()
    .max(200, {
      message: "Focus areas must not exceed 200 characters.",
    })
    .optional(),
  targetAudience: z
    .string()
    .min(2, {
      message: "Target audience must be at least 2 characters.",
    })
    .max(100, {
      message: "Target audience must not exceed 100 characters.",
    }),
  difficultyLevel: z.enum(["easy", "medium", "hard", "assistant"]),
  numberOfQuestions: z.coerce
    .number()
    .int()
    .min(1, {
      message: "At least 1 question is required.",
    })
    .max(50, {
      message: "Maximum 50 questions allowed.",
    }),
  objective: z
    .string()
    .min(2, {
      message: "Objective must be at least 2 characters.",
    })
    .max(300, {
      message: "Objective must not exceed 300 characters.",
    }),
  additionalInfo: z
    .string()
    .max(500, {
      message: "Additional information must not exceed 500 characters.",
    })
    .optional(),
});

// Define the form schema type
export type FormValues = z.infer<typeof formSchema>;

export function QuizForm({
  submitForm,
}: {
  submitForm: (p: FormValues) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
      focusAreas: "",
      targetAudience: "",
      difficultyLevel: "assistant",
      numberOfQuestions: 10,
      objective: "",
      additionalInfo: "",
      sourceMaterial: null,
    },
  });
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    submitForm(values);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="topic"
            render={({
              field,
            }: {
              field: ControllerRenderProps<FormValues, "topic">;
            }) => (
              <FormItem>
                <FormLabel>Quiz Topic</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Ancient Rome, Quantum Physics"
                    {...field}
                  />
                </FormControl>
                <FormDescription>The main subject of your quiz</FormDescription>
                <FormMessage />
              </FormItem>
            )}/>

        </div>

        

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="focusAreas"
            render={({
              field,
            }: {
              field: ControllerRenderProps<FormValues, "focusAreas">;
            }) => (
              <FormItem>
                <FormLabel className="after:content-[''] after:ml-0.5">
                  Focus Areas (optional)
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Battles, Leaders, Culture"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Specific aspects to focus on
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="targetAudience"
            render={({
              field,
            }: {
              field: ControllerRenderProps<FormValues, "targetAudience">;
            }) => (
              <FormItem>
                <FormLabel>Target Audience</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. High School Students, Professionals"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Who is this quiz designed for?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="difficultyLevel"
            render={({
              field,
            }: {
              field: ControllerRenderProps<FormValues, "difficultyLevel">;
            }) => (
              <FormItem>
                <FormLabel>Difficulty Level</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                    <SelectItem value="assistant">Assistant</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  How challenging should the questions be?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="numberOfQuestions"
            render={({
              field,
            }: {
              field: ControllerRenderProps<FormValues, "numberOfQuestions">;
            }) => (
              <FormItem>
                <FormLabel>Number of Questions</FormLabel>
                <FormControl>
                  <Input type="number" min={1} max={50} {...field} />
                </FormControl>
                <FormDescription>Between 1 and 50 questions</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="objective"
          render={({
            field,
          }: {
            field: ControllerRenderProps<FormValues, "objective">;
          }) => (
            <FormItem>
              <FormLabel>Quiz Objective</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="What is the purpose of this quiz? e.g. Test knowledge, Educational, Entertainment"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                The goal you want to achieve with this quiz
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="additionalInfo"
          render={({
            field,
          }: {
            field: ControllerRenderProps<FormValues, "additionalInfo">;
          }) => (
            <FormItem>
              <FormLabel className="after:content-[''] after:ml-0.5">
                Additional Information (optional)
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Any other preferences or information to consider"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Special instructions or preferences for the AI
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="sourceMaterial"
          render={({
            field,
          }: {
            field: ControllerRenderProps<FormValues, "sourceMaterial">;
          }) => (
            <FormItem>
              <FormLabel>Source Material (optional)</FormLabel>
              <FormControl>
                <FileUpload
                  value={field.value}
                  onChange={field.onChange}
                  accept=".pdf"
                  maxSize={10}
                />
              </FormControl>
              <FormDescription>
                Upload documents to use as source material (PDF up to
                10MB)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Quiz...
            </>
          ) : (
            "Generate Quiz"
          )}
        </Button>
      </form>
    </Form>
  );
}
