import { LargeSidebarItemProps } from "../Types"
import { twMerge } from "tailwind-merge"
import { buttonStyles } from "./Button"
import LazyImage from "./LazyLoadImage"

const LargeSidebarItem = ({ IconOrImgUrl, title, isActive = false, ...props }: LargeSidebarItemProps) => {
    return (
        <button {...props} className={twMerge(buttonStyles({ variant: "ghost" }), `w-full flex items-center rounded-lg gap-4 p-3 ${isActive ? "font-bold bg-neutral-100 dark:text-black hover:bg-secondary" : ""}`)}>
            {typeof IconOrImgUrl === "string" ? (
                <span className="w-6 h-6">
                    <LazyImage src={IconOrImgUrl} alt="" className=" rounded-full" />
                </span>
            ) : (
                <IconOrImgUrl className="w-6 h-6" />
            )
            }
            <div className="whitespace-nowrap text-ellipsis overflow-hidden text-sm"> {title} </div>
        </button>
    )
}

export default LargeSidebarItem