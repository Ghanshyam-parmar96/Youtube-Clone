import { useQueries } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { API_KEY, BASE_URL, RAPIDAPI_BASE_URL, options } from "../../utils/constants";
import { ParseVideoList, SearchVideoFnProps } from "../../Types";
import { VIEW_FORMATTER, formatTimeAgo } from "../../utils/formatTimeAgo";
import convertDurationToTime from "../../utils/convertDurationToTime";
import VideosSlider from "../../components/VideosSlider";
import { IoPlay } from "react-icons/io5";

const ChannelHome = () => {

  const { channelId } = useParams();

  const fetchChannelVideos = async (order: string = "date") => {
    let url = `${RAPIDAPI_BASE_URL}/search?channelId=${channelId}&part=id&type=video&order=${order}&maxResults=50`

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

  const ids = ["relevance", "date", "viewCount"];

  const results = useQueries({
    queries: ids.map((id) => ({
      queryKey: ['channelHome', id],
      queryFn: () => fetchChannelVideos(id),
      staleTime: 1000 * 30,
      enabled: !!channelId,
    }))
  })

  if (results[0]?.isLoading) {
    return (
      <div className="pb-24 sm:pb-8">
        <div className="">
          <h2 className="text-xl font-bold my-3">For You</h2>
          <div className="flex gap-4">
            {[...Array(15).fill(1)].map((item, i) => (
              <div key={`channelHomeLoading0-${item + i}`} className="flex flex-col gap-2">
                <div className="relative aspect-video w-60 bg-slate-300 animate-pulse rounded" ></div>
                <div className="flex flex-col px-3 flex-grow gap-3">
                  <div className="w-full bg-slate-300 h-3 rounded animate-pulse"></div>
                  <div className="w-1/2 bg-slate-300 h-2 rounded animate-pulse"></div>
                  <div className="w-3/4 bg-slate-300 h-2 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <div className="flex items-center gap-4 cursor-pointer">
            <h2 className="text-xl font-bold my-3">Videos</h2>
            <div className="flex items-center gap-1">
              <span><IoPlay /></span> <span className="text-sm">Play all</span>
            </div>
          </div>
          <div className="flex gap-4">
            {[...Array(15).fill(1)].map((item, i) => (
              <div key={`channelHomeLoading1-${item + i}`} className="flex flex-col gap-2">
                <div className="relative aspect-video w-60 bg-slate-300 animate-pulse rounded" ></div>
                <div className="flex flex-col px-3 flex-grow gap-3">
                  <div className="w-full bg-slate-300 h-3 rounded animate-pulse"></div>
                  <div className="w-1/2 bg-slate-300 h-2 rounded animate-pulse"></div>
                  <div className="w-3/4 bg-slate-300 h-2 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <div className="flex items-center gap-4 cursor-pointer">
            <h2 className="text-xl font-bold my-3">Popular videos</h2>
            <div className="flex items-center gap-1">
              <span><IoPlay /></span> <span className="text-sm">Play all</span>
            </div>
          </div>
          <div className="flex gap-4">
            {[...Array(15).fill(1)].map((item, i) => (
              <div key={`channelHomeLoading2-${item + i}`} className="flex flex-col gap-2">
                <div className="relative aspect-video w-60 bg-slate-300 animate-pulse rounded" ></div>
                <div className="flex flex-col px-3 flex-grow gap-3">
                  <div className="w-full bg-slate-300 h-3 rounded animate-pulse"></div>
                  <div className="w-1/2 bg-slate-300 h-2 rounded animate-pulse"></div>
                  <div className="w-3/4 bg-slate-300 h-2 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-24 sm:pb-8">
      <div className="">
        <h2 className="text-xl font-bold my-3">For You</h2>
        <VideosSlider videos={results[0]?.data?.items || []} />
      </div>

      <div className="mt-10">
        <div className="flex items-center gap-4 cursor-pointer">
          <h2 className="text-xl font-bold my-3">Videos</h2>
          <div className="flex items-center gap-1">
            <span><IoPlay /></span> <span className="text-sm">Play all</span>
          </div>
        </div>
        <VideosSlider videos={results[1]?.data?.items || []} />
      </div>

      <div className="mt-10">
        <div className="flex items-center gap-4 cursor-pointer">
          <h2 className="text-xl font-bold my-3">Popular videos</h2>
          <div className="flex items-center gap-1">
            <span><IoPlay /></span> <span className="text-sm">Play all</span>
          </div>
        </div>
        <VideosSlider videos={results[2]?.data?.items || []} />
      </div>
    </div>
  )
}

export default ChannelHome



