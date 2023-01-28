import React from "react";
import { api } from "../utils/api";
import PostItem from "./PostItem";
import Head from "next/head";
import Spinner from "./Spinner";
import { FiCamera } from "react-icons/fi";
import { type Post } from "../types/types";

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
      <main className="pt-12 pb-4 mx-16">
        {(posts.data?.length || 0) > 0 ? (
          posts.data?.map(
            (
              post: Post,
              index: number
            ) => {
              return (
                <div key={index}>
                  <PostItem key={index} post={{ data: post, isLoading: posts.isLoading, isError: posts.isError, isSuccess: posts.isSuccess, isFetching: posts.isFetching }} />
                </div>
              );
            }
          )
        ) : (
          <div className="min-w-screen col-span-3 mt-8 flex w-full flex-col items-center">
            <>
              <div className="w-screen"></div>
              <div className="mb-4 mt-8 grid h-32 w-32 place-items-center rounded-full border-4">
                <FiCamera className="scale-x-[-5] scale-y-[5] transform" />
              </div>
              <div className="text-xl font-semibold">No posts yet</div>
            </>
          </div>
        )}
      </main>
    </>
  );
};

export default Home;
