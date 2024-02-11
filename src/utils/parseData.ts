import axios from "axios";
import { FetchPageData, NewVideoDataList, ParseVideoList, ParsedAllData, Thumbnails } from "../Types";
import convertDurationToTime from "./convertDurationToTime";
import { VIEW_FORMATTER, formatTimeAgo } from "./formatTimeAgo";
import { API_KEY } from "./constants";

interface ChannelPostData {
    kind: string;
    etag: string;
    id: string;
    snippet: {
        title: string;
        description: string;
        customUrl: string;
        publishedAt: string;
        thumbnails: {
            default: Thumbnails;
            medium: Thumbnails;
            high: Thumbnails;
        };
        localized: {
            title: string;
            description: string;
        };
        country?: string;
    };
}


const parseData = async (data: ParsedAllData): Promise<FetchPageData> => {
    const items: ParseVideoList[] = data.items;

    const channelIds: string = items.map(item => item.snippet.channelId).join('%2C');

    const channelPost: ChannelPostData[] = await axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${channelIds}&maxResults=50&key=${API_KEY}`).then((response) => response.data.items);

    const results : NewVideoDataList[] = items.map((item) => {
        const channelData = channelPost.find((element) => item.snippet.channelId === element.id);
        return {
            videoId: item.id || "",
            channelId: item.snippet.channelId || "",
            categoryId: item.snippet.categoryId || "",
            videoTitle: item.snippet.title || "",
            thumbnailUrl: item.snippet.thumbnails.medium.url || "",
            url: `https://www.youtube.com/watch?v=${item.id}` || "",
            views: VIEW_FORMATTER.format(Number(item.statistics.viewCount)) || "",
            postedAt: formatTimeAgo(item.snippet.publishedAt) || "",
            duration: convertDurationToTime(item.contentDetails.duration) || "",
            channelTitle: channelData?.snippet.title || "",
            channelIcon: channelData?.snippet.thumbnails.default.url || "",
            channelCustomUrl: channelData?.snippet.customUrl || ""
        }

    });
    
    return { ...data, items: results };        
};


export default parseData;