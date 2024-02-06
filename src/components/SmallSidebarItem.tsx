import { Link } from "react-router-dom"
import { SmallSidebarItemProps } from "../Types"
import { buttonStyles } from "./Button"
import { twMerge } from "tailwind-merge"

const SmallSidebarItem = ({Icon, title, url} : SmallSidebarItemProps) => {
  return (
    <Link to={url} className={ twMerge(buttonStyles({variant : "ghost"}), "py-4 flex flex-col items-center rounded-lg")}>
        <Icon className="w-6 h-6" />
        <div className="text-[10px] tracking-wide">
            {title}
        </div>
    </Link>
  )
}

export default SmallSidebarItem