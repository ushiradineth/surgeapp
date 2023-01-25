import React from "react";
import { api } from "../utils/api";
import PostItem from "./PostItem";
import Head from "next/head";
import Spinner from "./Spinner";

const Home = () => {
  const posts = api.post.getAllPosts.useQuery(undefined, { retry: false, refetchOnWindowFocus: false });

  if (posts.isLoading) return <Spinner removeBackground={true} />;

  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="SurgeApp by Ushira Dineth" />
        <link rel="icon" href={"/favicon.ico"} />
      </Head>
      <main className="pb-4">
        {posts.data?.map((post, index) => {
          return (
            <div key={index}>
              <PostItem key={index} post={{ data: post, isLoading: posts.isLoading, isError: posts.isError, isSuccess: posts.isSuccess, isFetching: posts.isFetching }} />
            </div>
          );
        })}
      </main>
    </>
  );
};

export default Home;
