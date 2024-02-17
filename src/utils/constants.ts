const API_KEY = import.meta.env.VITE_YOUTUBE_DATA_API_KEY;
const BASE_URL = "https://youtube.googleapis.com/youtube/v3";

interface Options {
    headers : {
        "X-RapidAPI-Key": string;
        "X-RapidAPI-Host": string;
    }
}

const options:Options = {
    headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
        'X-RapidAPI-Host': import.meta.env.VITE_RAPIDAPI_HOST,
    }
};

const RAPIDAPI_BASE_URL = "https://youtube-v3-lite.p.rapidapi.com";


export { API_KEY, BASE_URL, options, RAPIDAPI_BASE_URL };