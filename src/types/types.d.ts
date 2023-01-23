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
