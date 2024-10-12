// At first this app is handled by ContextAPI then it was upgraded to Redux store

import { createContext, ReactNode, useEffect, useState } from "react";

type SidebarProviderProps = {
  children: ReactNode;
};

type SidebarContextType = {
  isLargeOpen: boolean;
  isSmallOpen: boolean;
  toggle: () => void;
  close: () => void;
};

export const SidebarContext = createContext<SidebarContextType | null>(null);

const SidebarProvider = ({ children }: SidebarProviderProps) => {
  const [isLargeOpen, setIsLargeOpen] = useState(false);
  const [isSmallOpen, setIsSmallOpen] = useState(false);

  const isScreenSmall = () => {
    return window.innerWidth < 768;
  };

  useEffect(() => {
    const handler = () => {
      if (!isScreenSmall()) setIsSmallOpen(false);
    };

    window.addEventListener("resize", handler);

    return () => {
      window.removeEventListener("resize", handler);
    };
  }, []);

  const toggle = () => {
    if (isScreenSmall()) setIsSmallOpen((s) => !s);
    else setIsLargeOpen((l) => !l);
  };

  const close = () => {
    if (isScreenSmall()) setIsSmallOpen(false);
    else setIsLargeOpen(false);
  };

  return (
    <SidebarContext.Provider
      value={{ toggle, close, isLargeOpen, isSmallOpen }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarProvider;
