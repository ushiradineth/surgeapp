import React, { useState, useRef, useEffect } from "react";
import { BiArrowBack } from "react-icons/bi";
import OptionMenu from "../components/OptionMenu";
import NextImage from "next/image";
import { DataContext } from "../pages/_app";
import { useContext } from "react";
import { api } from "../utils/api";
import { env } from "../env/client.mjs";
import Spinner from "../components/Spinner";
import Head from "next/head";
import { useRouter } from "next/router";

const Create = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [fileList, setFileList] = useState<FileList | null>(null);
  const files = fileList ? [...fileList] : [];
  const [discard, setDiscard] = useState(false);
  const data = useContext(DataContext);
  const router = useRouter();

  const setPost = api.post.setPost.useMutation({
    onSuccess: () => {
      data?.user?.refetch();
      router.push("/profile/" + data?.user?.data.handle);
    },
  });

  const SelectImage = () => {
    return (
      <div className={"absolute top-1/2 left-1/2 z-30 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 transform rounded-2xl bg-zinc-900 text-gray-300 transition-all duration-700"}>
        <div className="flex h-12 w-full items-center justify-center border-b-[1px] border-black font-semibold">Create new post</div>
        <div className="flex h-[93.7%] items-center justify-center">
          <div className="grid place-items-center gap-4">
            <svg aria-hidden="true" viewBox="0 0 36.129 36.129" className="h-52" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M30.32,7.163H1.811C0.812,7.163,0,7.974,0,8.975V31.15c0,0.998,0.812,1.811,1.811,1.811H30.32c1,0,1.812-0.812,1.812-1.811
                V8.974C32.129,7.972,31.32,7.163,30.32,7.163z M28.51,10.784v16.323l-4.141-5.026c-0.152-0.185-0.422-0.218-0.615-0.076
                l-4.816,3.517l-8.27-8.045c-0.096-0.094-0.229-0.135-0.358-0.127c-0.134,0.012-0.253,0.083-0.329,0.191l-6.359,9.099V10.784H28.51
                L28.51,10.784z M17.65,17.573c0-1.623,1.319-2.943,2.94-2.943c1.623,0,2.941,1.32,2.941,2.943c0,1.619-1.318,2.941-2.941,2.941
                C18.969,20.514,17.65,19.191,17.65,17.573z M34.771,26.396c-0.75,0-1.356-0.608-1.356-1.356V5.88H5.206
                c-0.75,0-1.357-0.606-1.357-1.356c0-0.749,0.607-1.356,1.357-1.356h29.565c0.75,0,1.357,0.607,1.357,1.356v20.517
                C36.129,25.788,35.521,26.396,34.771,26.396z"
              />
            </svg>
            <p className="select-none text-xl font-light">Add photos and videos here</p>
            <div onClick={() => inputRef.current?.click()} className="flex w-[70%] cursor-pointer items-center justify-center rounded-lg bg-blue-500 py-2 text-sm font-semibold text-white hover:bg-blue-600 active:bg-blue-400">
              Select From Computer
            </div>
            <input type="file" accept=".png, .jpg, .jpeg" ref={inputRef} onChange={(e) => setFileList(e.target.files)} style={{ display: "none" }} multiple />
          </div>
        </div>
      </div>
    );
  };

  const upload = () => {
    const Links: string[] = [];

    files.forEach(async (element, index) => {
      Links.push(`${env.NEXT_PUBLIC_SUPABASE_IMAGE_URL}Users/${data?.user?.data.id}/Posts/${(Number(data?.user?.data.posts.length) || 0) + 1}/${index}`);
      await data?.supabase.storage.from("surgeapp").upload(`/Users/${data?.user?.data.id}/Posts/${(Number(data?.user?.data.posts.length) || 0) + 1}/${index}`, element, {
        cacheControl: "1",
        upsert: true,
      });
    });

    if (Links.length === files.length) setPost.mutate({ id: data?.user?.data.id || "", links: Links, caption: (document.getElementById("post-caption") as HTMLInputElement).value || null });
  };

  const Caption = () => {
    return (
      <div className={"absolute top-1/2 left-1/2 z-30 h-fit min-h-[200px] w-[400px] -translate-x-1/2 -translate-y-1/2 transform rounded-2xl bg-zinc-900 text-gray-300"}>
        <div className="flex h-12 w-full items-center justify-center font-semibold">
          <div className="grid w-full grid-flow-col grid-cols-3 border-b-[2px] py-2">
            <div className="flex cursor-pointer items-center">
              <BiArrowBack className="z-10 ml-5 scale-150 cursor-pointer" onClick={() => setDiscard(true)} />
            </div>
            <div className="grid place-items-center">Caption</div>
            <button id="Log out" className="flex h-8 w-full cursor-pointer items-center justify-end pr-5 text-blue-400" onClick={() => upload()}>
              {setPost.isLoading ? <Spinner SpinnerOnly={true} fill={"fill-blue-300"} /> : "Share"}
            </button>
          </div>
        </div>
        <div className="mt-[1px] flex h-fit min-h-[151px]">
          <div className="w-[50%]">
            <NextImage src={URL.createObjectURL(files[0] || new Blob())} key="image" className="h-full w-full rounded-bl-2xl object-cover" height={500} width={400} alt={"image"} />
          </div>
          <div className="m-4 w-[50%]">
            <div className="flex gap-2 truncate">
              <NextImage src={data?.user?.data.image || "/image-placeholder.png"} key="image" className="h-8 w-8 rounded-full" height={100} width={100} alt={"image"} />
              {data?.user?.data.handle}
            </div>
            <textarea id="post-caption" placeholder="Write a caption..." maxLength={500} className={"min-h-24 mt-4 w-full rounded-xl p-2 focus:outline-none text-black"} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>Create</title>
        <meta name="description" content="SurgeApp by Ushira Dineth" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen w-screen bg-zinc-700">
        {discard && (
          <OptionMenu
            title="Discard post?"
            description="If you leave, your edits won't be saved."
            buttonPositive="Discard"
            buttonNegative="Cancel"
            onClickPositive={() => {
              setFileList(null);
              setDiscard(false);
            }}
            onClickNegative={() => {
              setDiscard(false);
            }}
          />
        )}
        <div className="">{fileList ? <Caption /> : <SelectImage />}</div>
      </main>
    </>
  );
};

export default Create;
