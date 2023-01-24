import { useRouter } from "next/router";
import React from "react";
import PostItem from "../../components/PostItem";

const Post = () => {
  const router = useRouter();

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-zinc-700">
      <PostItem postID={router.query.post as string} />
    </div>
  );
};

export default Post;
