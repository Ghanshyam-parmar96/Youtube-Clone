import { IoMdArrowBack, IoMdMic, IoMdNotificationsOutline } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { FaRegCircleUser } from "react-icons/fa6";
import { RxHamburgerMenu } from "react-icons/rx";
import { RiVideoAddLine } from "react-icons/ri";

import youtubeLightLogo from "../assets/white-youtube-logo.png";
import youtubeDarkLogo from "../assets/black-youtube-logo.png";
import { useAppDispatch, useAppSelector } from "../data/hooks";
import { toggleSidebar } from "../data/sidebarSlice";
import { Link, useNavigate } from "react-router-dom";
import LazyImage from "../components/LazyLoadImage";
import Button from "../components/Button";
import { useState } from "react";

const PageHeader = () => {
    const [showFullWidthSearch, setShowFullWidthSearch] = useState(false);
    const isChecked = useAppSelector((state) => state.sidebar.isChecked);
    const [search, setSearch] = useState("");
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const submitHandler = () => {
        if (search.length < 3) return;
        navigate(`/search?query=${search}`);
    };


    return (
        <div className="flex gap-10 lg:gap-20 justify-between px-4 h-14 sticky top-2 left-0 mt-2">

            {/* Logo Section */}
            <div className={`items-center gap-4 flex-shrink-0 ${showFullWidthSearch ? "hidden" : "flex"}`}>
                <Button variant="ghost" size="icon" className="mb-2" onClick={() => dispatch(toggleSidebar())}>
                    <RxHamburgerMenu className="text-2xl" />
                </Button>
                <Link to="/" className="w-24">
                    <LazyImage src={isChecked ? youtubeLightLogo : youtubeDarkLogo} alt="Youtube Logo" />
                </Link>
            </div>

            {/* Search Section */}
            <div className={`gap-4 justify-center items-center flex-grow ${!showFullWidthSearch ? "hidden md:flex" : "flex"}`}>

                {showFullWidthSearch && (<Button onClick={() => setShowFullWidthSearch(false)} variant="ghost" size="icon" className="text-xl" >
                    <IoMdArrowBack />
                </Button>)}

                <div className="flex flex-grow max-w-lg">
                    <input
                        type="search"
                        name="search"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && submitHandler()}
                        id="search"
                        placeholder="Search"
                        autoComplete="off"
                        className="w-full border focus:border-sky-600 border-gray-500/50 outline-none py-1 px-5 rounded-l-full dark:text-black dark:bg-white/90"
                    />

                    <button onClick={submitHandler} className="text-2xl rounded-r-full border border-gray-500/50 px-5 py-1 border-l-transparent bg-gray-200/40 ">
                        <IoSearchOutline />
                    </button>
                </div>
                <Button size="icon" className="text-xl">
                    <IoMdMic />
                </Button>
            </div>

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
