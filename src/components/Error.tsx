import Head from "next/head";

const Error = (props: { error: string }) => {
  return (
    <>
      <Head>
        <title>Error • SurgeApp</title>
        <meta name="description" content="SurgeApp by Ushira Dineth" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="grid h-screen w-screen place-items-center bg-zinc-900 text-3xl font-light text-white">{props.error}</main>
    </>
  );
};

export default Error;
