import { AiFillCloseCircle, AiOutlineClose } from "react-icons/ai";
import Spinner from "./Spinner";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { BiUserPlus } from "react-icons/bi";
import { api } from "../utils/api";
import ProfileLink from "./ProfileLink";
import { User } from "../types/types";

const MobileSearch = () => {
  const [isEmpty, setisEmpty] = useState(true);
  const [focus, setFocus] = useState(false);
  const [recentSearches, setRecentSearches] = useState<{ userID: string; userName: string; userImage: string; userHandle: string }[]>([]);
  const [keyword, setKeyword] = useState<string>();
  const [users, setUsers] = useState<{ userID: string; userName: string; userImage: string; userHandle: string }[]>([]);
  const router = useRouter();
  const { data: session } = useSession();

  const usersList = api.user.getUsersSearch.useMutation({
    onSuccess: (data: User[]) => {
      const dataArr: { userID: string; userName: string; userImage: string; userHandle: string }[] = [];
      data.forEach((user: User) => {
        if (user.name && user.image) dataArr.push({ userID: user.id, userName: user.name, userImage: user.image, userHandle: user.handle });
      });
      setUsers([...dataArr]);
    },
  });

  const onClickProfile = (user: { userID: string; userName: string; userImage: string; userHandle: any }) => {
    const tempRecentSearches = recentSearches;

    tempRecentSearches.forEach((element, index) => {
      if (element.userID === user.userID) {
        tempRecentSearches.splice(index, 1);
      }
    });

    tempRecentSearches.splice(0, 0, user);
    tempRecentSearches.splice(5, 1);

    localStorage.setItem("surgeApp.recentSearch", JSON.stringify(tempRecentSearches));

    router.push({ pathname: "/profile/" + user.userHandle });
  };

  if (typeof document !== "undefined" || typeof window !== "undefined") {
    (document.getElementById("search") as HTMLInputElement) &&
      (document.getElementById("search") as HTMLInputElement).addEventListener("keyup", () => {
        clearTimeout(0);
        if ((document.getElementById("search") as HTMLInputElement).value) {
          setTimeout(() => setKeyword((document.getElementById("search") as HTMLInputElement)?.value), 1000);
        }
        setTimeout(() => setisEmpty(!Boolean((document.getElementById("search") as HTMLInputElement)?.value)), 1000);
      });
  }

  const removeRecentSearch = (user: { userID: string; userName: string; userImage: string; userHandle: any }) => {
    const tempRecentSearches = recentSearches;

    tempRecentSearches.forEach((element, index) => {
      if (element.userID === user.userID) {
        tempRecentSearches.splice(index, 1);
      }
    });

    localStorage.setItem("surgeApp.recentSearch", JSON.stringify(tempRecentSearches));
    setRecentSearches(tempRecentSearches);
  };

  useEffect(() => {
    setUsers([]);
    if (keyword) {
      usersList.mutate({ key: keyword });
    }
  }, [keyword]);

  useEffect(() => {
    if (localStorage.getItem("surgeApp.userID") !== session?.user?.id) {
      localStorage.removeItem("surgeApp.recentSearch");
      if (session?.user?.id) localStorage.setItem("surgeApp.userID", session?.user?.id);
    }

    const tempRecentSearches: any[] = [];
    const oldRecentSearch = JSON.parse(localStorage.getItem("surgeApp.recentSearch") || "{}");

    if (oldRecentSearch.forEach) {
      oldRecentSearch.forEach((element: any) => {
        tempRecentSearches.push(element);
      });

      setRecentSearches(tempRecentSearches);
    }
  }, []);

  const NoResults = (props: { text: string }) => {
    return (
      <div className="flex flex-col items-center justify-center p-4 pt-8">
        <div className="mb-4 grid h-32 w-32 place-items-center rounded-full border-2">
          <BiUserPlus className="scale-x-[-4] scale-y-[4] transform" />
        </div>
        <div className="text-sm">{props.text}</div>
      </div>
    );
  };

  return (
    <>
      <div onFocus={() => setFocus(true)} className={"z-30 h-10 w-[20%] min-w-[70%] sm:min-w-[320px] absolute right-3 sm:right-0 rounded-xl bg-zinc-800"}>
        <div className={"flex flex-row items-center gap-1 rounded-xl px-2 py-[7px]"}>
          <input autoComplete={"off"} type="text" id="search" className={"w-full text-zinc-300 placeholder:text-gray-400 focus:outline-none bg-zinc-800"} placeholder="Search" maxLength={50}></input>
          <AiFillCloseCircle
            color="gray"
            onClick={() => {
              (document.getElementById("search") as HTMLInputElement).value = "";
              setisEmpty(true);
              setFocus(false);
            }}
            className="cursor-pointer"
          />
        </div>
      </div>

      {focus && (
        <div onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} className={" absolute right-3 text-gray-300 sm:right-0 top-14 flex h-fit max-h-72 min-w-[70%] sm:min-w-[320px] items-center justify-center rounded-2xl pt-2 pb-8 bg-zinc-900 border border-zinc-700"}>
          {usersList.isLoading ? (
            <div className="mt-6 grid place-items-center">
              <Spinner SpinnerOnly={true} />
            </div>
          ) : isEmpty ? (
            <div>
              <p className="mt-4 ml-4 text-lg ">Recent</p>
              <div className={"grid place-items-center"}>{recentSearches.length > 0 ? recentSearches.map((user, index) => <ProfileLink user={user} key={index} index={index} onClickHandler={() => onClickProfile(user)} action={<AiOutlineClose className={"scale-150 cursor-pointer text-gray-300 hover:text-white"} onClick={() => removeRecentSearch(user)} />} />) : <NoResults text={"No recent searches"} />}</div>
            </div>
          ) : (
            <div className="grid place-items-center">{users.length > 0 ? users.map((user, index) => <ProfileLink user={user} key={index} index={index} onClickHandler={() => onClickProfile(user)} />) : <NoResults text={"No results found"} />}</div>
          )}
        </div>
      )}
    </>
  );
};

export default MobileSearch;
