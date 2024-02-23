import InfiniteScroll from "react-infinite-scroll-component"
import { API_KEY, BASE_URL } from "../../utils/constants"
import { ParseVideoList, PlaylistDetails } from "../../Types"
import axios from "axios"
import { VIEW_FORMATTER, formatTimeAgo } from "../../utils/formatTimeAgo"
import convertDurationToTime from "../../utils/convertDurationToTime"
import { useInfiniteQuery } from "@tanstack/react-query"
import { Link } from "react-router-dom"

const WatchPlaylistItems = ({ playlistId }: { playlistId: string }) => {

    const playlistFilterFn = async (pageParam: string) => {
        let url = `${BASE_URL}/playlistItems?part=snippet%2CcontentDetails&maxResults=50&playlistId=${playlistId}&pageToken=${pageParam}&key=${API_KEY}`

        if (!pageParam) {
            url = `${BASE_URL}/playlistItems?part=snippet%2CcontentDetails&maxResults=50&playlistId=${playlistId}&key=${API_KEY}`
        }

        const playlistItems: PlaylistDetails = await axios.get(url).then((response) => response.data);

        const videoIdList: string = playlistItems.items.filter(item => !(item.snippet.title === "Deleted video" || item.snippet.title === "Private video")).map(item => item.contentDetails.videoId).join("%2C");

        const youtubeVideos: ParseVideoList[] = await axios.get(`${BASE_URL}/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoIdList}&key=${API_KEY}`).then((response) => response.data.items)

        const videosList = youtubeVideos.map((video) => ({
            videoId: video.id || "",
            videoTitle: video.snippet.title || "",
            thumbnailUrl: video.snippet.thumbnails.medium.url || "",
            views: VIEW_FORMATTER.format(Number(video.statistics.viewCount)) || "",
            postedAt: formatTimeAgo(video.snippet.publishedAt) || "",
            durations: convertDurationToTime(video.contentDetails.duration) || "",
            channelTitle: video.snippet.channelTitle || "",
            channelId: video.snippet.channelId || "",
        }))

        return { ...playlistItems, items: videosList };
    }

    const { data: playListItems, hasNextPage, fetchNextPage } = useInfiniteQuery({
        queryKey: ["WatchVideoPlaylistItems", playlistId],
        queryFn: ({ pageParam }) => playlistFilterFn(pageParam),
        initialPageParam: "",
        getNextPageParam: (lastPage) => {
            return lastPage?.nextPageToken
        },
        staleTime: Infinity,
        enabled: !!playlistId,
    })

    return (
        <InfiniteScroll
            dataLength={playListItems?.pageParams.length || 1}
            next={fetchNextPage}
            hasMore={hasNextPage}
            scrollableTarget = "scrollDiv"
            // scrollableTarget={window.innerWidth < 1024 ? "playlistItemsList1" : "playlistItemsList2"}
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
                <p className="mb-24 sm:mb-2" style={{ textAlign: 'center' }}>
                    <b>Yay! You have seen it all</b>
                </p>
            }
        >
            <div className="flex flex-col gap-3 mb-14">
                {playListItems?.pages.map((page) => page.items.map((item) => (
                    <div key={item.videoId} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3">
                        <Link to={`/watch?v=${item.videoId}&list=${playlistId}`} className="relative aspect-video w-full" >
                            <img src={item.thumbnailUrl} className={`block w-full h-full object-cover transition-[border-radius] duration-200 sm:rounded-xl`} alt="" />

                            <div className="absolute bottom-1 right-1 bg-secondary-dark text-secondary text-sm px-1 pb-0.5 rounded">
                                {item.durations}
                            </div>
                        </Link>
                        <div className="flex flex-col gap-2 lg:gap-0 sm:col-span-2 lg:col-span-1">
                            <Link to={`/watch?v=${item.videoId}&list=${playlistId}`} >
                                <h2 className="text-base lg:text-sm line-clamp-2 font-medium">{item.videoTitle}</h2>
                            </Link>
                            <p className="text-sm lg:text-[11px] text-gray-600">
                                <Link to={`/channel/${item.channelId}`}>{item.channelTitle}</Link> • {item.views} Views • {item.postedAt}
                            </p>
                        </div>
                    </div>
                )))}
            </div>
        </InfiniteScroll>
    )
}

export default WatchPlaylistItems;