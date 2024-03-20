"use client";

import { Swapbox } from "@/app/components";
import { useRouter } from "next/navigation";

export default function QuestionPage({
  params,
}: {
  params: { question: string };
}) {
  console.log("question:", params.question);
  const router = useRouter();

  return (
    <main className="w-full px-6 mt-12 space-y-12 md:flex md:flex-col md:items-center">
      <div>
        <div
          className="flex items-center mb-3 space-x-2"
          onClick={() => router.back()}
        >
          <div className="p-1 rounded-lg bg-stone-800">{"<"}</div>
          <p className="cursor-pointer hover:underline">Go back</p>
        </div>
        <Swapbox />
      </div>
    </main>
  );
}
