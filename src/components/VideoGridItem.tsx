import { Link } from "react-router-dom"
import { NewVideoDataList } from "../Types"
import LazyImage from "./LazyLoadImage";

const VideoGridItem = ({ videoId, channelIcon, channelId, channelTitle, duration, postedAt, thumbnailUrl, videoTitle, views, showChannelDetails = false }: NewVideoDataList) => {

    return (
        <div className="flex flex-col gap-2">
            <Link to={`/watch?v=${videoId}`} className="relative aspect-video imageStretch" >
                <LazyImage src={thumbnailUrl} className=" transition-[border-radius] duration-200 sm:rounded-xl" alt="" />

                <div className="absolute bottom-1 right-1 bg-secondary-dark text-secondary text-sm px-1 pb-0.5 rounded">
                    {duration}
                </div>
            </Link>

            <div className="flex gap-2">
                {showChannelDetails && (
                    <Link to={`/channel/${channelId}`} className="flex flex-shrink-0 w-10 h-10">
                        <LazyImage src={channelIcon} className=" rounded-full" alt="" />
                    </Link>
                )}
                <div className="flex flex-col">
                    <Link to={`/watch?v=${videoId}`} className="font-bold line-clamp-2">
                        {videoTitle}
                    </Link>
                    {showChannelDetails && (
                        <Link to={`/channel/${channelId}`} className="text-secondary-text dark:text-gray-400 text-sm">
                            {channelTitle}
                        </Link>
                    )}

                    <div className="text-secondary-text dark:text-gray-400 text-sm ">
                        {views} Views • {postedAt}
                    </div>
                </div>
            </div>
        </div>
    )
}


VideoGridItem.isLoading = <div className="flex flex-col gap-2 flex-shrink-0 flex-grow">
    <div className="sm:w-full w-screen h-full aspect-video bg-gray-300 rounded-md animate-pulse"></div>
    <div className="flex gap-2">
        <div className="h-10 w-10 bg-gray-300 rounded-full animate-pulse"></div>
        <div className="flex flex-col gap-2 flex-grow">
            <div className="h-3 w-full bg-gray-300 rounded-md animate-pulse"></div>
            <div className="h-3 w-full bg-gray-300 rounded-md animate-pulse"></div>
            <div className="h-3 w-1/2 bg-gray-300 rounded-md animate-pulse"></div>
            <div className="h-3 w-3/4 bg-gray-300 rounded-md animate-pulse"></div>
        </div>
    </div>
</div>;

export default VideoGridItem