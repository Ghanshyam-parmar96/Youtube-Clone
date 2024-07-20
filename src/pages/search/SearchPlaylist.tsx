import { RiPlayList2Fill } from 'react-icons/ri';
import { Link } from 'react-router-dom'
import LazyImage from '../../components/LazyLoadImage';


interface SearchPlaylistProps {
    channelId: string;
    channelTitle: string;
    thumbnailUrl: string;
    playlistId: string;
    title: string;
    videoCount: string;
    videoId: string;
    videos: {
        videoId: string;
        title: string;
        lengthText: string;
    }[];
}
const SearchPlaylist = ({ channelTitle, channelId, playlistId, thumbnailUrl, title, videoId, videos, videoCount }: SearchPlaylistProps) => {
    return (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2 w-full">
            <Link to={`/watch?v=${videoId}&list=${playlistId}`} className="relative aspect-video col-span-1 imageStretch" >
                <LazyImage src={thumbnailUrl} className={`transition-[border-radius] duration-200 sm:rounded-xl`} alt="" />

                <div className="absolute bottom-3 right-5 sm:right-1 bg-secondary-dark text-secondary text-sm px-1 py-0.5 rounded flex items-center gap-1">
                    <span className='text-sm'><RiPlayList2Fill /></span>
                    <span className='text-xs'>{videoCount}</span>
                </div>
            </Link>
            <div className="flex flex-col gap-2 sm:col-span-1 md:col-span-2 px-2">
                <h2 className="text-base line-clamp-2 font-medium">
                    <Link to={`/watch?v=${videoId}&list=${playlistId}`} >
                        {title}
                    </Link>
                </h2>
                <p className="text-sm text-secondary-text dark:text-gray-300 -mt-2">
                    <Link to={`/channel/${channelId}/home`}>{channelTitle}</Link> • playlist
                </p>
                {
                    videos.map((item) => (
                        <div key={item.videoId} className="flex flex-col gap-2">
                            <h2 className="text-xs line-clamp-1 font-medium">
                                <Link to={`/watch?v=${item.videoId}&list=${playlistId}`} >
                                    {item.title} • {item.lengthText}
                                </Link>
                            </h2>
                        </div>
                    ))
                }
                <p className='text-gray-500/80 dark:text-gray-400 text-xs font-medium'>
                    <Link to={`/playlist?list=${playlistId}`}>
                        VIEW FULL PLAYLIST
                    </Link>
                </p>

            </div>
        </div>
    )
}

export default SearchPlaylist