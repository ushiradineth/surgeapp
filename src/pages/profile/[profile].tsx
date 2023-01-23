import { useSession } from "next-auth/react";
import { Head } from "next/document";
import Image from "next/image";
import router, { useRouter } from "next/router";
import React from "react";
import { Spinner } from "../../components/Spinner";
import { UnAuthedReminder } from "../../components/UnAuthedReminder";
import { api } from "../../utils/api";
import { IoMdAlbums } from "react-icons/io";
import { FiCamera } from "react-icons/fi";

const Profile = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const profile = router.query.profile as string;
  const page = api.user.getUser.useQuery({ handle: profile }, { retry: false, refetchOnWindowFocus: false });
  console.log(page.data);

  return (
    <>
      {/* <Head>
        <title>{`${page?.data?.name} (@${page?.data?.handle})	• Clonegram`}</title>
        <meta name="description" content="Clonegram by Ushira Dineth" />
        <link rel="icon" href={"/favicon.ico"} />
      </Head> */}
      <main>
        {status === "unauthenticated" && <UnAuthedReminder />}
        <div>
          <div id="Background" className={"flex h-fit select-none flex-col items-center bg-gray-900"}>
            <div className="mt-8 grid w-fit place-items-center">
              <div id="user-details" className="flex h-fit w-[400px] py-5 md:w-[500px] md:items-center md:justify-center  lg:w-[700px]">
                <Image className="mr-2 ml-2 mt-4 h-24 w-24 rounded-full md:mr-10 md:flex md:w-24 md:scale-125 md:justify-center" src={session?.user?.image || ""} height={96} width={96} alt="Profile Picture" priority />
                <div id="headline" className="mb-4 mt-6 ml-4 grid grid-flow-row md:h-fit md:gap-3">
                  <div id="user-info">
                    <div className="flex items-center gap-3">
                      <div id="id" className="max-w-[200px] overflow-hidden text-ellipsis text-xl">
                        {page?.data?.handle}
                      </div>
                    </div>
                  </div>
                  <div id="stats" className="hidden grid-flow-col gap-2 text-sm font-normal md:grid">
                    <div className="flex gap-1">
                      {/* <p className="font-semibold">{page?.data?.posts.length}</p> */}
                      <p className={"text-gray-300"}>posts</p>
                    </div>
                  </div>
                  <div id="details" className="hidden text-sm font-semibold md:grid">
                    <div id="name">{page?.data?.name}</div>
                  </div>
                </div>
              </div>
              <div id="details-mobile" className="mb-5 w-[460px] px-8 text-sm font-semibold md:hidden">
                <div id="name" className="">
                  {page?.data?.name}
                </div>
              </div>
              <div id="stats-mobile" className="z-10 hidden w-full grid-flow-col place-items-center border-y border-zinc-700 py-2 text-sm font-normal md:grid">
                <div className="grid place-items-center">
                  {/* <p className="font-semibold">{page?.data?.posts.length}</p> */}
                  <p className={"text-gray-300"}>posts</p>
                </div>
              </div>
              <div id={"posts"} className="flex h-fit min-h-screen w-fit items-start justify-center md:border-t md:border-zinc-700 ">
                <div className="col-span-3 mt-1 mb-10 grid grid-cols-3 place-items-center gap-1 md:mb-0 ">
                  {/* {page?.data?.posts.length ? (
                    page?.data?.posts
                      ?.slice(0)
                      .reverse()
                      .map((element, index) => (
                        <div key={index} className={"relative h-fit w-fit"}>
                          {element.imageURLs.length > 1 && <IoMdAlbums className=" absolute right-[4%] top-[4%] h-[8%] w-[8%] max-w-[30px] rotate-180 shadow-sm" />}
                          <Image src={element.imageURLs[0] || "/image-placeholder.png"} height={500} width={500} onClick={() => router.push("/post/" + element.id)} alt={element.id} key={index} className={"aspect-1 z-10 h-full max-h-[300px] w-full max-w-[300px] cursor-pointer bg-red-300 object-cover "}></Image>
                        </div>
                      ))
                  ) : (
                    <div className="min-w-screen col-span-3 mt-8 flex h-full min-h-screen w-full flex-col items-center">
                      <>
                        <div className="w-screen"></div>
                        <div className="mb-4 mt-8 grid h-32 w-32 place-items-center rounded-full border-2">
                          <FiCamera className="scale-x-[-5] scale-y-[5] transform" />
                        </div>
                        <div className="text-xl">No posts yet</div>
                      </>
                    </div>
                  )} */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Profile;