import Image from "next/image";
import Link from "next/link";

interface itemType {
  user: {
    userID: string;
    userName: string;
    userImage: string;
    userHandle: string;
  };
  index: number;
  onClickHandler?: any;
  onClickHandlerPost?: any;
  truncate?: boolean;
  hideName?: boolean;
  wfit?: boolean;
}

const ProfileLink = (props: itemType) => {

  return (
    <Link href={"/profile/" + props.user.userHandle} onClick={(e) => e.preventDefault()} key={props.index} className={"mt-6 flex h-12 items-center justify-center px-4 bg-zinc-900 text-gray-300 " + (props.wfit ? " w-fit " : " w-full ")} passHref>
      <Image className={"w-12 cursor-pointer rounded-full"} onClick={props.onClickHandlerPost ? props.onClickHandlerPost : props.onClickHandler} src={props.user.userImage} height={160} width={160} alt="Profile Picture" priority />
      <div className="m-4 flex w-full cursor-pointer flex-col justify-center gap-1 truncate" onClick={props.onClickHandlerPost ? () => undefined : props.onClickHandler}>
        <div className="flex" onClick={props.onClickHandlerPost ? props.onClickHandlerPost : () => undefined}>
          <p className={"truncate " + (props.truncate === false ? " w-[60%] " : "")}>{props.user.userHandle}</p>
        </div>
        <div className="grid grid-flow-col place-items-start">
          {!props.hideName && (
            <div className="w-fit truncate" onClick={props.onClickHandlerPost ? props.onClickHandlerPost : () => undefined}>
              {props.user.userName}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProfileLink;
