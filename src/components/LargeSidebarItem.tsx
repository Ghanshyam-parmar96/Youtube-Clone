import { Link } from "react-router-dom"
import { LargeSidebarItemProps } from "../Types"
import { twMerge } from "tailwind-merge"
import { buttonStyles } from "./Button"

const LargeSidebarItem = ({ IconOrImgUrl, title, url, isActive = false }: LargeSidebarItemProps) => {
    return (
        <Link to={url} className={twMerge(buttonStyles({ variant: "ghost" }), `w-ful flex items-center rounded-lg gap-4 p-3 ${isActive ? "font-bold bg-neutral-100 hover:bg-secondary" : ""}`)}>
            {typeof IconOrImgUrl === "string" ? (
                <img src={IconOrImgUrl} alt="" className="w-6 h-6 rounded-full" />
            ) : (
                <IconOrImgUrl className="w-6 h-6" />
            )
            }
            <div className="whitespace-nowrap text-ellipsis overflow-hidden text-sm"> {title} </div>
        </Link>
    )
}

export default LargeSidebarItem