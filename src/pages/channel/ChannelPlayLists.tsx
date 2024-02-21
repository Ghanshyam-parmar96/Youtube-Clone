import { BiMenuAltLeft } from "react-icons/bi"
import { Link, useParams } from "react-router-dom"
import { TbPlaylistAdd } from "react-icons/tb"
import { formatTimeAgo } from "../../utils/formatTimeAgo"
import { useInfiniteQuery } from "@tanstack/react-query"
import { API_KEY, BASE_URL } from "../../utils/constants"
import axios from "axios"
import { ChannelPlayListData } from "../../Types"
import InfiniteScroll from "react-infinite-scroll-component"

const ChannelPlayLists = () => {

    const { channelId } = useParams();

    const fetchChannelPlayListsData = async (pageParam: string) => {
        let url = `${BASE_URL}/playlists?part=snippet%2CcontentDetails&channelId=${channelId}&maxResults=50&pageToken=${pageParam}&key=${API_KEY}`

        if (!pageParam) {
            url = `${BASE_URL}/playlists?part=snippet%2CcontentDetails&channelId=${channelId}&maxResults=50&key=${API_KEY}`;
        }

        const playlists: ChannelPlayListData = await axios.get(url).then((response) => response.data);

        const filteredPlaylists = playlists.items.map((playlist) => ({
            id: playlist.id,
            title: playlist.snippet.title,
            thumbnailUrl: playlist.snippet.thumbnails.medium.url,
            publishedAt: playlist.snippet.publishedAt,
            itemCount: playlist.contentDetails.itemCount,
        }))

        return { ...playlists, items: filteredPlaylists };
    }

    const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery({
        queryKey: ["channelPlayLists"],
        queryFn: ({ pageParam }) => fetchChannelPlayListsData(pageParam),
        initialPageParam: "",
        getNextPageParam: (lastPage) => {
            return lastPage?.nextPageToken;
        },
        staleTime: Infinity,
    })

    if (isLoading) {
        return (
            <div className="mb-20 sm:mb-0 grid gap-4 mt-4 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
                {[...Array(15).fill(1)].map((item, i) => (
                    <div key={`channelPlaylist-${item + i}`} className="flex flex-col gap-2">
                        <div className="relative aspect-video w-full bg-slate-300 animate-pulse rounded" ></div>
                        <div className="flex flex-col px-3 flex-grow gap-3">
                            <div className="w-full bg-slate-300 h-3 rounded animate-pulse"></div>
                            <div className="w-1/2 bg-slate-300 h-2 rounded animate-pulse"></div>
                            <div className="w-3/4 bg-slate-300 h-2 rounded animate-pulse"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <>
            <div className="flex items-center justify-between my-3">
                <h2 className="text-lg">Created playlists</h2>
                <p className='flex items-center gap-1 text-base cursor-pointer '>
                    <BiMenuAltLeft className='text-3xl' />
                    Sort by
                </p>
            </div>
            <InfiniteScroll
                className="w-full h-full"
                dataLength={data?.pages.length || 1}
                hasMore={hasNextPage}
                next={fetchNextPage}
                // scrollableTarget="scrollableDiv"
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
                <div className="mb-20 sm:mb-0 grid gap-4 mt-4 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
                    {data?.pages.map((item) => item.items.map(list => (
                        <div key={list.id} className="flex flex-col gap-2">
                            <div className="relative aspect-video" >
                                <img src={list.thumbnailUrl} className={`block w-full h-full object-cover transition-[border-radius] duration-200 sm:rounded-xl`} alt="" />

                                <div className="absolute bottom-1 right-1 bg-secondary-dark text-secondary text-sm px-1 pb-0.5 rounded flex items-center gap-1">
                                    <TbPlaylistAdd className="text-xl" /> {list.itemCount} videos
                                </div>
                            </div>

                            <div className="flex flex-col px-3">
                                <Link to={`/playlist?list=${list.id}`} className="font-bold lineClamp2">
                                    {list.title}
                                </Link>

                                <div className="text-secondary-text text-sm">
                                    Updated {formatTimeAgo(list.publishedAt)}
                                </div>

                                <Link to={`/playlist?list=${list.id}`} className="text-secondary-text text-sm font-bold">
                                    View full playlist
                                </Link>
                            </div>
                        </div>
                    )))}
                </div>
            </InfiniteScroll>
        </>
    )
}

export default ChannelPlayLists