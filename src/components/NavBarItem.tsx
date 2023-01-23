import Image from "next/image";
import { useContext } from "react";

interface itemType {
  Icon: JSX.Element | string | null | undefined;
  IconOnClick?: JSX.Element;
  onClickHandler?: () => unknown;
  active?: boolean;
}

const NavBarItem = (props: itemType) => {

  return (
    <div className="group flex cursor-pointer items-center justify-start p-4 w-fit h-fit hover:rounded-full text-white hover:bg-zinc-900" onClick={props.onClickHandler}>
      <div className="transition-all duration-200 scale-150 group-hover:scale-[1.6]">
      {typeof props.Icon === "string" ? <Image height={24} width={24} className={"rounded-full scale-[1.5]" + (props.active && "border md:border-2 border-white ")} src={props.Icon} alt="Profile Picture" /> : props.active ? props.IconOnClick : props.Icon}</div>
    </div>
  );
};

export default NavBarItem;
