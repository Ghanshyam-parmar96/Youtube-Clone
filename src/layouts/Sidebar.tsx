import SmallSidebarItem from "../components/SmallSidebarItem"
import { GoHistory, GoHome, GoLightBulb, GoTrophy } from "react-icons/go"
import { LuRepeat } from "react-icons/lu"
import { MdOutlineVideoLibrary, MdOutlineWatchLater, MdPodcasts } from "react-icons/md"
import LargeSidebarSection from "../components/LargeSidebarSection"
import LargeSidebarItem from "../components/LargeSidebarItem"
import { PiFilmSlate, PiGameControllerLight, PiMusicNoteLight, PiPlaylistDuotone, PiUserSquareLight } from "react-icons/pi"
import { BsCollectionPlay } from "react-icons/bs"
import { AiOutlineLike, AiOutlinePlaySquare, AiOutlineShopping } from "react-icons/ai"
import { playlists, subscriptions } from "../data/categories"
import { ImFire } from "react-icons/im"
import { IoIosRadio } from "react-icons/io"
import { IoNewspaperOutline, IoShirtOutline } from "react-icons/io5"
import { useAppDispatch, useAppSelector } from "../data/hooks"
import { resizeBy, toggleSidebar } from "../data/sidebarSlice"
import { RxHamburgerMenu } from "react-icons/rx"
import Button from "../components/Button"
import { Link } from "react-router-dom"
import youtubeLogo from "../assets/black-youtube-logo.png"
import { useEffect } from "react"



const Sidebar = () => {
    const { isExpanded, closePannal } = useAppSelector((state) => state.sidebar);
    const dispatch = useAppDispatch();

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
            <aside className={`fixed bottom-0 left-0 sm:sticky sm:top-0 bg-white z-20 w-full overflow-y-auto scrollbar-hidden sm:pb-4 flex justify-around sm:flex-col sm:justify-normal 2xl:hidden `}>
                <SmallSidebarItem Icon={GoHome} title="Home" url="/" />
                <SmallSidebarItem Icon={LuRepeat} title="Shorts" url="/shorts" />
                <SmallSidebarItem Icon={BsCollectionPlay} title="Subscription" url="/subscription" />
                <SmallSidebarItem Icon={MdOutlineVideoLibrary} title="You" url="/you" />
            </aside>

            {isExpanded && closePannal && (<div onClick={() => dispatch(toggleSidebar())} className="border border-red-700 bg-black/30 z-30 absolute inset-0 -mt-2"></div>)}

            <aside className={`w-56 absolute 2xl:sticky flex overflow-y-auto scrollbar-hidden duration-300 ease-linear transition-transform left-0 py-3 flex-col gap-2 z-30 bg-white bottom-0 -top-2 h-screen pl-4 px-2 ${isExpanded ? "translate-x-0" : "-translate-x-60 2xl:translate-x-0"}`}>

                { closePannal && (<div className={`flex items-center gap-4 flex-shrink-0`}>
                    <Button variant="ghost" size="icon" onClick={() => dispatch(toggleSidebar())}>
                        <RxHamburgerMenu className="text-2xl" />
                    </Button>
                    <Link to="/">
                        <img src={youtubeLogo} className="w-24" alt="Youtube Logo" />
                    </Link>
                </div>)}

                <LargeSidebarSection>
                    <LargeSidebarItem IconOrImgUrl={GoHome} title="Home" url="/" isActive />
                    <LargeSidebarItem IconOrImgUrl={LuRepeat} title="Shorts" url="/shorts" />
                    <LargeSidebarItem IconOrImgUrl={BsCollectionPlay} title="Subscription" url="/subscription" />
                </LargeSidebarSection>

                <hr />

                <LargeSidebarSection visibleItemCount={5}>
                    <LargeSidebarItem IconOrImgUrl={PiUserSquareLight} title="Your channel" url="/" />
                    <LargeSidebarItem IconOrImgUrl={GoHistory} title="History" url="/history" />
                    <LargeSidebarItem IconOrImgUrl={AiOutlinePlaySquare} title="Your videos" url="/" />
                    <LargeSidebarItem IconOrImgUrl={MdOutlineWatchLater} title="Watch Later" url="/" />
                    <LargeSidebarItem IconOrImgUrl={AiOutlineLike} title="liked videos" url="/" />
                    {playlists.map((playlist) => (
                        <LargeSidebarItem key={playlist.id} IconOrImgUrl={PiPlaylistDuotone} title={playlist.name} url={`/playlist?playlist=${playlist.id}`} />
                    ))}
                </LargeSidebarSection>

                <hr />

                <LargeSidebarSection title="Subscriptions">
                    {subscriptions.map((subscription) => (
                        <LargeSidebarItem IconOrImgUrl={subscription.imgUrl} title={subscription.channelName} url={`/@${subscription.id}`} key={subscription.id} />
                    ))}
                </LargeSidebarSection>

                <hr />

                <LargeSidebarSection title="Explore">
                    <LargeSidebarItem IconOrImgUrl={ImFire} title="Trending" url="/trending" />
                    <LargeSidebarItem IconOrImgUrl={AiOutlineShopping} title="Shopping" url="/shopping" />
                    <LargeSidebarItem IconOrImgUrl={PiMusicNoteLight} title="Music" url="/music" />
                    <LargeSidebarItem IconOrImgUrl={PiFilmSlate} title="Film" url="/film" />
                    <LargeSidebarItem IconOrImgUrl={IoIosRadio} title="Live" url="/live" />
                    <LargeSidebarItem IconOrImgUrl={PiGameControllerLight} title="Gaming" url="/gaming" />
                    <LargeSidebarItem IconOrImgUrl={IoNewspaperOutline} title="News" url="/news" />
                    <LargeSidebarItem IconOrImgUrl={GoTrophy} title="Sport" url="/sport" />
                    <LargeSidebarItem IconOrImgUrl={GoLightBulb} title="Learning" url="/learning" />
                    <LargeSidebarItem IconOrImgUrl={IoShirtOutline} title="Fashion & Beauty" url="/fashion&beauty" />
                    <LargeSidebarItem IconOrImgUrl={MdPodcasts} title="Podcasts" url="/podcasts" />
                </LargeSidebarSection>
            </aside>
        </>
    )
}

export default Sidebar