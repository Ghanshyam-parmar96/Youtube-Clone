import { Children, useState } from "react";
import { LargeSidebarSectionProps } from "../Types";
import Button from "./Button";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const LargeSidebarSection = ({ children, title, visibleItemCount = Number.POSITIVE_INFINITY, }: LargeSidebarSectionProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const childrenArray = Children.toArray(children).flat();
    const showExpandButton = childrenArray.length > visibleItemCount;
    const visibleChildren = isExpanded ? childrenArray : childrenArray.slice(0, visibleItemCount);

    const ButtonIcon = isExpanded ? MdKeyboardArrowUp : MdKeyboardArrowDown;

    return (
        <div>
            {title && <div className="ml-4 mt-2 text-lg mb-1">{title}</div>}
            {visibleChildren}
            {showExpandButton && (
                <Button
                    onClick={() => setIsExpanded((prev => !prev))}
                    variant="ghost"
                    className="w-full flex items-center rounded-lg gap-4 p-3"
                >
                    <ButtonIcon className="w-6 h-6" />
                    <div>{isExpanded ? "Show Less" : "Show More"}</div>
                </Button>
            )}
        </div>
    );
};

export default LargeSidebarSection;
