import { useInfiniteQuery } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router-dom";
import { API_KEY, BASE_URL, RAPIDAPI_BASE_URL, options } from "../../utils/constants";
import axios from "axios";
import { FetchPageData, SearchVideoFnProps } from "../../Types";
import parseData from "../../utils/parseData";
import InfiniteScroll from "react-infinite-scroll-component";


const Search = () => {

  const [searchParams] = useSearchParams();
  let query = searchParams.get('query');


  const searchVideoFn = async (pageParam: string) => {
    let url = `${RAPIDAPI_BASE_URL}/search?q=${query}&part=id&regionCode=IN&maxResults=50&type=video&order=relevance&pageToken=${pageParam}`;

    if (!pageParam) {
      url = `${RAPIDAPI_BASE_URL}/search?q=${query}&part=id&regionCode=IN&maxResults=50&type=video&order=relevance`;
    }
    const videoData: SearchVideoFnProps = await axios.get(url, options).then((response) => response.data);
    delete videoData.regionCode

    const videoId: string = videoData.items.map((item) => item.id.videoId || "").filter(item => item !== "").join("%2C");

    const fetchedVideo: FetchPageData = await axios.get(`${BASE_URL}/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&maxResults=50&regionCode=IN&key=${API_KEY}`).then((response) => parseData(response.data));

    return { ...videoData, items: fetchedVideo.items, etag: fetchedVideo.etag }

  };

  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['searchVideos', query],
    queryFn: ({ pageParam }) => searchVideoFn(pageParam),
    initialPageParam: "",
    getNextPageParam: (lastPage) => {
      return lastPage?.nextPageToken;
    },

    staleTime: Infinity,
  });


  if (isLoading) {
    return (
      <div className="h-full w-screen sm:w-full lg:max-w-6xl mx-auto flex flex-col gap-3 0flex-grow items-center overflow-x-auto">
        {[...Array(15).fill(1)].map((item, i) => (
          <SearchLoading key={`searchVideos-${item + i}`} />
        ))}
      </div>
    )
  }


  return (
    <div className="h-full w-screen sm:w-full lg:max-w-6xl mx-auto flex flex-col gap-3 0flex-grow items-center overflow-x-auto" id="searchScrollableDiv">

      <InfiniteScroll
        className="h-full w-full flex gap-5 flex-col"
        dataLength={data?.pages.length || 0}
        hasMore={hasNextPage}
        next={fetchNextPage}
        scrollableTarget="searchScrollableDiv"
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
        {data?.pages.map(page => page.items.map(item => (
          <div key={item.videoId} className="flex sm:flex-row flex-col gap-2 w-full">
            <Link to={`/watch?v=${item.videoId}`} className="relative aspect-video w-full md:w-3/4" >
              <img src={item.thumbnailUrl} className={`block w-full h-full object-cover transition-[border-radius] duration-200 sm:rounded-xl`} alt="" />

              <div className="absolute bottom-1 right-1 bg-secondary-dark text-secondary text-sm px-1 pb-0.5 rounded">
                {item.duration}
              </div>
            </Link>

            <div className="flex gap-2 py-1 px-3 w-full">
              <Link to={`/@${item.channelCustomUrl}`} className="flex flex-shrink-0 sm:hidden">
                <img src={item.channelIcon} className="w-12 h-12 rounded-full" alt="" />
              </Link>

              <div className="flex flex-col sm:px-0 gap-1 sm:gap-2 px-4">
                <Link to={`/watch?v=${item.videoId}`} className="font-bold sm:text-lg md:text-xl lineClamp2 sm:order-1">
                  {item.videoTitle}
                </Link>
                <div className="flex items-center gap-4 sm:order-3">
                  <Link to={`/@${item.channelCustomUrl}`} className="sm:flex flex-shrink-0 hidden">
                    <img src={item.channelIcon} className="w-10 h-10 rounded-full" alt="" />
                  </Link>

                  <Link to={`/@${item.channelIcon}`} className="text-secondary-text text-sm sm:text-base">
                    {item.channelTitle}
                  </Link>
                </div>

                <div className="text-secondary-text text-sm sm:order-2 ">
                  {item.views} Views • {item.postedAt}
                </div>
              </div>
            </div>
          </div>
        )))}
      </InfiniteScroll>
    </div>
  )
}


const SearchLoading = () => {
  return (
    <div className="w-full h-full flex flex-col sm:flex-row gap-3">
      <div className="aspect-video w-full md:w-3/4 rounded bg-slate-200 animate-pulse"></div>
      <div className="flex flex-col sm:px-0 gap-2 sm:gap-3 px-4 w-full ">
        <p className="w-full h-3 lg:h-5 2xl:h-7 rounded bg-slate-200 animate-pulse"></p>
        <p className="w-full h-3 lg:h-5 2xl:h-7 rounded bg-slate-200 animate-pulse"></p>
        <p className="w-full h-3 lg:h-5 2xl:h-7 hidden sm:block rounded bg-slate-200 animate-pulse"></p>
        <p className="w-1/2 h-2 lg:h-3 2xl:h-4 hidden sm:block rounded bg-slate-200 animate-pulse"></p>
        <p className="w-1/2 h-2 lg:h-3 2xl:h-4 rounded bg-slate-200 animate-pulse"></p>
        <p className="w-3/4 h-2 lg:h-3 2xl:h-4 rounded bg-slate-200 animate-pulse"></p>
      </div>
    </div>
  )
}

export default Search;