import { Comments, FetchedComments } from "../Types";
import { formatTimeAgo } from "./formatTimeAgo";

const commentParser = (data : FetchedComments) : Comments[] => {
    const { items } = data;
    const comments: Comments[] = items.map(item => ({
        totalReplyCount : item.snippet.totalReplyCount,
        authorChannelId : item.snippet.topLevelComment.snippet.authorChannelId.value,
        authorDisplayName : item.snippet.topLevelComment.snippet.authorDisplayName,
        authorChannelUrl : item.snippet.topLevelComment.snippet.authorChannelUrl,
        authorProfileImageUrl : item.snippet.topLevelComment.snippet.authorProfileImageUrl,
        likeCount : item.snippet.topLevelComment.snippet.likeCount,
        textOriginal : item.snippet.topLevelComment.snippet.textOriginal,
        publishedAt : formatTimeAgo(item.snippet.topLevelComment.snippet.publishedAt),
        replies : {
            comments : item.replies?.comments?.map(reply => ({
                textOriginal : reply.snippet.textOriginal,
                authorDisplayName : reply.snippet.authorDisplayName,
                authorProfileImageUrl : reply.snippet.authorProfileImageUrl,
                authorChannelUrl : reply.snippet.authorChannelUrl,
                authorChannelId : reply.snippet.authorChannelId.value,
                likeCount : reply.snippet.likeCount,
                publishedAt : formatTimeAgo(reply.snippet.publishedAt),
            })),
        }
    }));

    return comments;
};

export default commentParser;