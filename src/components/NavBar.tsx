import React from "react";
import NavBarItem from "./NavBarItem";
import { AiOutlineHome, AiFillHome } from "react-icons/ai";
import { RiAddBoxLine, RiAddBoxFill } from "react-icons/ri";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import { env } from "../env/client.mjs";
import { MdLogout } from "react-icons/md";
import { HiOutlineMenu, HiMenu } from "react-icons/hi";
import Image from "next/image";
import MobileSearch from "./MobileSearch";

const NavBar = (props: { user: any }) => {
  const router = useRouter();
  const { data: session } = useSession();

  if (typeof session === "undefined" || session === null || typeof session.user === "undefined" || [""].includes(router.pathname)) return <></>;

  return (
    <>
      <div className={"fixed top-0 left-0 z-40 h-12 w-screen place-items-center " + (router.pathname === "/profile/[profile]" || router.pathname === "/post/[post]" ? " hidden " : " grid")}>
        <div className="relative grid h-full w-screen grid-flow-col place-items-center bg-zinc-900 sm:max-w-[400px] md:max-w-[700px]">
          <Image alt={"logo"} src={"/favicon.ico"} className="absolute left-2 h-[35px] w-[35px] sm:left-0" width={200} height={200} />
          <MobileSearch />
        </div>
      </div>
      <div className={"group fixed bottom-6 left-6 z-40"}>
        <button type="button" aria-haspopup="true" className="rounded-full bg-black">
          <NavBarItem Icon={<HiOutlineMenu />} />
        </button>
        <div id="Sidebar-More-Items" className={"invisible fixed bottom-20 left-6 z-50 w-fit origin-bottom scale-95 transform flex-row items-center justify-center rounded-lg bg-black py-1 text-sm opacity-0 transition-all duration-300 group-focus-within:visible group-focus-within:scale-100 group-focus-within:opacity-100 "}>
          <NavBarItem Icon={<AiOutlineHome />} IconOnClick={<AiFillHome />} active={router.pathname === "/"} key={"Home"} onClickHandler={() => router.push("/")} />
          <NavBarItem Icon={<RiAddBoxLine />} IconOnClick={<RiAddBoxFill />} active={router.pathname === "/create"} key={"Create"} onClickHandler={() => router.push("/create")} />
          <NavBarItem Icon={session?.user?.image} active={router.query.profile === session.user.handle} key={"Profile"} onClickHandler={() => router.push("/profile/" + session.user?.handle)} />
          <NavBarItem Icon={<MdLogout />} IconOnClick={<MdLogout />} active={true} key={"Logout"} onClickHandler={() => signOut({ callbackUrl: env.NEXT_PUBLIC_NEXTAUTH_URL })} />
        </div>
      </div>
    </>
  );
};

export default NavBar;
