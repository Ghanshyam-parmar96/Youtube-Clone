import { FetchPageData, SearchResultFetchData } from "../Types";
import { API_KEY, BASE_URL } from "./constants";
import parseData from "./parseData";
import axios from "axios";

const rapidApiDataParser = async (data: SearchResultFetchData): Promise<FetchPageData> => {

    const videoId: string = data.data.map((item) => item.videoId || "").filter(item => item !== "").join("%2C");

    const fetchedVideo: FetchPageData = await axios.get(`${BASE_URL}/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&maxResults=50&regionCode=IN&key=${API_KEY}`).then((response) => parseData(response.data));

    return {
        kind: 'video',
        items: fetchedVideo.items,
        nextPageToken: data.continuation,
        pageInfo: {
            totalResults: Number(data.estimatedResults),
            resultsPerPage: 30,
        }
    };

};

export default rapidApiDataParser;