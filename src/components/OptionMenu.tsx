interface itemType {
  title: string;
  description: string;
  buttonPositive: string | JSX.Element;
  buttonNegative: string;
  onClickPositive: (...arg: any) => unknown;
  onClickNegative: (...arg: any) => unknown;
}

const OptionMenu = (props: itemType) => {

  return (
    <div className="fixed top-0 left-0 z-50 h-screen w-screen bg-zinc-900 text-gray-300 bg-opacity-30">
      <div className={"bg-zinc-900 text-gray-300 absolute top-1/2 left-1/2 z-20 h-auto w-[200px] xsm:w-[300px] -translate-x-1/2 -translate-y-1/2 transform rounded-2xl shadow-[0px_0px_10px_rgba(0,0,0,0.7)] md:w-[400px]"}>
        <div className="flex w-full flex-col items-center justify-center border-b-[1px] border-gray-300 py-8 font-semibold">
          <p className="select-none">{props.title}</p>
          <p className="px-4 text-center text-sm font-normal">{props.description}</p>
        </div>
        <div className="flex h-12 w-full cursor-pointer items-center justify-center border-b-[1px] border-gray-300 font-semibold text-red-500" onClick={props.onClickPositive}>
          <p>{props.buttonPositive}</p>
        </div>
        <div className="flex h-12 w-full cursor-pointer items-center justify-center font-semibold" onClick={props.onClickNegative}>
          <p>{props.buttonNegative}</p>
        </div>
      </div>
    </div>
  );
};

export default OptionMenu;
