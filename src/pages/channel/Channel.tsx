import { useQuery } from "@tanstack/react-query"
import { Outlet, useNavigate, useParams } from "react-router-dom"
import { API_KEY, BASE_URL } from "../../utils/constants";
import axios from "axios";
import { ChannelDetails } from "../../Types";
import { VIEW_FORMATTER } from "../../utils/formatTimeAgo";
import Button from "../../components/Button";
import { TbBellRinging } from "react-icons/tb";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowRight } from "react-icons/md";

const Channel = () => {
    const { channelId } = useParams();
    const navigate = useNavigate();

    const { data } = useQuery<ChannelDetails>({
        queryKey: ['channel', channelId],
        queryFn: () => axios.get(`${BASE_URL}/channels?part=snippet%2Cstatistics&id=${channelId}&maxResults=50&key=${API_KEY}`).then((response) => response.data.items[0]),
        staleTime: Infinity
    })

    return (
        <div className=" overflow-x-hidden px-2 sm:px-10" id="channelVideosScrollableDiv">
            <div className="flex items-center gap-5 w-full my-5">
                <div className="w-40 rounded-full aspect-square">
                    <img src={data?.snippet.thumbnails.medium.url} className="w-full h-full object-cover object-center rounded-full" />
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
            <div className="flex items-center gap-8 mt-7 py-2 sticky top-0 left-0 z-10 bg-white">
                <button onClick={() => navigate(`/${channelId}`)} className="relative after:contents-[''] after:w-[125%] after:absolute after:-bottom-2 after:left-0 after:border-[1.4px] after:-translate-x-[10%] after:border-gray-500 after:hidden hover:after:block ">Home</button>
                <button onClick={() => navigate(`/${channelId}/videos`)} className="relative after:contents-[''] after:w-[125%] after:absolute after:-bottom-2 after:left-0 after:border-[1.4px] after:-translate-x-[10%] after:border-gray-500 after:hidden hover:after:block ">Videos</button>
                <button onClick={() => navigate(`/${channelId}/playlists`)} className="relative after:contents-[''] after:w-[125%] after:absolute after:-bottom-2 after:left-0 after:border-[1.4px] after:-translate-x-[10%] after:border-gray-500 after:hidden hover:after:block ">PlayLists</button>
            </div>
            <hr />
            <div className="w-full h-full">
                <Outlet/>
            </div>
        </div>
    )
}

export default Channel