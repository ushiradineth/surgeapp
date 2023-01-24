import Head from "next/head";
import { DataContext } from "../pages/_app";
import { useContext } from "react";

interface itemType {
  error: string;
}

const Error = (props: itemType) => {
  const data = useContext(DataContext);

  return (
    <>
      <Head>
        <title>Error • Clonegram</title>
        <meta name="description" content="SurgeApp by Ushira Dineth" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="grid h-screen place-items-center bg-zinc-900 text-3xl font-light text-white">{props.error}</main>
    </>
  );
};

export default Error;
