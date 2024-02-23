import { useInfiniteQuery } from "@tanstack/react-query"
import { API_KEY, BASE_URL, RAPIDAPI_BASE_URL, options } from "../../utils/constants";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { ParseVideoList, SearchVideoFnProps } from "../../Types";
import { VIEW_FORMATTER, formatTimeAgo } from "../../utils/formatTimeAgo";
import InfiniteScroll from "react-infinite-scroll-component";
import convertDurationToTime from "../../utils/convertDurationToTime";

const ChannelVideos = () => {

  const { channelId } = useParams();

  const fetchChannelVideos = async (pageParam: string) => {
    let url = `${RAPIDAPI_BASE_URL}/search?channelId=${channelId}&part=id&type=video&order=date&maxResults=50&pageToken=${pageParam}`

    if (!pageParam) {
      url = `${RAPIDAPI_BASE_URL}/search?channelId=${channelId}&part=id&type=video&order=date&maxResults=50`
    }

    const rapidVideos: SearchVideoFnProps = await axios.get(url, options).then((response) => response.data);

    const videosList: string = rapidVideos.items.map((item) => item.id.videoId || "").filter((item) => item !== "").join("%2C");

    const youtubeVideos: ParseVideoList[] = await axios.get(`${BASE_URL}/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videosList}&key=${API_KEY}`).then((response) => response.data.items)

    const response = youtubeVideos.map((item) => ({
      videoId: item.id || "",
      videoTitle: item.snippet.title || "",
      thumbnailUrl: item.snippet.thumbnails.medium.url || "",
      views: VIEW_FORMATTER.format(Number(item.statistics.viewCount)) || "",
      postedAt: formatTimeAgo(item.snippet.publishedAt) || "",
      durations: convertDurationToTime(item.contentDetails.duration) || "",
    }));

    return { ...rapidVideos, items: response, etag: "" }
  };

  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['channelVideos'],
    queryFn: ({ pageParam }) => fetchChannelVideos(pageParam),
    initialPageParam: "",
    getNextPageParam: (lastPage) => {
      return lastPage?.nextPageToken
    },
      enabled: !!channelId,
      staleTime: 1000 * 30,
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
      <InfiniteScroll
        className="h-full w-full "
        dataLength={data?.pageParams.length || 1}
        next={fetchNextPage}
        hasMore={hasNextPage}
        scrollableTarget="channelVideosScrollableDiv"
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
            <div key={list.videoId} className="flex flex-col gap-2">
              <div className="relative aspect-video" >
                <img src={list.thumbnailUrl} className={`block w-full h-full object-cover transition-[border-radius] duration-200 sm:rounded-xl`} alt="" />

                <div className="absolute bottom-1 right-1 bg-secondary-dark text-secondary text-sm px-1 pb-0.5 rounded flex items-center gap-1">
                  {list.durations}
                </div>
              </div>

              <div className="flex flex-col px-3">
                <Link to={`/watch?v=${list.videoId}`} className="font-bold lineClamp2">
                  {list.videoTitle}
                </Link>

                <div className="text-secondary-text text-sm">
                  {list.views} Views • {list.postedAt}
                </div>
              </div>
            </div>
          )))}
        </div>
      </InfiniteScroll>
    </>
  )
}

export default ChannelVideos