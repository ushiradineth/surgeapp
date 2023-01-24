import React from "react";
import NavBarItem from "./NavBarItem";
import { AiOutlineHome, AiFillHome } from "react-icons/ai";
import { RiAddBoxLine, RiAddBoxFill } from "react-icons/ri";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import { env } from "../env/client.mjs";
import { MdLogout } from "react-icons/md";
import { HiOutlineMenu, HiMenu } from "react-icons/hi";

const NavBar = (props: { user: any }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [sideBar, setSideBar] = React.useState(false);

  if (typeof session === "undefined" || session === null || typeof session.user === "undefined" || [""].includes(router.pathname)) return <></>;

  return (
    <div className={"group fixed bottom-6 left-6"}>
      <button type="button" aria-haspopup="true" className="rounded-full bg-black">
        <NavBarItem Icon={<HiOutlineMenu />} IconOnClick={<HiMenu />} onClickHandler={() => setSideBar(true)} active={sideBar} />
      </button>
      {sideBar && (
        <div id="Sidebar-More-Items" className={"invisible fixed bottom-20 left-6 z-50 w-fit origin-bottom scale-95 transform flex-row items-center justify-center rounded-lg bg-black py-1 text-sm opacity-0 transition-all duration-300 group-focus-within:visible group-focus-within:scale-100 group-focus-within:opacity-100 "}>
          <NavBarItem Icon={<AiOutlineHome />} IconOnClick={<AiFillHome />} active={router.pathname === "/"} key={"Home"} onClickHandler={() => router.push("/")} />
          <NavBarItem Icon={<RiAddBoxLine />} IconOnClick={<RiAddBoxFill />} active={router.pathname === "/create"} key={"Create"} onClickHandler={() => router.push("/create")} />
          <NavBarItem Icon={session?.user?.image} active={router.query.profile === props.user.data.handle} key={"Profile"} onClickHandler={() => router.push("/profile/" + props.user.data.handle)} />
          <NavBarItem Icon={<MdLogout />} IconOnClick={<MdLogout />} active={true} key={"Logout"} onClickHandler={() => signOut({ callbackUrl: env.NEXT_PUBLIC_NEXTAUTH_URL })} />
        </div>
      )}
    </div>
  );
};

export default NavBar;
