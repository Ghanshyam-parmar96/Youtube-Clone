import axios from "axios";
import { ChannelPostData, FetchPageData, NewVideoDataList, ParseVideoList, ParsedAllData } from "../Types";
import convertDurationToTime from "./convertDurationToTime";
import { VIEW_FORMATTER, formatTimeAgo } from "./formatTimeAgo";
import { API_KEY, BASE_URL } from "./constants";


const parseData = async (data: ParsedAllData): Promise<FetchPageData> => {
    const items: ParseVideoList[] = data.items;

    const channelIds: string = items.map(item => item.snippet.channelId).join('%2C');

    const channelPost: ChannelPostData[] = await axios.get(`${BASE_URL}/channels?part=snippet&id=${channelIds}&maxResults=50&key=${API_KEY}`).then((response) => response.data.items);

    const results : NewVideoDataList[] = items.map((item) => {
        const channelData = channelPost.find((element) => item.snippet.channelId === element.id);
        return {
            videoId: item.id || "",
            channelId: item.snippet.channelId || "",
            categoryId: item.snippet.categoryId || "",
            videoTitle: item.snippet.title || "",
            thumbnailUrl: item.snippet.thumbnails.medium.url || "",
            views: VIEW_FORMATTER.format(Number(item.statistics.viewCount)) || "",
            postedAt: formatTimeAgo(item.snippet.publishedAt) || "",
            duration: convertDurationToTime(item.contentDetails.duration) || "",
            channelTitle: channelData?.snippet.title || "",
            channelIcon: channelData?.snippet.thumbnails.default.url || "",
        }

    });
    
    return { ...data, items: results };        
};


export default parseData;