import { useRouter } from "next/router";
import React from "react";
import PostItem from "../../components/PostItem";


const Post = () => {
  const router = useRouter();

  return <PostItem postID={router.query.post as string} />
};

export default Post;
