import { useContext } from "react";
import { SidebarContext } from "../context/SidebarProvider";

const useSidebar = () => {
  const sidebarValue = useContext(SidebarContext);
  if (sidebarValue == null) throw Error("Can't use outside of SidebarProvider");
  return sidebarValue;
};

export default useSidebar;
