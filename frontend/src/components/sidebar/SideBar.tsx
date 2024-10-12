import {
  Clapperboard,
  Clock,
  Film,
  Flame,
  Gamepad2,
  History,
  Home,
  Library,
  Lightbulb,
  ListVideo,
  PlaySquare,
  Podcast,
  Repeat,
  Shirt,
  ShoppingBag,
  Trophy,
} from "lucide-react";
import SmallSidebarItem from "./SmallSidebarItem";
import LargeSidebarSection from "./LargeSidebarSection";
import LargeSidebarItem from "./LargeSidebarItem";
import { playlists, subscriptions } from "../../data/sidebar";

import TitleIcon from "../TitleIcon";
import { useDispatch } from "react-redux";

import { closeSidebar, setIsSmallOpen } from "../redux/SidebarSlice";
import { useEffect } from "react";
import useRxSisebar from "../hooks/useRxSisebar";

const SideBar = () => {
  // const { isLargeOpen, isSmallOpen, close } = useSidebar();
  const dispatch = useDispatch();
  const { isLargeOpen, isSmallOpen } = useRxSisebar();

  const isScreenSmall = () => window.innerWidth < 768;

  const handleClose = () => {
    dispatch(closeSidebar(isScreenSmall()));
  };

  useEffect(() => {
    const handler = () => {
      if (!isScreenSmall()) dispatch(setIsSmallOpen(false));
    };

    window.addEventListener("resize", handler);

    return () => {
      window.removeEventListener("resize", handler);
    };
  }, []);

  return (
    <>
      <aside
        className={`sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col ml-1  ${
          isLargeOpen ? "md:hidden" : "md:flex"
        }`}
      >
        <SmallSidebarItem Icon={Home} title="Home" url="/" />
        <SmallSidebarItem Icon={Repeat} title="Shorts" url="/shorts" />
        <SmallSidebarItem
          Icon={Clapperboard}
          title="Subscription"
          url="/subscription"
        />
        <SmallSidebarItem Icon={Library} title="Library" url="/" />
      </aside>

      {isSmallOpen && (
        <div
          onClick={() => handleClose()}
          className="fixed md:hidden inset-0 z-40 bg-secondary-dark opacity-50"
        ></div>
      )}

      <aside
        className={`w-56 md:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4  flex-col gap-2 px-2 ${
          isLargeOpen ? "md:flex" : "md:hidden"
        } ${isSmallOpen ? "flex z-50 bg-white max-h-screen" : "hidden"}`}
      >
        <div className="md:hidden pt-2 pb-4 sticky top-0 bg-white">
          <TitleIcon />
        </div>
        <LargeSidebarSection>
          <LargeSidebarItem isActive IconOrImgUrl={Home} title="Home" url="/" />
          <LargeSidebarItem
            IconOrImgUrl={Clapperboard}
            title="Subscription"
            url="/subscription"
          />
        </LargeSidebarSection>
        <hr />

        <LargeSidebarSection visibleItemCount={5}>
          <LargeSidebarItem
            IconOrImgUrl={Library}
            title="Library"
            url="/library"
          />
          <LargeSidebarItem
            IconOrImgUrl={History}
            title="History"
            url="/history"
          />
          <LargeSidebarItem
            IconOrImgUrl={PlaySquare}
            title="Your Videos"
            url="/your-videos"
          />
          <LargeSidebarItem
            IconOrImgUrl={Clock}
            title="Watch Later"
            url="/playlist?list=WL"
          />

          {playlists.map((playlist) => (
            <LargeSidebarItem
              key={playlist.id}
              IconOrImgUrl={ListVideo}
              title={playlist.name}
              url={`/playlist?list=${playlist.id}`}
            />
          ))}
        </LargeSidebarSection>
        <hr />

        <LargeSidebarSection title="Subscription">
          {subscriptions.map((subscription) => (
            <LargeSidebarItem
              key={subscription.id}
              IconOrImgUrl={subscription.imgUrl}
              title={subscription.channelName}
              url={`/@${subscription.id}`}
            />
          ))}
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection title="Explore">
          <LargeSidebarItem
            IconOrImgUrl={Flame}
            title="Trending"
            url="/trending"
          />
          <LargeSidebarItem
            IconOrImgUrl={ShoppingBag}
            title="Shopping"
            url="/shopping"
          />
          <LargeSidebarItem
            IconOrImgUrl={Film}
            title="Movies & TV"
            url="/movies-tv"
          />
          <LargeSidebarItem
            IconOrImgUrl={Gamepad2}
            title="Gaming"
            url="/gaming"
          />
          <LargeSidebarItem
            IconOrImgUrl={Trophy}
            title="Sports"
            url="/sports"
          />
          <LargeSidebarItem
            IconOrImgUrl={Lightbulb}
            title="Learning"
            url="/learning"
          />
          <LargeSidebarItem
            IconOrImgUrl={Shirt}
            title="Fashion & Beauty"
            url="/fashion-beauty"
          />
          <LargeSidebarItem
            IconOrImgUrl={Podcast}
            title="Podcast"
            url="/podcast"
          />
        </LargeSidebarSection>
      </aside>
    </>
  );
};

export default SideBar;
