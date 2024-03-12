import { Link } from "react-router-dom";
import { VIEW_FORMATTER } from "../../utils/formatTimeAgo";
import LazyImage from "../../components/LazyLoadImage";


interface SearchVideoProps {
    videoId: string;
    videoTitle: string;
    thumbnailUrl: string;
    duration: string;
    channelId: string;
    channelIcon: string;
    channelTitle: string;
    description: string;
    views: string;
    postedAt: string;
}


const SearchVideos = ({ videoId, videoTitle, thumbnailUrl, duration, channelId, channelIcon, channelTitle, description, views, postedAt }: SearchVideoProps) => {
    return (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2 w-full">
            <Link to={`/watch?v=${videoId}`} className="relative aspect-video col-span-1 imageStretch" >
                <LazyImage src={thumbnailUrl} className={`transition-[border-radius] duration-200 sm:rounded-xl`} alt="" />

                <div className="absolute bottom-3 right-5 sm:right-1 bg-secondary-dark text-secondary text-sm px-1 pb-0.5 rounded">
                    {duration}
                </div>
            </Link>

            <div className="flex gap-2 py-1 px-3 col-span-1 md:col-span-2">
                <Link to={`/channel/${channelId}`} className="flex flex-shrink-0 sm:hidden w-12 h-12">
                    <LazyImage src={channelIcon} className=" rounded-full" alt="" />
                </Link>

                <div className="flex flex-col sm:px-0 gap-1 sm:gap-1 px-4">
                    <Link to={`/watch?v=${videoId}`} className="font-bold sm:text-base md:text-xl line-clamp-2 sm:order-1">
                        {videoTitle}
                    </Link>
                    <div className="flex items-center gap-3 sm:order-3">
                        <Link to={`/channel/${channelId}`} className="sm:flex flex-shrink-0 hidden w-8 h-8">
                            <LazyImage src={channelIcon} className="rounded-full" alt="" />
                        </Link>

                        <Link to={`/channel/${channelId}`} className="text-secondary-text dark:text-gray-300 text-sm">
                            {channelTitle}
                        </Link>
                    </div>

                    <div className="text-secondary-text dark:text-gray-400 text-sm sm:order-2 ">
                        {VIEW_FORMATTER.format(Number(views))} Views • {postedAt}
                    </div>

                    <div className="text-xs order-4 hidden sm:block text-secondary-text dark:text-gray-400" >{description}</div>

                </div>
            </div>
        </div>
    );
}

export default SearchVideos;