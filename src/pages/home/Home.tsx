import { useState } from "react";
import CategoryPills from "../../components/CategoryPills";
import VideoGridItem from "../../components/VideoGridItem";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_KEY } from "../../utils/constants";
import { HomePageCategoryPills } from "../../Types";
import parseData from "../../utils/parseData";
import InfiniteScroll from 'react-infinite-scroll-component';

const Home = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");

    const fetchData = async (pageParam: string) => {
        let url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCodeype=IN&pageToken=${pageParam}&key=${API_KEY}`;

        if (!pageParam) {
            url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCodeype=IN&key=${API_KEY}`;
        }

        return await axios.get(url).then((response) => parseData(response.data));
    };

    const { isLoading, data, hasNextPage, fetchNextPage, isError } = useInfiniteQuery({
        queryKey: ['homePageData'],
        queryFn: ({ pageParam }) => fetchData(pageParam),
        initialPageParam: "",
        getNextPageParam: (lastPage) => {
            return lastPage?.nextPageToken
        },
        staleTime: Infinity,
    });

    const { data: categoryData = [] } = useQuery<{ categoryId: string, categoryName: string }[]>({
        queryKey: ['homePageCategory'],
        queryFn: () => axios.get(`https://youtube.googleapis.com/youtube/v3/videoCategories?part=snippet&hl=en&regionCode=IN&key=${API_KEY}`)
            .then((response) => response.data.items.map((item: HomePageCategoryPills) => ({ categoryId: item.id, categoryName: item.snippet.title }))),
        staleTime: Infinity,
    });

    if (isLoading) {
        return (
            <div className="overflow-x-hidden sm:px-6">
                <div className="grid gap-4 mt-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
                    {[...Array(15).fill(1)].map((item, i) => (<div key={`loadingSkeletonHomePage-${item + i}`}>{VideoGridItem.isLoading}</div>))}
                </div>
            </div>
        )
    }

    if (isError) return 'An error has occurred: '

    return (
        <div className="overflow-x-hidden sm:px-6" id="scrollableDiv">

            <div className="sticky top-0 bg-white z-10 pb-3 pt-3 px-3 sm:px-0">
                <CategoryPills
                    categories={[{ categoryId: "xx", categoryName: "All" }, ...categoryData]}
                    selectedCategory={selectedCategory}
                    onSelect={setSelectedCategory}
                />
            </div>

            <InfiniteScroll
                className="h-full w-full flex flex-col flex-shrink-0 gap-2"
                dataLength={data?.pageParams.length || 1}
                next={fetchNextPage}
                hasMore={hasNextPage}
                scrollableTarget="scrollableDiv"
                loader={
                    <div className="grid place-content-center my-4 h-7" >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-8 h-8 animate-spin"
                            viewBox="0 0 16 16">
                            <path
                                d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
                            <path fill-rule="evenodd"
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
                <div className="grid gap-4 mt-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
                    {data?.pages.map((element) => element.items.map((video) => (
                        <VideoGridItem {...video} key={video.videoId} />
                    )))}
                </div>

            </InfiniteScroll>
        </div>
    )
}

export default Home;