import { Menu } from "lucide-react";
import Button from "./Button";
import { TitleIconProps } from "./Navbar";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "./redux/SidebarSlice";

const TitleIcon = ({ isHidden }: TitleIconProps) => {
  const dispatch = useDispatch();

  const isSmallScreen = () => window.innerWidth < 768;

  const handeToggle = () => {
    dispatch(toggleSidebar(isSmallScreen()));
  };
  return (
    <div
      className={`${
        isHidden ? "hidden" : "flex"
      }  gap-4 items-center flex-shrink-0`}
    >
      <Button onClick={() => handeToggle()} variant="ghost" size={"icon"}>
        <Menu />
      </Button>
      <a href="/">
        <img src={"Logo.png"} className="h-6 w-full" alt="logo" />
      </a>
    </div>
  );
};

export default TitleIcon;
