import React from "react";
import { useRouter } from "next/router";

export const UnAuthedReminder = () => {
  const router = useRouter();
  
  return (
    <div className={"fixed bottom-0 left-0 flex h-12 w-screen items-center justify-center font-medium  gap-2 bg-zinc-500"}>
      Sign in to SurgeApp to see more!
      <button className={"rounded-full px-4 py-2 font-semibold no-underline transition bg-zinc-200"} onClick={() => router.push("/")}>
        Sign in
      </button>
    </div>
  );
};
