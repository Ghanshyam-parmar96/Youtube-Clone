import { ElementType, ReactNode } from "react";

export type CategoryPillProps = {
  categories: {
    categoryId: string,
    categoryName: string
  }[] | undefined;
  selectedCategory: string;
  onSelect: (category: string) => void;
};

export interface HomePageCategoryPills {
  kind: string;
  etag: string;
  id: string;
  snippet: {
    assignable: boolean;
    title: string;
    channelId: string;
  };
}

export type SmallSidebarItemProps = {
  url: string;
  title: string;
  Icon: ElementType
};

export type LargeSidebarItemProps = {
  IconOrImgUrl: ElementType | string;
  title: string;
  url: string;
  isActive?: boolean;
};

export type LargeSidebarSectionProps = {
  children: ReactNode;
  title?: string;
  visibleItemCount?: number;
};

export interface Thumbnails {
  url: string;
  width: number;
  height: number;
}

export interface ParseVideoList {
  kind: string;
  etag: string;
  id: string;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: Thumbnails,
      medium: Thumbnails;
      high: Thumbnails;
      standard: Thumbnails;
      maxres?: Thumbnails;
    };
    channelTitle: string;
    tags?: string[];
    categoryId: string;
    liveBroadcastContent: string;
    defaultLanguage?: string;
    localized: {
      title: string;
      description: string;
    };
    defaultAudioLanguage?: string;
  };
  contentDetails: {
    duration: string;
    dimension: string;
    definition: string;
    caption: string;
    licensedContent: boolean;
    regionRestriction?: {
      allowed?: string[];
      blocked?: string[];
    },

    contentRating?: {};
    projection?: string;
  };
  statistics: {
    viewCount: string;
    likeCount: string;
    favoriteCount: string;
    commentCount: string;
  };

};


export interface ParsedAllData {
  kind: string;
  etag: string;
  items: ParseVideoList[];
  nextPageToken?: string;
  prevPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}


export interface NewVideoDataList {
  videoId: string;
  channelId: string;
  categoryId: string;
  videoTitle: string;
  thumbnailUrl: string;
  url: string;
  views: string;
  postedAt: string;
  duration: string;
  channelTitle: string;
  channelIcon: string;
  channelCustomUrl: string;
}

export interface FetchPageData extends Omit<ParsedAllData, "items"> {
  items: NewVideoDataList[];
}

interface CommentSnippet {
  channelId: string;
  videoId: string;
  textDisplay: string;
  textOriginal: string;
  parentId?: string;
  authorDisplayName: string;
  authorProfileImageUrl: string;
  authorChannelUrl: string;
  authorChannelId: {
    value: string;
  };
  canRate: boolean;
  viewerRating: string;
  likeCount: number;
  publishedAt: string;
  updatedAt: string;
};

interface FetchedCommentItems {
  kind: string;
  etag: string;
  id: string;
  snippet: {
    channelId: string;
    videoId: string;
    topLevelComment: {
      kind: string;
      etag: string;
      id: string;
      snippet: CommentSnippet;
    };
    canReply: boolean;
    totalReplyCount: number;
    isPublic: boolean;
  };
  replies?: {
    comments: {
      kind: string;
      etag: string;
      id: string;
      snippet: CommentSnippet;
    }[];
  };
}

export interface FetchedComments extends Omit<ParsedAllData, "items"> {
  items: FetchedCommentItems[];
}

export interface Comments {
  totalReplyCount: number;
  authorChannelId: string;
  authorDisplayName: string;
  authorChannelUrl: string;
  authorProfileImageUrl: string;
  likeCount: number;
  textOriginal: string;
  publishedAt: string;
  replies: {
    comments?: {
      textOriginal: string;
      authorDisplayName: string;
      authorProfileImageUrl: string;
      authorChannelUrl: string;
      authorChannelId: string;
      likeCount: number;
      publishedAt: string;
    }[];
  };
}


export interface WatchPageVideoData extends Omit<NewVideoDataList, "url"> {
  videoDescription: string;
  postedAtDateFormate: string;
  videoCommentCount: string;
  videoLikeCount: string;
  channelSubscriberCount: string;
};


export interface SuggestedVideoDataListItem {
  kind: string;
  id: {
    kind: string;
    videoId?: string;
    playlistId?: string;
  }
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description?: string | undefined | null;
    thumbnails: {
      default: Thumbnails;
      medium: Thumbnails;
      high: Thumbnails;
    };
    channelTitle: string;
    liveBroadcastContent: string;
    publishTime: string;
  }
}
export interface SuggestedVideoDataList extends Omit<ParsedAllData, "etag" | "items"> {
  items: SuggestedVideoDataListItem[]
}

export interface SearchVideoItems {
  kind: string;
  id: {
    kind: string;
    videoId: string;
  }
}

export interface SearchVideoFnProps extends Omit<ParsedAllData, "items"> {
  items: SearchVideoItems[];
  regionCode?: string;
}


export interface ChannelPostData {
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

export interface ChannelDetails extends ChannelPostData {
  statistics: {
    hiddenSubscriberCount : boolean;
    subscriberCount : string;
    videoCount : string;
    viewCount : string;
  }
};

export interface ChannelProps extends Omit<ParsedAllData, "items"> {
  items: ChannelDetails[];
}


export interface ChannelPlayListData extends Omit<ParsedAllData, "items"> {
  items: {
    kind: string;
    etag: string;
    id: string;
    snippet: {
      publishedAt: string;
      channelId: string;
      title: string;
      description: string;
      thumbnails: {
        default: Thumbnails;
        medium: Thumbnails;
        high: Thumbnails;
        standard: Thumbnails;
        maxres?: Thumbnails;
      };
      channelTitle: string;
      localized: {
        title: string;
        description: string;
      };
    };
    contentDetails: {
      itemCount : number;  
    },
  }[];
}