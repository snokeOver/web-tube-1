import { ElementType } from "react";
import { buttonStyles } from "../Button";
import { twMerge } from "tailwind-merge";

type SmallSidebarItemProps = {
  Icon: ElementType;
  title: string;
  url: string;
};

const SmallSidebarItem = ({ Icon, title, url }: SmallSidebarItemProps) => {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyles({ variant: "ghost" }),
        "py-4 px-1 flex flex-col items-center rounded-lg gap-1"
      )}
    >
      <Icon className="w-6 h-6 " />
      <div className="text-sm">{title}</div>
    </a>
  );
};

export default SmallSidebarItem;
