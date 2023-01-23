import React from "react";
import NavBarItem from "./NavBarItem";
import { AiOutlineHome, AiFillHome } from "react-icons/ai";
import { RiAddBoxLine, RiAddBoxFill } from "react-icons/ri";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const NavBar = (props: { create: boolean; setCreate: any; user: any }) => {
  const router = useRouter();
  const { data: session } = useSession();

  if (typeof session === "undefined" || session === null || typeof session.user === "undefined" || [""].includes(router.pathname)) return <></>;

  return (
    <div className="fixed inset-x-0 bottom-4 mx-auto flex w-fit items-center rounded-2xl bg-black px-2">
      <NavBarItem Icon={<AiOutlineHome />} IconOnClick={<AiFillHome />} active={router.pathname === "/"} key={"Home"} onClickHandler={() => router.push("/")} />
      <NavBarItem Icon={<RiAddBoxLine />} IconOnClick={<RiAddBoxFill />} active={props.create} key={"Create"} onClickHandler={() => console.log("asd")} />
      <NavBarItem Icon={session?.user?.image} active={router.query.profile === props.user.data.handle && !props.create} key={"Profile"} onClickHandler={() => router.push("/profile/" + props.user.data.handle)} />
    </div>
  );
};

export default NavBar;
