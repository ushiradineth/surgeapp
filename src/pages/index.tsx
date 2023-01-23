import Head from "next/head";
import { useSession } from "next-auth/react";

import Auth from "../components/Auth";
import Home from "../components/Home";
import  Spinner  from "../components/Spinner";

const Index = () => {
  const { status } = useSession();

  return (
    <>
      <Head>
        <title>Welcome!</title>
        <meta name="description" content="Ushira Dineth" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-900 text-white">{status === "loading" ? <Spinner /> : status === "authenticated" ? <Home /> : <Auth />}</main>
    </>
  );
};

export default Index;
