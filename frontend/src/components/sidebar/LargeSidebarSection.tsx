import { Children, ReactNode, useState } from "react";
import Button from "../Button";
import { ChevronDown, ChevronUp } from "lucide-react";

interface LargeSidebarSectionProps {
  children: ReactNode;
  title?: string;
  visibleItemCount?: number;
}

const LargeSidebarSection = ({
  children,
  title,
  visibleItemCount = Number.POSITIVE_INFINITY,
}: LargeSidebarSectionProps) => {
  const [isExpandable, setIsExpandable] = useState(false);
  const childArray = Children.toArray(children).flat();

  const showExandableBtn = childArray.length > visibleItemCount;
  const visibleChildren = isExpandable
    ? childArray
    : childArray.slice(0, visibleItemCount);
  const ArrowBtn = isExpandable ? ChevronUp : ChevronDown;
  return (
    <div>
      {title && <div className="ml-4 mt-2 text-lg mb-1">{title}</div>}
      {visibleChildren}
      {showExandableBtn && (
        <Button
          onClick={() => setIsExpandable((e) => !e)}
          variant={"ghost"}
          className="w-full flex items-center rounded-lg gap-4 p-3"
        >
          <ArrowBtn className="w-6 h-6" />
          <div>{isExpandable ? "Show Less" : "Show More"}</div>
        </Button>
      )}
    </div>
  );
};

export default LargeSidebarSection;
