import { Link } from "react-router-dom"
import { VideoGridItemProps } from "../Types"
import formatDuration from "../utils/formatDuration"
import { VIEW_FORMATTER, formatTimeAgo } from "../utils/formatTimeAgo"
import { useEffect, useRef, useState } from "react"

const VideoGridItem = ({ id, channel, duration, postedAt, thumbnailUrl, title, videoUrl, views }: VideoGridItemProps) => {

    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current == null) return;

        if (isVideoPlaying) {
            videoRef.current.currentTime = 0;
            videoRef.current.play();
        }else{
            videoRef.current.pause();
        }
    }, [isVideoPlaying])

    return (
        <div className="flex flex-col gap-2"
            onMouseEnter={() => setIsVideoPlaying(true)}
            onMouseLeave={() => setIsVideoPlaying(false)}
        >
            <Link to={`/watch?v=${id}`} className="relative aspect-video" >
                <img src={thumbnailUrl} className={`block w-full h-full object-cover transition-[border-radius] duration-200 ${isVideoPlaying ? "rounded-none" : "rounded-xl"}`} alt="" />

                <div className="absolute bottom-1 right-1 bg-secondary-dark text-secondary text-sm px-1 rounded">
                    {formatDuration(duration)}
                </div>

                <video 
                    className={`block h-full object-cover absolute inset-0 transition-opacity duration-200 ${isVideoPlaying ? "opacity-100 delay-200" : "opacity-0"}`}
                    src={videoUrl}
                    ref={videoRef}
                    muted
                    playsInline
                />
            </Link>

            <div className="flex gap-2">
                <Link to={`/@${channel.id}`} className="flex flex-shrink-0">
                    <img src={channel.profileUrl} className="w-10 h-10 rounded-full" alt="" />
                </Link>
                <div className="flex flex-col">
                    <Link to={`/watch?v=${id}`} className="font-bold">
                        {title}
                    </Link>
                    <Link to={`/@${channel.id}`} className="text-secondary-text text-sm">
                        {channel.name}
                    </Link>

                    <div className="text-secondary-text text-sm ">
                        {VIEW_FORMATTER.format(views)} Views • {formatTimeAgo(postedAt)}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default VideoGridItem