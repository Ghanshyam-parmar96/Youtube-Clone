// react  Icon imports
import { PiFilmSlate, PiGameControllerLight, PiMusicNoteLight, PiPlaylistDuotone, PiUserSquareLight } from "react-icons/pi"
import { MdOutlineVideoLibrary, MdOutlineWatchLater, MdPodcasts } from "react-icons/md"
import { AiOutlineLike, AiOutlinePlaySquare, AiOutlineShopping } from "react-icons/ai"
import { GoHistory, GoHome, GoLightBulb, GoTrophy } from "react-icons/go"
import { IoNewspaperOutline, IoShirtOutline } from "react-icons/io5"
import { BsCollectionPlay } from "react-icons/bs"
import { RxHamburgerMenu } from "react-icons/rx"
import { IoIosRadio } from "react-icons/io"
import { LuRepeat } from "react-icons/lu"
import { ImFire } from "react-icons/im"

// component and hooks imports
import LargeSidebarSection from "../components/LargeSidebarSection"
import { resizeBy, toggleSidebar } from "../data/sidebarSlice"
import youtubeDarkLogo from "../assets/black-youtube-logo.png"
import youtubeLightLogo from "../assets/white-youtube-logo.png"
import { useAppDispatch, useAppSelector } from "../data/hooks"
import LargeSidebarItem from "../components/LargeSidebarItem"
import SmallSidebarItem from "../components/SmallSidebarItem"
import { setSelectedCategory } from "../data/categorySlice"
import ToggleSwitch from "../components/ToggleSwitch"
import { Link, useNavigate } from "react-router-dom"
import Button from "../components/Button"
import { useEffect } from "react"
import LazyImage from "../components/LazyLoadImage"



const Sidebar = () => {

    const { isExpanded, closePannal, playlists, subscriptions, isChecked } = useAppSelector((state) => state.sidebar);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const resizeFn = () => {
            dispatch(resizeBy(window.innerWidth));
        }
        window.addEventListener("resize", resizeFn)
        return () => {
            window.removeEventListener("resize", resizeFn)
        }
    }, [])


    return (
        <>
            {/* Small Sidebar */}
            <aside className={`fixed bottom-0 left-0 sm:sticky sm:top-0 bg-white dark:bg-[#1f1f1f] z-20 w-full overflow-y-auto scrollbar-hidden sm:pb-4 flex justify-around sm:flex-col sm:justify-normal 2xl:hidden `}>
                <SmallSidebarItem Icon={GoHome} title="Home" onClick={() =>navigate("/")} />
                <SmallSidebarItem Icon={LuRepeat} title="Shorts" />
                <SmallSidebarItem Icon={BsCollectionPlay} title="Subscription" />
                <SmallSidebarItem Icon={MdOutlineVideoLibrary} title="You" />
            </aside>

            {isExpanded && closePannal && (<div onClick={() => dispatch(toggleSidebar())} className="bg-black/30 z-30 absolute inset-0 -mt-2"></div>)}

            {/* Large sidebar */}
            <aside className={`w-56 absolute 2xl:sticky flex overflow-y-auto scrollbar-hidden duration-300 ease-linear transition-transform left-0 py-3 flex-col gap-2 z-30 bg-white dark:bg-[#1f1f1f] bottom-0 -top-2 h-screen pl-4 px-2 ${isExpanded ? "translate-x-0" : "-translate-x-60 2xl:translate-x-0"}`}>

                {closePannal && (
                    <div className={`flex items-center gap-4 flex-shrink-0`}>
                        <Button variant="ghost" size="icon" className="mb-2" onClick={() => dispatch(toggleSidebar())}>
                            <RxHamburgerMenu className="text-2xl" />
                        </Button>
                        <Link to="/" className="w-24">
                            <LazyImage src={isChecked ? youtubeLightLogo : youtubeDarkLogo} alt="Youtube Logo" />
                        </Link>
                    </div>
                )}

                <LargeSidebarSection>
                    <LargeSidebarItem IconOrImgUrl={GoHome} title="Home" onClick={() => navigate("/")} isActive />
                    <LargeSidebarItem IconOrImgUrl={LuRepeat} title="Shorts"  />
                    <LargeSidebarItem IconOrImgUrl={BsCollectionPlay} title="Subscription"  />
                    <ToggleSwitch/>
                </LargeSidebarSection>

                <hr />

                <LargeSidebarSection visibleItemCount={5}>
                    <LargeSidebarItem IconOrImgUrl={PiUserSquareLight} title="Your channel" />
                    <LargeSidebarItem IconOrImgUrl={GoHistory} title="History" />
                    <LargeSidebarItem IconOrImgUrl={AiOutlinePlaySquare} title="Your videos" />
                    <LargeSidebarItem IconOrImgUrl={MdOutlineWatchLater} title="Watch Later" />
                    <LargeSidebarItem IconOrImgUrl={AiOutlineLike} title="liked videos" />
                    {playlists.map((playlist) => (
                        <LargeSidebarItem key={playlist.id} IconOrImgUrl={PiPlaylistDuotone} title={playlist.name} onClick={() =>navigate(`/playlist?list=${playlist.id}`)} />
                    ))}
                </LargeSidebarSection>

                <hr />

                <LargeSidebarSection title="Subscriptions" visibleItemCount={5}>
                    {subscriptions.map((subscription) => (
                        <LargeSidebarItem IconOrImgUrl={subscription.imgUrl} title={subscription.channelName} onClick={() =>navigate(`/channel/${subscription.id}`)} key={subscription.id} />
                    ))}
                </LargeSidebarSection>

                <hr />

                <LargeSidebarSection title="Explore">
                    <LargeSidebarItem IconOrImgUrl={ImFire} title="Trending" onClick={() => dispatch(setSelectedCategory(`Trending`))} />
                    <LargeSidebarItem IconOrImgUrl={AiOutlineShopping} title="Shopping" onClick={() => dispatch(setSelectedCategory(`Shopping`))} />
                    <LargeSidebarItem IconOrImgUrl={PiMusicNoteLight} title="Music" onClick={() => dispatch(setSelectedCategory(`Music`))} />
                    <LargeSidebarItem IconOrImgUrl={PiFilmSlate} title="Film" onClick={() => dispatch(setSelectedCategory(`Film`))} />
                    <LargeSidebarItem IconOrImgUrl={IoIosRadio} title="Live" onClick={() => dispatch(setSelectedCategory(`Live`))} />
                    <LargeSidebarItem IconOrImgUrl={PiGameControllerLight} title="Gaming" onClick={() => dispatch(setSelectedCategory(`Gaming`))} />
                    <LargeSidebarItem IconOrImgUrl={IoNewspaperOutline} title="News" onClick={() => dispatch(setSelectedCategory(`News`))} />
                    <LargeSidebarItem IconOrImgUrl={GoTrophy} title="Sport" onClick={() => dispatch(setSelectedCategory(`Sport`))} />
                    <LargeSidebarItem IconOrImgUrl={GoLightBulb} title="Learning" onClick={() => dispatch(setSelectedCategory(`Learning`))} />
                    <LargeSidebarItem IconOrImgUrl={IoShirtOutline} title="Fashion & Beauty" onClick={() => dispatch(setSelectedCategory(`Fashion & Beauty`))} />
                    <LargeSidebarItem IconOrImgUrl={MdPodcasts} title="Podcasts" onClick={() => dispatch(setSelectedCategory(`Podcasts`))} />
                </LargeSidebarSection>
            </aside>
        </>
    )
}

export default Sidebar