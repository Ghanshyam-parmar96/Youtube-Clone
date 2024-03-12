import { Link } from "react-router-dom";
import Button from "../../components/Button";
import LazyImage from "../../components/LazyLoadImage";

interface SearchChannelDetailsProps {
    channelId: string;
    channelTitle: string;
    description: string;
    subscriberCount: string;
    thumbnailUrl: string;
}

const SearchChannelDetails = ({ channelId, channelTitle, description, subscriberCount, thumbnailUrl }: SearchChannelDetailsProps) => {
    return (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 w-full px-3 overflow-hidden">
            <div className="h-full w-full grid place-content-center col-span-1">
                <Link to={`/channel/${channelId}`} className="w-40 h-40 imageStretch" >
                    <LazyImage src={`https:${thumbnailUrl}`} className=" rounded-full" alt="" />
                </Link>
            </div>
            <div className="flex flex-col items-center justify-between gap-2 col-span-1 md:col-span-2 lg:flex-row">
                <div className="flex items-center flex-col gap-1 lg:items-start">
                    <h2 className="text-xl">
                        <Link to={`/channel/${channelId}`}>
                            {channelTitle}
                        </Link>
                    </h2>
                    <p className="text-xs text-secondary-text">{subscriberCount}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{description}</p>
                </div>
                <Button variant="dark" size="btn" className="w-fit px-6" >Subscribe</Button>
            </div>
        </div>
    )
}

export default SearchChannelDetails