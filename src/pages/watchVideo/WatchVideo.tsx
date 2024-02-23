import Button from "../../components/Button";
import { IoMdShareAlt } from "react-icons/io";
import { BiDislike, BiLike } from "react-icons/bi";
import { TfiLoop, TfiMoreAlt } from "react-icons/tfi";
import { useState } from "react";
import { ChannelPlayListData, Comments, FetchPageData, NewVideoDataList, SuggestedVideoDataList, SuggestedVideoDataListItem, WatchPageVideoData } from "../../Types";
import commentParser from "../../utils/commentParser";
import Comment from "./Comment";
import HorizontalVideo from "../../components/HorizontalVideo";
import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_KEY, BASE_URL, RAPIDAPI_BASE_URL, options } from "../../utils/constants";
import parseData from "../../utils/parseData";
import WatchDataParser from "./WatchDataParser";
import { RxCross2 } from "react-icons/rx";
import { IoShuffle } from "react-icons/io5";
import { SlOptionsVertical } from "react-icons/sl";
import WatchPlaylistItems from "./WatchPlaylistItems";
import { MdKeyboardArrowDown } from "react-icons/md";

const WatchVideo = () => {
    const [clampDescription, setClampDescription] = useState(true);
    const [togglePlaylist, setTogglePlaylist] = useState(true);
    const [searchParams] = useSearchParams();
    let videoId = searchParams.get('v');
    let playlistId = searchParams.get('list') || "";

    const suggestedVideoFn = async (data: SuggestedVideoDataList): Promise<NewVideoDataList[]> => {
        let moreData;

        if (data?.nextPageToken) {
            moreData = await axios.get(`${RAPIDAPI_BASE_URL}/search?relatedToVideoId=${videoId}&hl=en&regionCode=IN&part=id&type=video&maxResults=50&pageToken=${data.nextPageToken}`, options).then((response) => response.data)
        }

        let videoIdFirst = data.items.map(item => (item.id?.videoId || "")).filter(item => item !== "");
        let videoIdSecond = moreData.items.map((item: SuggestedVideoDataListItem) => (item.id?.videoId || "")).filter((item: string) => item !== "");
        const allIds = [...videoIdFirst, ...videoIdSecond].join("%2C");

        let allVideos: FetchPageData = await axios.get(`${BASE_URL}/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${allIds}&hl=en&regionCode=IN&key=${API_KEY}`)
            .then((response) => parseData(response.data))

        return allVideos.items;
    }

    const { data: videoData, isLoading } = useQuery<WatchPageVideoData>({
        queryKey: ['WatchVideoData', videoId],
        queryFn: () => axios.get(`${BASE_URL}/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&hl=en&regionCode=IN&key=${API_KEY}`)
            .then((response) => WatchDataParser(response.data.items[0])),
        enabled: !!videoId,
        staleTime: 1000 * 30,
    });

    const { data: commentsData = [], isLoading: commentsDataLoading } = useQuery<Comments[]>({
        queryKey: ['WatchVideoCommentData', videoId],
        queryFn: () => axios.get(`${BASE_URL}/commentThreads?part=snippet%2Creplies&maxResults=100&order=relevance&videoId=${videoId}&key=${API_KEY}`)
            .then((response) => commentParser(response.data)),
        staleTime: 1000 * 30,
        enabled: !!videoId,
    });

    const { data: suggestedVideos = [], isLoading: suggestedVideoLoading } = useQuery<NewVideoDataList[]>({
        queryKey: ['WatchSuggestedVideos', videoId],
        queryFn: () => axios.get(`${RAPIDAPI_BASE_URL}/search?relatedToVideoId=${videoId}&hl=en&regionCode=IN&part=id&type=video&maxResults=50`, options)
            .then((response) => suggestedVideoFn(response.data)),
        staleTime: 1000 * 30,
        enabled: !!videoId,
    });

    const { data: playlistDetail } = useQuery<ChannelPlayListData>({
        queryKey: ['watchPlaylist', playlistId],
        queryFn: () => axios.get(`${BASE_URL}/playlists?part=snippet%2CcontentDetails&id=${playlistId}&maxResults=25&key=${API_KEY}`).then(response => response.data),
        enabled: !!playlistId,
        staleTime: 1000 * 30,
    })


    if (!videoId) {
        return (
            <h2>video is not going to play please provide videoId</h2>
        )
    }

    return (
        <div className="grid  grid-rows-[auto_1fr_auto] grid-cols-[1fr_1fr_1fr] gap-5 lg:gap-4 mt-5 relative sm:px-4 overflow-x-hidden" >
            <div className="row-start-1 row-end-2 col-start-1 col-end-4 lg:col-end-3">

                {/* Watch video section with loading skeleton */}
                {isLoading && <WatchDataLoading />}
                <div className="w-screen sm:w-auto md:w-[650px] md:mx-auto lg:w-full aspect-video relative md:rounded-2xl overflow-hidden 0border border-blue-600">
                    <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    />
                </div>
                <h2 className="font-bold text-2xl my-4 mx-4 lg:mx-0 ">{videoData?.videoTitle}</h2>
                <div className="flex flex-col xl:flex-row gap-6 xl:gap-2 items-start xl:items-center justify-between mb-4 mx-4 lg:mx-0">
                    <div className="flex items-center gap-4">
                        <img className="h-12 w-12 rounded-full" src={videoData?.channelIcon} alt="" />
                        <div>
                            <p className="font-semibold text-base truncate w-40"><Link to={`/channel/${videoData?.channelId}`}>{videoData?.channelTitle}</Link></p>
                            <span className="text-sm text-gray-500 truncate w-40">{videoData?.channelSubscriberCount} subscriber</span>
                        </div>
                        <Button variant="ghost" size="icon" className="border border-gray-400 h-8 w-14 text-sm rounded-2xl hidden sm:flex">join</Button>
                        <Button variant="dark" size="btn" className="text-sm">Subscribed</Button>
                    </div>
                    <div className="flex items-center gap-2.5">
                        <Button size="btn" variant="btn" className="hover:bg-[#f2f2f2] p-0" >
                            <span className="flex gap-3 text-sm items-center font-bold border-r-2 border-gray-300 pr-3 hover:bg-[#e9e8e8] pl-4 py-1.5 rounded-s-full">
                                <BiLike className="text-2xl text-black/70" />
                                {videoData?.videoLikeCount}
                            </span>
                            <span className="pr-4 py-1.5 hover:bg-[#e9e8e8] rounded-e-full">
                                <BiDislike className="text-2xl ml-3 text-black/70" />
                            </span>
                        </Button>
                        <Button size="btn" variant="btn" className="flex gap-2 font-semibold items-center text-sm " >
                            <IoMdShareAlt className="text-2xl" />
                            Share
                        </Button>
                        <Button size="icon" variant="btn" >
                            <TfiMoreAlt className="font-extrabold" />
                        </Button>
                    </div>

                </div>
                <div className={`px-4 lg:px-2 w-screen relative bg-[#f2f2f2] rounded-lg py-1 sm:w-auto overflow-hidden ${clampDescription ? "lineClamp4" : "pb-10"}`} >
                    <span className={`absolute bottom-1 cursor-pointer bg-[#f2f2f2] font-semibold ${clampDescription ? " right-2" : "left-2"}`}
                        onClick={() => setClampDescription((prev) => !prev)}
                    >
                        {clampDescription ? "...More" : "Show less"}
                    </span>
                    <p className="font-medium font-Roboto text-base">{videoData?.views} Views • {videoData?.postedAt}  {videoData?.postedAtDateFormate}</p>
                    <pre className="mt-1 text-sm font-Roboto">{videoData?.videoDescription}</pre>
                </div>
            </div>


            {/* suggested video section with loading skeleton */}
            <div className="row-start-2 row-end-3 col-start-1 col-end-4 lg:row-start-1 lg:row-end-4 lg:col-end-4 lg:col-start-3 grid gap-2">
                {suggestedVideoLoading && [...Array(15).fill(1)].map((item, i) => (
                    <div key={`suggestedVideoLoading-${i + item}`}>{HorizontalVideo.loading}</div>
                ))}

                {!!playlistId && (
                    <div className={` h-full ${togglePlaylist ? "lg:h-[450px]" : "lg:h-32"} w-full border-2 shadow-xl overflow-hidden rounded-lg border-red-5000`}>
                        <div className="py-2 px-2 bg-[#f2f2f2]">
                            <div className="flex items-center justify-between">
                                <Link to={`/playlist?list=${playlistId}`} className="text-xl font-bold line-clamp-2">{playlistDetail?.items[0].snippet.title}</Link>
                                <button onClick={() => setTogglePlaylist((prev) => !prev)} className="flex-shrink-0 cursor-pointer text-2xl">
                                    {togglePlaylist ? <RxCross2 /> : <MdKeyboardArrowDown />}
                                </button>
                            </div>
                            <p className="text-sm"><Link to={`/channel/${playlistDetail?.items[0].snippet.channelId}`}>{playlistDetail?.items[0].snippet.channelTitle}</Link> - {playlistDetail?.items[0].contentDetails.itemCount}</p>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="icon">
                                        <TfiLoop className="text-xl" />
                                    </Button>
                                    <Button variant="ghost" size="icon">
                                        <IoShuffle className="text-xl" />
                                    </Button>
                                </div>
                                <Button variant="ghost" size="icon">
                                    <SlOptionsVertical className="text-sm" />
                                </Button>
                            </div>
                        </div>
                        {togglePlaylist && (<div className="overflow-x-hidden h-96" id="scrollDiv">
                            <WatchPlaylistItems playlistId={playlistId} />
                        </div>)}
                    </div>
                )}

                <HorizontalVideo data={suggestedVideos} />
            </div>


            {/* comment section with loading skeleton */}
            <div className="row-start-3 row-end-4 col-start-1 col-end-4 lg:col-end-3 lg:row-start-2 lg:row-end-4">
                {commentsDataLoading && [...Array(15).fill(1)].map((item, i) => (
                    <div key={`commentsDataLoading-${i + item}`}>{Comment.loading}</div>
                ))}
                <Comment data={commentsData} />
            </div>
        </div>
    )
}

