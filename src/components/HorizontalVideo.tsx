import { Link } from "react-router-dom";
import { NewVideoDataList } from "../Types";
import LazyImage from "./LazyLoadImage";

const HorizontalVideo = ({ videoId, thumbnailUrl, channelId, channelTitle, views, postedAt, duration, videoTitle, isShowView = false }: NewVideoDataList) => {
    return (
        <div className="flex sm:flex-row flex-col gap-2">
            <Link to={`/watch?v=${videoId}`} className="relative aspect-video lg:w-1/2 imageStretch" >
                <LazyImage src={thumbnailUrl} className={`transition-[border-radius] duration-200 sm:rounded-xl`} alt="" />

                <div className="absolute bottom-1 right-1 bg-secondary-dark text-secondary text-sm px-1 pb-0.5 rounded">
                    {duration}
                </div>
            </Link>

            <div className="flex gap-2 sm:w-3/5 sm:h-full ">
                <div className="flex flex-col sm:px-0 gap-1 px-4">
                    <Link to={`/watch?v=${videoId}`} className="font-bold lg:text-sm line-clamp-2">
                        {videoTitle} 
                    </Link>

                    <Link to={`/channel/${channelId}/home`} className="text-secondary-text dark:text-gray-400 text-sm lg:text-xs">
                        {channelTitle}
                    </Link>

                    {
                        isShowView && (
                            <div className="text-secondary-text dark:text-gray-400 text-sm lg:text-xs ">
                                {views} Views • {postedAt}
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

HorizontalVideo.loading = (
    <div className="flex sm:flex-row flex-col gap-2">
        <div className="relative aspect-video w-full px-2 sm:w-2/5 lg:w-1/2 rounded bg-slate-200 animate-pulse"></div>

        <div className="flex flex-col sm:px-0 gap-2 sm:gap-3 px-4 flex-grow">
            <p className="w-full h-3 lg:h-2.5 rounded bg-slate-200 animate-pulse"></p>
            <p className="w-full h-3 lg:h-2.5 rounded bg-slate-200 animate-pulse"></p>
            <p className="w-1/2 h-2 rounded bg-slate-200 animate-pulse"></p>
            <p className="w-3/4 h-2 rounded bg-slate-200 animate-pulse"></p>
        </div>
    </div>

)

export default HorizontalVideo