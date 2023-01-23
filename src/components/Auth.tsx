import React from "react";
import { AiFillGithub } from "react-icons/ai";
import { signIn, useSession } from "next-auth/react";
import { env } from "../env/client.mjs";
import Head from "next/head.js";

const Auth = () => {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Login to the app</title>
        <meta name="description" content="surgeapp by Ushira Dineth" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="grid-rows-12 grid h-screen w-screen grid-flow-row lg:grid-flow-col lg:grid-cols-12">
        <div className="grid place-items-center bg-zinc-900 font-mono text-lg font-semibold text-white lg:col-span-4 lg:col-start-9 lg:row-span-2 ">
          <p>Surge SE Intership</p>
          <p>March 2023</p>
          <p>Ushira Dineth</p>
        </div>
        <div className="row-span-6 grid place-items-center lg:col-span-8 lg:col-start-1 lg:row-span-2">
          <div className="h-[60%] w-[60%] rounded-lg bg-red-300">
            <div>
              {session?.user?.email}
              <button className="flex w-full items-center justify-center gap-2 rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20" onClick={() => signIn("github", { callbackUrl: env.NEXT_PUBLIC_NEXTAUTH_URL })}>
                <AiFillGithub size={30} /> Sign in with GitHub
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Auth;
