import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "./Button";
import { useEffect, useRef, useState } from "react";

type CategoryPillProps = {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
};
type handleBtn = () => void;

const TRANSLATE_AMOUNT = 200;

const CategoryPills = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}: CategoryPillProps) => {
  const [translate, setTranslate] = useState(0);
  const [isLeftVisible, setIsLeftVisible] = useState(false);
  const [isRightVisible, setIsRightVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle the left button
  const handleLeftBtn: handleBtn = () => {
    setTranslate((translate) => {
      const newTranslate = translate - TRANSLATE_AMOUNT;
      if (newTranslate <= 0) return 0;
      return newTranslate;
    });
  };

  //   Handle Right Button
  const handleRightBtn: handleBtn = () => {
    setTranslate((translate) => {
      if (containerRef.current == null) return translate;
      const newTranslate = translate + TRANSLATE_AMOUNT;
      const totalWidth = containerRef.current.scrollWidth;
      const currentWidth = containerRef.current.clientWidth;
      if (newTranslate + currentWidth >= totalWidth) {
        return totalWidth - currentWidth;
      }
      return newTranslate;
    });
  };

  //   Useeffet for handle the buttons
  useEffect(() => {
    if (containerRef.current == null) return;

    const observer = new ResizeObserver(() => {
      const container = containerRef.current;
      if (container == null) return;
    });

    setIsLeftVisible(translate > 0);
    setIsRightVisible(
      translate + containerRef.current.clientWidth <
        containerRef.current.scrollWidth
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [categories, translate]);

  return (
    <div ref={containerRef} className="overflow-x-hidden relative">
      <div
        className="flex whitespace-nowrap gap-3 transition-transform w-[max-content]"
        style={{ transform: `translateX(-${translate}px)` }}
      >
        {categories.map((category) => (
          <Button
            onClick={() => setSelectedCategory(category)}
            key={category}
            variant={selectedCategory === category ? "dark" : "default"}
            className="py-1 px-3 rounded-lg whitespace-nowrap"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Left Arrow Button */}
      {isLeftVisible && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-white from-50% to-transparent w-24 h-full">
          <Button
            onClick={() => handleLeftBtn()}
            variant={"ghost"}
            size={"icon"}
            className="h-full aspect-square w-auto p-1.5"
          >
            <ChevronLeft />
          </Button>
        </div>
      )}
      {/* Right Arrow Button */}
      {isRightVisible && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-white from-50% to-transparent w-24 h-full flex justify-end">
          <Button
            onClick={() => handleRightBtn()}
            variant={"ghost"}
            size={"icon"}
            className="h-full aspect-square w-auto p-1.5"
          >
            <ChevronRight />
          </Button>
        </div>
      )}
    </div>
  );
};

export default CategoryPills;
