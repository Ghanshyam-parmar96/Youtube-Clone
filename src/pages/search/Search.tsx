import { BsSliders2 } from "react-icons/bs";

import { SearchResultFetchData, searchFilterSliceProps } from "../../Types";  
import { RAPIDAPI_BASE_URL, fetchStaleTime, options } from "../../utils/constants";
import InfiniteScroll from "react-infinite-scroll-component";
import SearchChannelDetails from "./SearchChannelDetails";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import SearchPlaylist from "./SearchPlaylist";
import Button from "../../components/Button";
import SearchFilter from "./SearchFilter";
import SearchVideos from "./SearchVideos";
import { useState } from "react";
import axios from "axios";



const Search = () => {
  const [searchFilterBox, setSearchFilterBox] = useState<boolean>(false);
  const [searchFilteredData, setSearchFilteredData] = useState<searchFilterSliceProps>({upload_date : "", duration : "", features : "", sort_by : "relevance", type : ""});
  const [searchParams] = useSearchParams();
  let query = searchParams.get('query');

 
  const searchVideoFn = async (pageParam: string):Promise<SearchResultFetchData> => {
    let allFilters = Object.keys(searchFilteredData).map((item) => searchFilteredData[item] ? `&${item}=${searchFilteredData[item]}` : "").join("");

    let url = `${RAPIDAPI_BASE_URL}/search?query=${query}&geo=IN&lang=en${allFilters}&token=${pageParam}`;

    if (!pageParam) {
      url = `${RAPIDAPI_BASE_URL}/search?query=${query}&lang=en&geo=IN${allFilters}`;
    }
    
    return await axios.get(url, options).then((response) => response.data);
  };

  
  const closeFilter = (arg : searchFilterSliceProps) => {
    setSearchFilteredData(arg);
    setSearchFilterBox(false);
  }

  
  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['searchVideos', query, searchFilteredData],
    queryFn: ({ pageParam }) => searchVideoFn(pageParam),
    initialPageParam: "",
    getNextPageParam: (lastPage) => {
      return lastPage?.continuation;
    },
    enabled: !!query,
    staleTime: fetchStaleTime,
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
    <div className="h-full w-screen sm:w-full lg:max-w-6xl mx-auto sm:px-3 flex flex-col gap-3 items-center overflow-y-scroll" id="searchScrollableDiv">

      { searchFilterBox && <SearchFilter closeFilter={closeFilter} />}

      <Button variant="ghost" size="btn" onClick={() => setSearchFilterBox(true)} className="px-4 font-medium text-sm self-end my-3">
        Filters <span className="ml-2"> <BsSliders2 className="text-lg inline" /> </span>
      </Button>

      <InfiniteScroll
        className="h-full w-full flex gap-5 flex-col"
        dataLength={data?.pageParams.length || 0}
        hasMore={hasNextPage}
        next={fetchNextPage}
        // scrollableTarget="scrollableDiv"
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
        
        { data?.pages.map((result) => result.data.map((item) => {
          if (item.type === 'video') {
            return (
              <SearchVideos 
                key={item.videoId}
                videoId={item.videoId || ''}
                videoTitle={item.title}
                channelId={item.channelId}
                views={item.viewCount ||""}
                duration={item.lengthText || '🔴 LIVE'}
                channelTitle={item.channelTitle}
                postedAt={item.publishedText || ''}
                description={item.description || ''}
                thumbnailUrl={item.thumbnail ? item.thumbnail[0].url : ''}
                channelIcon={item.channelThumbnail ? item.channelThumbnail[0].url : ''}
              />
            )
          } else if (item.type === 'playlist') {
            return (
              <SearchPlaylist
                title={item.title}
                key={item.playlistId}
                videoId={item.videoId || ''}
                videos={item.videos || []}
                channelId={item.channelId}
                channelTitle={item.channelTitle}
                playlistId={item.playlistId || ""}
                videoCount={item.videoCount || ""}
                thumbnailUrl={item.thumbnail ? item.thumbnail[3].url : ""}
              />
            )
          } else if (item.type === "channel") {
            return (
              <SearchChannelDetails
                key={item.channelId}
                channelId={item.channelId}
                channelTitle={item.channelTitle}
                thumbnailUrl={ item.thumbnail? item.thumbnail[1].url || item.thumbnail[0].url : ''}
                subscriberCount={item.subscriberCount || ''}
                description={item.description || ''}
              />
            )
          }
        }))}
      </InfiniteScroll>
    </div>
  )
}

export default Search;

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

