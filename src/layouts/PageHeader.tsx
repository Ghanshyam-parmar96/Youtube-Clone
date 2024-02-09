import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import youtubeLogo from "../assets/black-youtube-logo.png";
import { RiVideoAddLine } from "react-icons/ri";
import { IoMdArrowBack, IoMdMic, IoMdNotificationsOutline } from "react-icons/io";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import Button from "../components/Button";
import { useState } from "react";
import { useAppDispatch } from "../data/hooks";
import { toggleSidebar } from "../data/sidebarSlice";

const PageHeader = () => {
    const [showFullWidthSearch, setShowFullWidthSearch] = useState(false);
    const dispatch = useAppDispatch();

    return (
        <div className="flex gap-10 lg:gap-20 justify-between px-4 h-14 sticky top-2 left-0 mt-2">

            {/* Logo Section */}
            <div className={`items-center gap-4 flex-shrink-0 ${showFullWidthSearch ? "hidden" : "flex"}`}>
                <Button variant="ghost" size="icon" onClick={()=>dispatch(toggleSidebar())}>
                    <RxHamburgerMenu className="text-2xl" />
                </Button>
                <Link to="/">
                    <img src={youtubeLogo} className="w-24" alt="Youtube Logo" />
                </Link>
            </div>

            {/* Search Section */}
            <form className={`gap-4 justify-center items-center flex-grow ${!showFullWidthSearch ? "hidden md:flex" : "flex"}`}>

                {showFullWidthSearch && (<Button onClick={() => setShowFullWidthSearch(false)} variant="ghost" size="icon" className="text-xl" >
                    <IoMdArrowBack />
                </Button>)}

                <div className="flex flex-grow max-w-lg">
                    <input
                        type="search"
                        name="search"
                        id="search"
                        placeholder="Search"
                        autoComplete="off"
                        className="w-full border focus:border-sky-600 border-gray-500/50 outline-none py-1 px-5 rounded-l-full"
                    />

                    <button className="text-2xl rounded-r-full border border-gray-500/50 px-5 py-1 border-l-transparent bg-gray-200/40 ">
                        <IoSearchOutline />
                    </button>
                </div>
                <Button size="icon" className="text-xl">
                    <IoMdMic />
                </Button>
            </form>

            {/* Last icons Section */}
            <div className={`flex-shrink-0 gap-3 text-2xl items-center ${showFullWidthSearch ? "hidden" : "flex"}`}>
                <Button onClick={() => setShowFullWidthSearch(true)} variant="ghost" size="icon" className="md:hidden">
                    <IoSearchOutline />
                </Button>
                <Button variant="ghost" size="icon" className="hidden sm:block md:hidden">
                    <IoMdMic />
                </Button>
                <Button variant="ghost" size="icon" className="hidden sm:block"> 
                    <RiVideoAddLine />
                </Button>
                <Button variant="ghost" size="icon" className="relative hidden sm:block">
                    <IoMdNotificationsOutline />
                    <span className="bg-red-600 h-4 grid place-content-center rounded-full p-1 aspect-square absolute top-1 left-5 text-[10px] text-white font-bold">
                        9+
                    </span>
                </Button>
                <Button variant="ghost" size="icon" >
                    <FaRegCircleUser />
                </Button>
            </div>
        </div>
    );
};

export default PageHeader;
