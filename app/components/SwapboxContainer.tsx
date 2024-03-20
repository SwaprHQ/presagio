"use client";

import { Swapbox } from "@/app/components";
import { useRouter } from "next/navigation";

export const SwapboxContainer = () => {
  const router = useRouter();

  return (
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
  );
};
