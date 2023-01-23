import React from "react";
import { useRouter } from "next/router";

export const UnAuthedReminder = () => {
  const router = useRouter();
  
  return (
    <div className={"fixed bottom-0 left-0 flex h-12 w-screen items-center justify-center gap-2"}>
      Sign in to Clonegram to see more!
      <button className={"rounded-full px-4 py-2 font-semibold no-underline transition"} onClick={() => router.push("/")}>
        Sign in
      </button>
    </div>
  );
};
