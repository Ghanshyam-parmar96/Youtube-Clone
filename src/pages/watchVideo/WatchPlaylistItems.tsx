import { MdKeyboardArrowDown } from "react-icons/md"
import { SlOptionsVertical } from "react-icons/sl"
import { IoShuffle } from "react-icons/io5"
import { RxCross2 } from "react-icons/rx"
import { TfiLoop } from "react-icons/tfi"

import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import playlistDataParser from "../../utils/playlistDataParser"
import InfiniteScroll from "react-infinite-scroll-component"
import { API_KEY, BASE_URL, fetchStaleTime } from "../../utils/constants"
import { ChannelPlayListData } from "../../Types"
import { Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import LazyImage from "../../components/LazyLoadImage"

interface WatchPlaylistItemsProps {
    playlistId: string
}

const WatchPlaylistItems = ({ playlistId }: WatchPlaylistItemsProps) => {
    const [togglePlaylist, setTogglePlaylist] = useState(true);

    const { data: playListItems, hasNextPage, fetchNextPage } = useInfiniteQuery({
        queryKey: ["WatchVideoPlaylistItems", playlistId],
        queryFn: ({ pageParam }) => playlistDataParser(pageParam, playlistId),
        initialPageParam: "",
        getNextPageParam: (lastPage) => {
            return lastPage?.nextPageToken
        },
        staleTime: fetchStaleTime,
        enabled: !!playlistId,
    })

    const { data: playlistDetail } = useQuery<ChannelPlayListData>({
        queryKey: ['watchPlaylist', playlistId],
        queryFn: () => axios.get(`${BASE_URL}/playlists?part=snippet%2CcontentDetails&id=${playlistId}&maxResults=25&key=${API_KEY}`).then(response => response.data),
        enabled: !!playlistId,
        staleTime: fetchStaleTime,
    })

    return (
        <div className="rounded-xl mb-5 border border-gray-300 dark:border-gray-600 shadow-lg shadow-gray-400 dark:shadow-gray-800">
            <div className={`${togglePlaylist ? "h-96" : "lg:h-20"}  flex flex-col`}>
                <div className={`py-1 px-3 bg-[#f2f2f2] dark:bg-white/20 rounded-t-xl ${!togglePlaylist && "rounded-b-xl"}`}>
                    <div className="flex items-center justify-between">
                        <Link to={`/playlist?list=${playlistId}`} className=" text-base sm:text-xl font-bold line-clamp-2 lg:line-clamp-1">{playlistDetail?.items[0].snippet.title}</Link>
                        <button onClick={() => setTogglePlaylist((prev) => !prev)} className="flex-shrink-0 cursor-pointer text-2xl">
                            {togglePlaylist ? <RxCross2 /> : <MdKeyboardArrowDown />}
                        </button>
                    </div>
                    <p className="text-sm"><Link to={`/channel/${playlistDetail?.items[0].snippet.channelId}`}>{playlistDetail?.items[0].snippet.channelTitle}</Link> - {playlistDetail?.items[0].contentDetails.itemCount}</p>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 mx-1 my-1">
                            <TfiLoop className="text-xl cursor-pointer" />
                            <IoShuffle className="text-xl cursor-pointer" />
                        </div>
                        <SlOptionsVertical className="text-sm cursor-pointer" />
                    </div>
                </div>

                {
                    togglePlaylist && (
                        <div className="overflow-y-scroll pt-3 mx-2" id="WatchPlaylistItemsScrollDiv">
                            <InfiniteScroll
                                dataLength={playListItems?.pageParams.length || 0}
                                next={fetchNextPage}
                                hasMore={hasNextPage}
                                scrollableTarget="WatchPlaylistItemsScrollDiv"
                                loader={
                                    <div className="grid place-content-center my-4 h-7" >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-8 h-8 animate-spin"
                                            viewBox="0 0 16 16">
                                            <path
                                                d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
                                            <path fillRule="evenodd"
                                                d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z" />
                                        </svg>
                                    </div>
                                }
                                endMessage={
                                    <p className="sm:mb-2" style={{ textAlign: 'center' }}>
                                        <b>Yay! You have seen it all</b>
                                    </p>
                                }
                            >
                                <div className="flex flex-col gap-3">
                                    {playListItems?.pages.map((page) => page.items.map((item) => (
                                        <div key={item.videoId} className="flex items-center gap-1">
                                            <span className="text-xs">{Number(item.position) + 1}</span>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3">
                                                <Link to={`/watch?v=${item.videoId}&list=${playlistId}`} className="relative aspect-video w-full" >
                                                    <LazyImage src={item.thumbnailUrl} className={`transition-[border-radius] duration-200 sm:rounded-xl`} alt="" />

                                                    <div className="absolute bottom-1 right-1 bg-secondary-dark text-secondary text-sm px-1 pb-0.5 rounded">
                                                        {item.durations}
                                                    </div>
                                                </Link>
                                                <div className="flex flex-col gap-2 lg:gap-0 sm:col-span-2 lg:col-span-1">
                                                    <Link to={`/watch?v=${item.videoId}&list=${playlistId}`} >
                                                        <h2 className="text-base lg:text-sm line-clamp-2 font-medium">{item.videoTitle}</h2>
                                                    </Link>
                                                    <p className="text-sm lg:text-[11px] text-gray-600 dark:text-gray-400">
                                                        <Link to={`/channel/${item.channelId}`}>{item.channelTitle}</Link>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )))}
                                </div>
                            </InfiniteScroll>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default WatchPlaylistItems;