import { LiaDownloadSolid } from "react-icons/lia";
import { SlOptionsVertical } from "react-icons/sl";
import { TbPlaylistAdd } from "react-icons/tb";
import { IoIosShareAlt } from "react-icons/io";
import { IoShuffle } from "react-icons/io5";
import { FaPlay } from "react-icons/fa6";

import { API_KEY, BASE_URL, fetchStaleTime } from "../../utils/constants";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import playlistDataParser from "../../utils/playlistDataParser";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link, useSearchParams } from "react-router-dom";
import LazyImage from "../../components/LazyLoadImage";
import { ChannelPlayListData } from "../../Types";
import Button from "../../components/Button";
import axios from "axios";


const Playlist = () => {
  const [searchParams] = useSearchParams();
  const playlistId = searchParams.get('list') || "";

  const dateFormat = (date: string) => {
    const newDate: Date = new Date(date);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${newDate.getDate()} ${months[newDate.getMonth()]} ${newDate.getFullYear()}`;
  }

  const { data } = useQuery<ChannelPlayListData>({
    queryKey: ['playlist', playlistId],
    queryFn: () => axios.get(`${BASE_URL}/playlists?part=snippet%2CcontentDetails&id=${playlistId}&maxResults=25&key=${API_KEY}`).then(response => response.data),
    enabled: !!playlistId,
    staleTime: fetchStaleTime,
  })

  const { data: playListItems, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["playlistItems", playlistId],
    queryFn: ({ pageParam }) => playlistDataParser(pageParam, playlistId),
    initialPageParam: "",
    getNextPageParam: (lastPage) => {
      return lastPage?.nextPageToken
    },
    staleTime: fetchStaleTime,
    enabled: !!playlistId,
  })


  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pb-20 sm:pb-0 ml-4 w-screen sm:w-full h-full lg:h-[calc(100vh_-_65px)] overflow-x-hidden" id="playlistItemsList1">
      <div className="w-full bg-gradient-to-b from-indigo-900 to-black/50 p-4 lg:overflow-y-scroll lg:h-[calc(100vh_-_130px)] lg:my-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-3 scrollbarHide">
          <div className="aspect-video mx-auto">
            <LazyImage src={data?.items[0].snippet.thumbnails.medium.url || ""} className="rounded-lg" alt="" />
          </div>
          <div className="flex flex-col gap-3 sm:gap-4 md:gap-3 text-white">
            <h2 className="text-xl sm:text-2xl md:text-lg md:line-clamp-2 font-extrabold">{data?.items[0].snippet.title}</h2>
            <div className="flex lg:flex-col gap-4">
              <div className="flex flex-col gap-1">
                <Link to={`/channel/${data?.items[0].snippet.channelId}`} className="font-bold text-xs">{data?.items[0].snippet.channelTitle}</Link>
                <p className="font-medium text-xs text-gray-300 flex items-center gap-4">
                  <span> {data?.items[0].contentDetails.itemCount} videos </span>
                  <span className="hidden lg:block">publishedAt - {dateFormat(data?.items[0].snippet.publishedAt || "")}</span>
                </p>
              </div>
              <div className="flex items-center gap-3 text-black">
                <Button variant="btn" size="icon">
                  <TbPlaylistAdd className='text-3xl' />
                </Button>
                <Button variant="btn" size="icon">
                  <IoIosShareAlt className='text-3xl' />
                </Button>
                <Button variant="btn" size="icon">
                  <LiaDownloadSolid className='text-3xl' />
                </Button>
                <Button variant="btn" size="icon">
                  <SlOptionsVertical />
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="dark" size="btn">
                <Link to={`/watch?v=${playListItems?.pages[0].items[0].videoId}&list=${playlistId}`} className="flex items-center gap-2 text-sm px-2 shrink-0">
                  <span><FaPlay /></span>
                  <span>Play all</span>
                </Link>
              </Button>
              <Button variant="default" size="btn">
                <p className="flex items-center gap-2 text-sm px-2 text-black">
                  <span className="text-xl"><IoShuffle /></span>
                  <span>Shuffle</span>
                </p>
              </Button>
            </div>
            <pre className="text-wrap line-clamp-2 sm:line-clamp-3 md:text-sm lg:line-clamp-none">{data?.items[0].snippet.description}</pre>
          </div>
        </div>
      </div>
      <div className="col-span-1 lg:col-span-2 lg:pt-7 lg:overflow-y-scroll px-4" id="playlistItemsList2">
        <InfiniteScroll
          dataLength={playListItems?.pageParams.length || 0}
          next={fetchNextPage}
          hasMore={hasNextPage}
          scrollableTarget={window.innerWidth < 1024 ? "playlistItemsList1" : "playlistItemsList2"}
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
          <div className="flex flex-col gap-3">
            {playListItems?.pages.map((page) => page.items.map((item) => (
              <div key={item.videoId} className="flex items-center gap-3 ">
                <span className="text-xs">{Number(item.position) + 1}</span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <Link to={`/watch?v=${item.videoId}&list=${playlistId}`} className="relative aspect-video w-full" >
                    <LazyImage src={item.thumbnailUrl} className="transition-[border-radius] duration-200 sm:rounded-xl" alt="" />

                    <div className="absolute bottom-1 right-1 bg-secondary-dark text-secondary text-sm px-1 pb-0.5 rounded">
                      {item.durations}
                    </div>
                  </Link>
                  <div className="flex flex-col gap-2 sm:col-span-2">
                    <Link to={`/watch?v=${item.videoId}&list=${playlistId}`} >
                      <h2 className="text-base line-clamp-2 font-medium">{item.videoTitle}</h2>
                    </Link>
                    <p className="text-sm  dark:text-gray-400">
                      <Link to={`/channel/${item.channelId}/home`}>{item.channelTitle}</Link> • {item.views} Views • {item.postedAt}
                    </p>
                  </div>
                </div>
              </div>
            )))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  )
}

export default Playlist