export default WatchVideo;






const WatchDataLoading = () => {
    return (
        < >
            <div className="w-screen sm:w-auto md:w-[650px] md:mx-auto lg:w-full aspect-video bg-slate-300 animate-pulse md:rounded-2xl"></div>
            <h2 className="h-4 rounded w-full animate-pulse bg-slate-300 my-4 mx-4 lg:mx-0 "></h2>
            <h2 className="h-4 rounded w-full animate-pulse bg-slate-300 my-4 mx-4 lg:mx-0 "></h2>
            <div className="flex flex-col xl:flex-row gap-6 xl:gap-2 items-start xl:items-center justify-between mb-4 mx-4 lg:mx-0">
                <div className="flex items-center gap-4">
                    <p className="h-12 w-12 rounded-full bg-slate-300 animate-pulse" />
                    <div>
                        <p className="h-2 rounded my-2 bg-slate-300 animate-pulse w-40"></p>
                        <p className="h-2 rounded my-2 bg-slate-300 animate-pulse w-40"></p>
                    </div>
                    <p className="bg-slate-300 animate-pulse h-8 w-14 rounded-2xl hidden"></p>
                    <p className="bg-slate-300 animate-pulse h-8 w-14 rounded-2xl"></p>
                </div>
                <div className="flex items-center gap-x-6">
                    <p className="bg-slate-300 animate-pulse h-8 w-8 rounded-2xl "></p>
                    <p className="bg-slate-300 animate-pulse h-8 w-8 rounded-2xl "></p>
                    <p className="bg-slate-300 animate-pulse h-8 w-14 rounded-2xl "></p>
                    <p className="bg-slate-300 animate-pulse h-8 w-8 rounded-2xl "></p>
                </div>

            </div>
            <div className={`px-4 lg:px-2 w-screen h-32 bg-slate-300 animate-pulse rounded-lg py-1 sm:w-auto overflow-hidden`} >
            </div>
        </>
    )
};