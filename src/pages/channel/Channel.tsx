import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { TbBellRinging } from "react-icons/tb";

import { API_KEY, BASE_URL, fetchStaleTime } from "../../utils/constants";
import { NavLink, Outlet, useParams } from "react-router-dom"
import { VIEW_FORMATTER } from "../../utils/formatTimeAgo";
import LazyImage from "../../components/LazyLoadImage";
import { useQuery } from "@tanstack/react-query"
import { ChannelDetails } from "../../Types";
import Button from "../../components/Button";
import axios from "axios";

const Channel = () => {
    const { channelId } = useParams();
    const { data } = useQuery<ChannelDetails>({
        queryKey: ['channel', channelId],
        queryFn: () => axios.get(`${BASE_URL}/channels?part=snippet%2Cstatistics&id=${channelId}&maxResults=50&key=${API_KEY}`).then((response) => response.data.items[0]),
        staleTime: fetchStaleTime,
        enabled : !!channelId,
    })

    return (
        <div className=" overflow-y-scroll px-2 sm:px-10" id="channelVideosScrollableDiv">
            <div className="flex items-center gap-5 w-full my-5">
                <div className="w-40 rounded-full aspect-square">
                    <LazyImage src={data?.snippet.thumbnails.medium.url || ""} className="rounded-full" />
                </div>
                <div className="flex flex-col gap-3 w-2/3">
                    <h2 className="text-4xl font-bold">{data?.snippet.title}</h2>
                    <p>{data?.snippet.customUrl} ‧ {VIEW_FORMATTER.format(Number(data?.statistics.subscriberCount))} Subscribers ‧ {VIEW_FORMATTER.format(Number(data?.statistics.videoCount))} videos</p>
                    <div className="w-full flex items-center"> 
                        <p className="overflow-hidden truncate">{data?.snippet.description}</p> 
                        <span className="text-2xl"><MdOutlineKeyboardArrowRight /></span> 
                    </div>
                    <div className="flex gap-4">
                        <Button variant="dark" size="btn" className="text-sm flex gap-2 items-center">
                            <TbBellRinging className="text-xl" />
                                Subscribed
                            <MdOutlineKeyboardArrowDown className="text-xl" />
                        </Button>
                        <Button variant="ghost" size="icon" className="border border-gray-400 h-8 w-14 text-sm rounded-2xl hidden sm:flex">join</Button>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-8 mt-7 py-2 sticky top-0 left-0 z-10 bg-white dark:bg-white/10 px-4">
                <NavLink to={`/channel/${channelId}/home`} className={ ({isActive}) => `relative after:contents-[''] after:w-[125%] after:absolute after:-bottom-2 after:left-0 after:border-[1.4px] after:-translate-x-[10%] after:border-gray-500 hover:after:block ${isActive ? "after:block" : "after:hidden"} `}>Home</NavLink>
                <NavLink to={`/channel/${channelId}/videos`} className={ ({isActive}) => `relative after:contents-[''] after:w-[125%] after:absolute after:-bottom-2 after:left-0 after:border-[1.4px] after:-translate-x-[10%] after:border-gray-500 hover:after:block ${isActive ? "after:block" : "after:hidden"} `}>Videos</NavLink>
                <NavLink to={`/channel/${channelId}/playlists`} className={ ({isActive}) => `relative after:contents-[''] after:w-[125%] after:absolute after:-bottom-2 after:left-0 after:border-[1.4px] after:-translate-x-[10%] after:border-gray-500 hover:after:block ${isActive ? "after:block" : "after:hidden"} `}>PlayLists</NavLink>
            </div>
            <hr />
            <div className="w-full h-full">
                <Outlet/>
            </div>
        </div>
    )
}

export default Channel