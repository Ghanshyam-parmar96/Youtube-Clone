import axios from "axios";
import { ParseVideoList, Thumbnails, WatchPageVideoData } from "../../Types";
import { VIEW_FORMATTER, formatTimeAgo } from "../../utils/formatTimeAgo";
import convertDurationToTime from "../../utils/convertDurationToTime";
import { API_KEY } from "../../utils/constants";

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

    statistics: {
        hiddenSubscriberCount: false
        subscriberCount: string;
        videoCount: string;
        viewCount: string;
    }
}


const WatchDataParser = async (item: ParseVideoList): Promise<WatchPageVideoData> => {
    const channelIds: string = item.snippet.channelId;

    const channelData: ChannelPostData = await axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2Cstatistics&id=${channelIds}&maxResults=50&key=${API_KEY}`)
        .then((response) => response.data.items[0]);

    const dateFormat = (date: string) => {
        const newDate: Date = new Date(date);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug','Sep', 'Oct', 'Nov', 'Dec'];
        return `${newDate.getDate()} ${months[newDate.getMonth()]} ${newDate.getFullYear()}`;
    }

    return {
        videoId: item.id || "",
        channelId: item.snippet.channelId || "",
        categoryId: item.snippet.categoryId || "",
        videoTitle: item.snippet.title || "",
        videoDescription: item.snippet.description || "",
        thumbnailUrl: item.snippet.thumbnails.medium.url || "",
        views: VIEW_FORMATTER.format(Number(item.statistics.viewCount)) || "",
        postedAt: formatTimeAgo(item.snippet.publishedAt) || "",
        postedAtDateFormate: dateFormat(item.snippet.publishedAt) || "",
        duration: convertDurationToTime(item.contentDetails.duration) || "",
        videoCommentCount: VIEW_FORMATTER.format(Number(item.statistics.commentCount)) || "",
        videoLikeCount: VIEW_FORMATTER.format(Number(item.statistics.likeCount)) || "",
        channelTitle: channelData?.snippet.title || "",
        channelIcon: channelData?.snippet.thumbnails.default.url || "",
        channelCustomUrl: channelData?.snippet.customUrl || "",
        channelSubscriberCount: VIEW_FORMATTER.format(Number(channelData?.statistics.subscriberCount)) || "",
    }
};

export default WatchDataParser