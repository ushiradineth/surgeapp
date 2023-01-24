import React from "react";
import { useRouter } from "next/router";
import { api } from "../utils/api";
import { useSession } from "next-auth/react";
import { DataContext } from "../pages/_app";
import { useContext } from "react";
import PostItem from "./PostItem";
import Head from "next/head";

const Home = () => {
  const posts = api.post.getAllPosts.useQuery(undefined, { retry: false, refetchOnWindowFocus: false });

  return(
    <>
        <Head>
          <title>Home</title>
          <meta name="description" content="SurgeApp by Ushira Dineth" />
          <link rel="icon" href={"/favicon.ico"} />
        </Head>
      {posts.data?.map((post, index) => {
        return (
          <div key={index} >
            <PostItem key={index} post={{ data: post, isLoading: posts.isLoading, isError: posts.isError, isSuccess: posts.isSuccess }} />
          </div>
        );
      })}
    </>
  );
};

export default Home;
