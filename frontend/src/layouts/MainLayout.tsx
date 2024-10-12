import { useState } from "react";
import CategoryPills from "../components/CategoryPills";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import { categories, videos } from "../data/home";
import VideoGridContent from "../components/VideoGridContent";

const MainLayout = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Body with Sidebar */}
      <div className="grid grid-cols-[auto, 1fr] flex-grow-1 overflow-auto">
        <div>
          <SideBar />
        </div>
        <div className="px-8 overflow-x-hidden">
          <div className="sticky top-0 bg-white z-10 pb-4">
            <CategoryPills
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>

          {/* Content Prt */}
          <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
            {videos.map((video) => (
              <VideoGridContent key={video.id} {...video} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
