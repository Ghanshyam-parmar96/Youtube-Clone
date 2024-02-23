import { Link } from "react-router-dom";
import { NewVideoDataList } from "../Types";

const HorizontalVideo = ({ data, IconShow = false }: { data: NewVideoDataList[], IconShow?: boolean }) => {
    return (
        <>
            {data?.map((video) => (
                <div key={video.videoId} className="flex sm:flex-row flex-col gap-2">
                    <Link to={`/watch?v=${video.videoId}`} className="relative aspect-video lg:w-1/2" >
                        <img src={video.thumbnailUrl} className={`block w-full h-full object-cover transition-[border-radius] duration-200 sm:rounded-xl`} alt="" />

                        <div className="absolute bottom-1 right-1 bg-secondary-dark text-secondary text-sm px-1 pb-0.5 rounded">
                            {video.duration}
                        </div>
                    </Link>

                    <div className="flex gap-2 sm:w-3/5 sm:h-full ">
                        {IconShow && (<Link to={`/channel/${video.channelId}`} className="flex flex-shrink-0">
                            <img src={video.channelIcon} className="w-10 h-10 rounded-full" alt="" />
                        </Link>)}

                        <div className="flex flex-col sm:px-0 gap-1 px-4">
                            <Link to={`/watch?v=${video.videoId}`} className="font-bold lineClamp2">
                                {video.videoTitle}
                            </Link>
                            <Link to={`/channel/${video.channelId}`} className="text-secondary-text text-sm">
                                {video.channelTitle}
                            </Link>

                            <div className="text-secondary-text text-sm ">
                                {video.views} Views • {video.postedAt}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
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