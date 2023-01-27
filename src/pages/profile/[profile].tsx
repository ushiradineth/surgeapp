import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import Spinner from "../../components/Spinner";
import { UnAuthedReminder } from "../../components/UnAuthedReminder";
import { api } from "../../utils/api";
import { IoMdAlbums } from "react-icons/io";
import { FiCamera } from "react-icons/fi";
import { DataContext } from "../_app";
import Error from "../../components/Error";
import { type Post } from "../../types/types";

const Profile = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const profile = router.query.profile as string;
  const data = useContext(DataContext);

  const query = api.user.getUser.useQuery({ handle: String(profile) }, { retry: false, refetchOnWindowFocus: false, enabled: Boolean(((status === "authenticated" && session?.user?.handle !== String(profile)) || status === "unauthenticated") && !router.query.user) });
  const page = session?.user?.handle !== String(profile) ? query : data?.user;

  const UserDetails = () => {
    return (
      <div className="mx-2 my-6 flex h-fit items-center justify-center gap-4 md:gap-8">
        <Image className="h-24 w-24 rounded-full bg-green-200 md:h-32 md:w-32" src={page?.data?.image || ""} height={200} width={200} alt="Profile Picture" priority />
        <div id="headline" className="grid grid-flow-row md:h-fit md:gap-3">
          <div id={"user-info"}>
            <div className="flex items-center gap-3">
              <div id="id" className="w-fit max-w-[200px] overflow-hidden truncate text-ellipsis text-xl sm:max-w-[300px]">
                {page?.data?.handle}
              </div>
            </div>
          </div>
          <div id="stats" className="grid grid-flow-col gap-2 text-sm font-normal">
            <div className="flex gap-1">
              <p className="font-semibold">{page?.data?.posts.length}</p>
              <p>posts</p>
            </div>
          </div>
          <div id="name" className="w-fit max-w-[200px] overflow-hidden truncate text-ellipsis text-sm font-semibold sm:max-w-[300px]">
            {page?.data?.name}
          </div>
        </div>
      </div>
    );
  };

  const Posts = () => {
    return (
      <div className="flex h-fit w-fit items-start justify-center border-t border-zinc-700 ">
        <div className="col-span-3 mt-1 mb-10 grid grid-cols-3 place-items-center gap-1 md:mb-0 ">
          {page?.data?.posts.length ? (
            page?.data?.posts
              ?.slice(0)
              .reverse()
              .map((element: Post, index: number) => (
                <div key={index} className={"relative h-fit w-fit"}>
                  {element.imageURLs.length > 1 && <IoMdAlbums className="absolute right-[4%] top-[4%] h-[8%] w-[8%] max-w-[30px] rotate-180 shadow-sm" />}
                  <Image src={element.imageURLs[0] || "https://zjbjwmzfbmoykisvhhie.supabase.co/storage/v1/object/public/surgeapp/Assets/image-placeholder.png"} height={500} width={500} onClick={() => router.push("/post/" + element.id)} alt={element.id} key={index} className={"z-10 aspect-square h-full max-h-[300px] w-full max-w-[300px] cursor-pointer object-cover"}></Image>
                </div>
              ))
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
        </div>
      </div>
    );
  };

  if (page?.isError) return <Error error="User not found" />;
  if (page?.isLoading) return <Spinner />;

  if (page?.isSuccess) {
    return (
      <>
        <Head>
          <title>{`${page?.data?.name} (@${page?.data?.handle})	• SurgeApp`}</title>
          <meta name="description" content="SurgeApp by Ushira Dineth" />
          <link rel="icon" href={"/favicon.ico"} />
        </Head>
        <main>
          {status === "unauthenticated" && <UnAuthedReminder />}
          <div id="Background" className={"flex h-fit pb-4 select-none flex-col items-center bg-zinc-900 text-gray-300"}>
            <div className="mt-4 grid place-items-center">
              <UserDetails />
              <Posts />
            </div>
          </div>
        </main>
      </>
    );
  }

  return <Spinner />;
};

export default Profile;
