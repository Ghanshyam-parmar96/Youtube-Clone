import axios from "axios";
import { ChannelPlayListData, ParseVideoList, PlaylistDetails } from "../../Types";
import { API_KEY, BASE_URL } from "../../utils/constants";
import { Link, useSearchParams } from "react-router-dom";
import convertDurationToTime from "../../utils/convertDurationToTime";
import { VIEW_FORMATTER, formatTimeAgo } from "../../utils/formatTimeAgo";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { TbPlaylistAdd } from "react-icons/tb";
import Button from "../../components/Button";
import { IoIosShareAlt } from "react-icons/io";
import { LiaDownloadSolid } from "react-icons/lia";
import { SlOptionsVertical } from "react-icons/sl";
import { FaPlay } from "react-icons/fa6";
import { IoShuffle } from "react-icons/io5";
import InfiniteScroll from "react-infinite-scroll-component";


const Playlist = () => {
  const [searchParams] = useSearchParams();
  const playlistId = searchParams.get('list');

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
      channelId : video.snippet.channelId || "",
    }))

    return { ...playlistItems, items: videosList };
  }

  const dateFormat = (date: string) => {
    const newDate: Date = new Date(date);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${newDate.getDate()} ${months[newDate.getMonth()]} ${newDate.getFullYear()}`;
  }

  const { data } = useQuery<ChannelPlayListData>({
    queryKey: ['playlist', playlistId],
    queryFn: () => axios.get(`${BASE_URL}/playlists?part=snippet%2CcontentDetails&id=${playlistId}&maxResults=25&key=${API_KEY}`).then(response => response.data),
    enabled: !!playlistId,
    staleTime: 1000* 20,
  })

  const { data: playListItems, hasNextPage, isLoading, fetchNextPage } = useInfiniteQuery({
    queryKey: ["playlistItems", playlistId],
    queryFn: ({ pageParam }) => playlistFilterFn(pageParam),
    initialPageParam: "",
    getNextPageParam: (lastPage) => {
      return lastPage?.nextPageToken
    },
    staleTime: Infinity,
    enabled: !!playlistId,
  })

  // console.log(data);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-20 sm:mb-0 w-screen sm:w-full sm:overflow-x-hidden" id="playlistItemsList1">
      <div className="w-full h-full sm:h-96 lg:h-full overflow-hidden sm:py-7 relative after:contents-[''] after:absolute after:bottom-0 
      after:sm:bottom-7 after:rounded-b-full after:left-0 after:w-full after:h-4 after:bg-green-700 before:contents-[''] before:absolute before:top-0 before:sm:top-7 before:rounded-t-full before:left-0 before:w-full before:h-4 before:bg-green-700">
        <div className="flex flex-col sm:flex-row lg:flex-col gap-1 sm:gap-3 0circle_patten py-4 sm:py-5 px-3 rounded-2xl border border-green-700 h-full w-full overflow-x-hidden scrollbarHide">
          <div className="aspect-video sm:w-2/5 lg:w-full">
            <img src={data?.items[0].snippet.thumbnails.medium.url} className="h-full w-full object-cover object-center rounded-md" alt="" />
          </div>
          <div className="flex flex-col gap-2 sm:gap-4">
            <h2 className="text-xl sm:text-2xl font-extrabold">{data?.items[0].snippet.title}</h2>
            <div className="flex lg:flex-col gap-5">
              <div className="flex flex-col gap-1">
                <Link to={`/channel/${data?.items[0].snippet.channelId}`} className="font-bold text-xs">{data?.items[0].snippet.channelTitle}</Link>
                <p className="font-medium text-xs text-gray-500 flex items-center gap-4">
                  <span> {data?.items[0].contentDetails.itemCount} videos </span>
                  <span className="hidden md:block">publishedAt - {dateFormat(data?.items[0].snippet.publishedAt || "")}</span>
                </p>
              </div>
              <div className="flex items-center gap-3">
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
                <p className="flex items-center gap-2 text-sm px-2">
                  <span className="text-xl"><IoShuffle /></span>
                  <span>Shuffle</span>
                </p>
              </Button>
            </div>
            <pre className="text-wrap line-clamp-2 sm:line-clamp-5 lg:line-clamp-none">{data?.items[0].snippet.description}</pre>
          </div>
        </div>
      </div>
      <div className="col-span-1 lg:col-span-2 lg:pt-7 lg:overflow-x-hidden" id="playlistItemsList2">
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
              <div key={item.videoId} className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <Link to={`/watch?v=${item.videoId}&list=${playlistId}`} className="relative aspect-video w-full" >
                  <img src={item.thumbnailUrl} className={`block w-full h-full object-cover transition-[border-radius] duration-200 sm:rounded-xl`} alt="" />

                  <div className="absolute bottom-1 right-1 bg-secondary-dark text-secondary text-sm px-1 pb-0.5 rounded">
                    {item.durations}
                  </div>
                </Link>
                <div className="flex flex-col gap-2 sm:col-span-2">
                  <Link to={`/watch?v=${item.videoId}&list=${playlistId}`} >
                    <h2 className="text-base line-clamp-2 font-medium">{item.videoTitle}</h2>
                  </Link>
                  <p className="text-sm">
                   <Link to={`/channel/${item.channelId}`}>{item.channelTitle}</Link> • {item.views} Views • {item.postedAt}
                  </p>
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