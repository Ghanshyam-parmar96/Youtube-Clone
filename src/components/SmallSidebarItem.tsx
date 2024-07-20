import { SmallSidebarItemProps } from "../Types"

const SmallSidebarItem = ({ Icon, title, ...props }: SmallSidebarItemProps) => {
  return (
    <button {...props} className="py-4 flex flex-col items-center rounded-lg">
      <Icon className="w-6 h-6" />
      <div className="text-[10px] tracking-wide">
        {title}
      </div>
    </button>
  )
}

export default SmallSidebarItem