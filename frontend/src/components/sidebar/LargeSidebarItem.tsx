import { ElementType } from "react";
import { twMerge } from "tailwind-merge";
import { buttonStyles } from "../Button";

type LargeSidebarItemProps = {
  IconOrImgUrl: ElementType | string;
  title: string;
  url: string;
  isActive?: boolean;
};

const LargeSidebarItem = ({
  IconOrImgUrl,
  title,
  url,
  isActive = false,
}: LargeSidebarItemProps) => {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyles({ variant: "ghost" }),
        `w-full flex items-center rounded-lg gap-4 p-3 ${
          isActive ? "font-bold bg-neutral-100 hover:bg-secondary" : ""
        }`
      )}
    >
      {typeof IconOrImgUrl === "string" ? (
        <img src={IconOrImgUrl} alt="" className="w-6 h-6 rounded-full" />
      ) : (
        <IconOrImgUrl className="w-6 h-6" />
      )}
      <div className="overflow-hidden whitespace-nowrap text-ellipsis">
        {title}
      </div>
    </a>
  );
};

export default LargeSidebarItem;
