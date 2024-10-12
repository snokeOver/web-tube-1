import { ArrowLeft, Bell, Menu, Mic, Search, Upload, User } from "lucide-react";
import Button from "./Button";
import { useState } from "react";

const Navbar = () => {
  const [showFullSearch, setShowFullSearch] = useState(false);
  return (
    <div className="flex gap-10 lg:gap-20 justify-between pt-2 mb-6 mx-4">
      {/* Left part: Icon and logo part */}
      <div
        className={`${
          showFullSearch ? "hidden" : "flex"
        }  gap-4 items-center flex-shrink-0`}
      >
        <Button variant="ghost" size={"icon"}>
          <Menu />
        </Button>
        <a href="/">
          <img src={"Logo.png"} className="h-6 w-full" alt="logo" />
        </a>
      </div>

      {/* Search Bar */}
      <form
        className={`md:flex gap-4 justify-center flex-grow  ${
          showFullSearch ? "flex" : "hidden"
        }`}
      >
        <Button
          type="submit"
          variant={"ghost"}
          size={"icon"}
          className={`flex-shrink-0 ${showFullSearch ? "flex" : "hidden"}`}
          onClick={() => setShowFullSearch(false)}
        >
          <ArrowLeft />
        </Button>
        <div className="flex flex-grow max-w-[600px]">
          <input
            type="search"
            placeholder="search"
            className="rounded-l-full border border-secondary-border shadow-inner shadow-secondary text-lg py-1 px-4 w-full focus:border-blue-300 outline-none"
          />
          <Button className="flex-shrink-0 border border-secondary-border rounded-r-full border-l-0 py-1 px-4">
            <Search />
          </Button>
        </div>

        {/* Mic button */}
        <Button type="submit" size={"icon"} className="flex-shrink-0">
          <Mic />
        </Button>
      </form>

      {/* Extra Icons */}
      <div
        className={`md:gap-2 flex-shrink-0 ${
          showFullSearch ? "hidden" : "flex"
        }`}
      >
        <Button
          size={"icon"}
          variant={"ghost"}
          className="md:hidden"
          onClick={() => setShowFullSearch(true)}
        >
          <Search />
        </Button>
        <Button size={"icon"} variant={"ghost"} className="md:hidden">
          <Mic />
        </Button>
        <Button size={"icon"} variant={"ghost"}>
          <Upload />
        </Button>
        <Button size={"icon"} variant={"ghost"}>
          <Bell />
        </Button>
        <Button size={"icon"} variant={"ghost"}>
          <User />
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
