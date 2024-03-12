import { VIEW_FORMATTER, formatTimeAgo } from "./formatTimeAgo";
import convertDurationToTime from "./convertDurationToTime";
import { ParseVideoList, PlaylistDetails } from "../Types";
import { API_KEY, BASE_URL } from "./constants";
import axios from "axios";

const playlistDataParser = async (pageParam: string,playlistId :string) => {
    let url = `${BASE_URL}/playlistItems?part=snippet%2CcontentDetails&maxResults=50&playlistId=${playlistId}&pageToken=${pageParam}&key=${API_KEY}`

    if (!pageParam) {
        url = `${BASE_URL}/playlistItems?part=snippet%2CcontentDetails&maxResults=50&playlistId=${playlistId}&key=${API_KEY}`
    }

    const playlist: PlaylistDetails = await axios.get(url).then((response) => response.data);

    const videoIdList: string = playlist.items.filter(item => !(item.snippet.title === "Deleted video" || item.snippet.title === "Private video")).map(item => item.contentDetails.videoId).join("%2C");

    const youtubeVideos: ParseVideoList[] = await axios.get(`${BASE_URL}/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoIdList}&key=${API_KEY}`).then((response) => response.data.items)

    const videosList = youtubeVideos.map((video) => {
        const findPosition = playlist.items.find(v => v.contentDetails.videoId === video.id);
        return {
            videoId: video.id || "",
            videoTitle: video.snippet.title || "",
            thumbnailUrl: video.snippet.thumbnails.medium.url || "",
            views: VIEW_FORMATTER.format(Number(video.statistics.viewCount)) || "",
            postedAt: formatTimeAgo(video.snippet.publishedAt) || "",
            durations: convertDurationToTime(video.contentDetails.duration) || "",
            channelTitle: video.snippet.channelTitle || "",
            channelId: video.snippet.channelId || "",
            position: findPosition?.snippet.position,
        }
    })

    return { ...playlist, items: videosList };
}

export default playlistDataParser;