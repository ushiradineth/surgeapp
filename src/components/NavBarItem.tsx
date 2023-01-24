import Image from "next/image";

interface itemType {
  Icon: JSX.Element | string | null | undefined;
  IconOnClick?: JSX.Element;
  onClickHandler?: () => unknown;
  active?: boolean;
}

const NavBarItem = (props: itemType) => {
  return (
    <div className="group flex h-fit w-fit cursor-pointer items-center justify-start p-4 text-gray-300 hover:rounded-full hover:bg-zinc-900" onClick={props.onClickHandler}>
      <div className="scale-150 transition-all duration-200 group-hover:scale-[1.6]">{typeof props.Icon === "string" ? <Image height={200} width={200} className={"scale-[1.5] rounded-full h-[14px] w-[14px] " + (props.active && " border border-gray-300 ")} src={props.Icon} alt="Profile Picture" priority /> : props.active ? props.IconOnClick : props.Icon}</div>
    </div>
  );
};

export default NavBarItem;
