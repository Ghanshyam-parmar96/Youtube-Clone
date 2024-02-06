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

const Sidebar = () => {
    return (
        <>
            <aside className="sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col lg:hidden">
                <SmallSidebarItem Icon={GoHome} title="Home" url="/" />
                <SmallSidebarItem Icon={LuRepeat} title="Shorts" url="/shorts" />
                <SmallSidebarItem Icon={BsCollectionPlay} title="Subscription" url="/subscription" />
                <SmallSidebarItem Icon={MdOutlineVideoLibrary} title="You" url="/you" />
            </aside>

            <aside className="w-56 lg:sticky absolute top-2 overflow-y-auto scrollbar-hidden py-3 flex-col gap-2 px-2 lg:flex hidden">
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