import { type User, type Post } from "@prisma/client";

export interface UserType {
  data: User & {
    posts: Post[];
    likes: Post[];
  };
  refetch: any;
  isSuccess: boolean;
  isLoading: boolean;
  isError: boolean;
  isRefetching: boolean;
  isFetching: boolean;
  isFetched: boolean;
}

export interface MemoType {
  user: UserType | null;
  supabase: any | null;
}

export type Post = {
  id: string;
  index: number;
  caption: string;
  createdAt: Date;
  userId: string;
  imageURLs: string[];
}

export type User = {
  id: string
  handle: string
  password: string | null
  name: string | null
  email: string | null
  emailVerified: Date | null
  image: string | null
}