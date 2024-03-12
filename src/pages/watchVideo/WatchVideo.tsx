import { BiDislike, BiLike } from "react-icons/bi";
import { IoMdShareAlt } from "react-icons/io";
import { TfiMoreAlt } from "react-icons/tfi";

import { Comments, FetchPageData, NewVideoDataList, SuggestedVideoDataList, SuggestedVideoDataListItem, WatchPageVideoData } from "../../Types";
import { API_KEY, BASE_URL, RAPIDAPI_LITE_BASE_URL, fetchStaleTime, rapid_lite_headers } from "../../utils/constants";
import HorizontalVideo from "../../components/HorizontalVideo";
import { Link, useSearchParams } from "react-router-dom";
import commentParser from "../../utils/commentParser";
import WatchPlaylistItems from "./WatchPlaylistItems";
import { useQuery } from "@tanstack/react-query";
import WatchDataParser from "./WatchDataParser";
import parseData from "../../utils/parseData";
import Button from "../../components/Button";
import { useState } from "react";
import Comment from "./Comment";
import axios from "axios";
import LazyImage from "../../components/LazyLoadImage";

const WatchVideo = () => {
    const [clampDescription, setClampDescription] = useState(true);
    const [searchParams] = useSearchParams();
    let videoId = searchParams.get('v');
    let playlistId = searchParams.get('list') || "";

    const suggestedVideoFn = async (): Promise<NewVideoDataList[]> => {
        let suggestedVideo: SuggestedVideoDataList = await axios.get(`${RAPIDAPI_LITE_BASE_URL}/search?relatedToVideoId=${videoId}&part=id&type=video&maxResults=50`, rapid_lite_headers).then((response) => response.data);

        let moreData: SuggestedVideoDataListItem[] | [] = (suggestedVideo?.nextPageToken) ? await axios.get(`${RAPIDAPI_LITE_BASE_URL}/search?relatedToVideoId=${videoId}&part=id&type=video&maxResults=50&pageToken=${suggestedVideo.nextPageToken}`, rapid_lite_headers).then((response) => response.data.items) : [];

        const allVideoItems = [...suggestedVideo.items, ...moreData];
        const allVideoId: string = allVideoItems.map(item => (item.id?.videoId || "")).filter(item => item !== "").join("%2C");

        const allVideos: FetchPageData = await axios.get(`${BASE_URL}/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${allVideoId}&hl=en&regionCode=IN&key=${API_KEY}`)
            .then((response) => parseData(response.data))

        return allVideos.items;
    }

    const { data: videoData, isLoading } = useQuery<WatchPageVideoData>({
        queryKey: ['WatchVideoData', videoId],
        queryFn: () => axios.get(`${BASE_URL}/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&hl=en&regionCode=IN&key=${API_KEY}`)
            .then((response) => WatchDataParser(response.data.items[0])),
        enabled: !!videoId,
        staleTime: fetchStaleTime,
    });

    const { data: commentsData = [], isLoading: commentsDataLoading } = useQuery<Comments[]>({
        queryKey: ['WatchVideoCommentData', videoId],
        queryFn: () => axios.get(`${BASE_URL}/commentThreads?part=snippet%2Creplies&maxResults=100&order=relevance&videoId=${videoId}&key=${API_KEY}`)
            .then((response) => commentParser(response.data)),
        staleTime: fetchStaleTime,
        enabled: !!videoId,
    });

    const { data: suggestedVideos = [], isLoading: suggestedVideoLoading } = useQuery<NewVideoDataList[]>({
        queryKey: ['WatchSuggestedVideos', videoId],
        queryFn: () => suggestedVideoFn(),
        staleTime: fetchStaleTime,
        enabled: !!videoId,
    });


    if (!videoId) {
        return (
            <h2>video is not going to play please provide videoId</h2>
        )
    }

    return (
        <div className="grid grid-cols-1 lg:auto-rows-max lg:grid-cols-3 gap-5 lg:gap-4 mt-5 relative sm:px-4 overflow-x-hidden" >
            <div className="lg:col-span-2">

                {/* Watch video section with loading skeleton */}
                {isLoading && <WatchDataLoading />}

                <div className="w-screen sm:w-auto md:w-[650px] md:mx-auto lg:w-full aspect-video relative md:rounded-2xl overflow-hidden">
                    <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    />
                </div>

                <h2 className="font-bold text-lg sm:text-2xl my-4 mx-4 lg:mx-0 ">{videoData?.videoTitle}</h2>
                <div className="flex flex-col xl:flex-row gap-6 xl:gap-2 items-start xl:items-center justify-between mb-4 mx-4 lg:mx-0">
                    <div className="flex items-center gap-4">
                        <span className="h-12 w-12">
                            <LazyImage className=" rounded-full" src={videoData?.channelIcon || ""} alt="" />
                        </span>
                        <div>
                            <p className="font-semibold text-base truncate w-32 sm:w-40"><Link to={`/channel/${videoData?.channelId}`}>{videoData?.channelTitle}</Link></p>
                            <span className="text-sm text-gray-500 dark:text-gray-400 truncate w-32 sm:w-40">{videoData?.channelSubscriberCount} subscriber</span>
                        </div>
                        <Button variant="ghost" size="icon" className="border border-gray-400 h-8 w-14 text-sm rounded-2xl hidden sm:flex">join</Button>
                        <Button variant="dark" size="btn" className="text-sm">Subscribed</Button>
                    </div>
                    <div className="flex items-center gap-2.5">
                        <Button size="btn" variant="btn" className="hover:bg-[#f2f2f2] p-0" >
                            <span className="flex gap-3 text-sm items-center font-bold border-r-2 border-gray-300 pr-3 hover:bg-[#e9e8e8] dark:hover:bg-black/20 pl-4 py-1.5 rounded-s-full">
                                <BiLike className="text-2xl text-black/70 dark:text-white" />
                                {videoData?.videoLikeCount}
                            </span>
                            <span className="pr-4 py-1.5 hover:bg-[#e9e8e8] dark:hover:bg-black/20 rounded-e-full">
                                <BiDislike className="text-2xl ml-3 text-black/70 dark:text-white" />
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
                <div className={`px-4 lg:px-2 w-screen relative bg-[#f2f2f2] dark:bg-white/40 rounded-lg py-1 sm:w-auto overflow-hidden ${clampDescription ? "lineClamp4" : "pb-10"}`} >
                    <span className={`absolute bottom-1 cursor-pointer bg-[#f2f2f2] dark:bg-transparent font-semibold ${clampDescription ? " right-2" : "left-2"}`}
                        onClick={() => setClampDescription((prev) => !prev)}
                    >
                        {clampDescription ? "...More" : "Show less"}
                    </span>
                    <p className="font-medium font-Roboto text-base">{videoData?.views} Views • {videoData?.postedAt}  {videoData?.postedAtDateFormate}</p>
                    <pre className="mt-1 text-sm font-Roboto text-wrap">{videoData?.videoDescription}</pre>
                </div>
            </div>


            {/* suggested video section with loading skeleton */}
            <div className="lg:row-span-2 lg:col-span-1 grid gap-2 h-fit">
                {suggestedVideoLoading && [...Array(15).fill(1)].map((item, i) => (
                    <div key={`suggestedVideoLoading-${i + item}`}>{HorizontalVideo.loading}</div>
                ))}

                {!!playlistId && (
                    <WatchPlaylistItems playlistId={playlistId} />
                )}

                {
                    suggestedVideos?.map((video) => (
                        <HorizontalVideo {...video} key={video.videoId} isShowView />
                    ))
                }

            </div>


            {/* comment section with loading skeleton */}
            <div className="lg:col-span-2">
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