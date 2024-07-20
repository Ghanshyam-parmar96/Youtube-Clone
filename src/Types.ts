import { ElementType, ReactNode } from "react";

export type CategoryPillProps = {
  categories: {
    categoryId: string,
    categoryName: string
  }[];
  selectedCategory: string;
};

export type SmallSidebarItemProps = {
  title: string;
  Icon: ElementType;
  onClick?: () => void;
};

export type LargeSidebarItemProps = {
  IconOrImgUrl: ElementType | string;
  title: string;
  isActive?: boolean;
  onClick?: () => void;
};

export interface ParsedAllData {
  kind: string;
  etag?: string;
  items: ParseVideoList[];
  nextPageToken?: string;
  prevPageToken?: string;
  regionCode?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}

export interface RapidApiDataParserProps extends Omit<ParsedAllData, "items"> {
  items: {
    kind: string;
    id: {
      kind: string;
      videoId: string;
    }
  }[];
}


export interface NewVideoDataList {
  videoId: string;
  channelId: string;
  categoryId: string;
  videoTitle: string;
  thumbnailUrl: string;
  views: string;
  postedAt: string;
  duration: string;
  channelTitle: string;
  channelIcon: string;
  showChannelDetails?: boolean;
  isShowView?: boolean;
}

export interface FetchPageData extends Omit<ParsedAllData, "items"> {
  items: NewVideoDataList[];
}


export interface SuggestedVideoDataListItem {
  kind: string;
  id: {
    kind: string;
    videoId?: string;
    playlistId?: string;
  }
  snippet: {
    channelId: string;
    channelTitle: string;
    description?: string | undefined | null;
    liveBroadcastContent: string;
    publishTime: string;
    publishedAt: string;
    title: string;
    thumbnails: {
      default: Thumbnails;
      medium: Thumbnails;
      high: Thumbnails;
    };
  }
}

export interface SuggestedVideoDataList extends Omit<ParsedAllData, "etag" | "items"> {
  items: SuggestedVideoDataListItem[]
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
      itemCount: number;
    },
  }[];
}

export interface PlaylistItemDetails {
  kind: string;
  etag: string;
  id: string;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
        width: number;
        height: number;
      };
      medium: {
        url: string;
        width: number;
        height: number;
      };
      high: {
        url: string;
        width: number;
        height: number;
      };
      standard: {
        url: string;
        width: number;
        height: number;
      };
      maxres: {
        url: string;
        width: number;
        height: number;
      };
    };
    channelTitle: string;
    playlistId: string;
    position: number;
    resourceId: {
      kind: string;
      videoId: string;
    };
    videoOwnerChannelTitle?: string;
    videoOwnerChannelId?: string;
  };
  contentDetails: {
    videoId: string;
    videoPublishedAt: string;
  };
}

export interface PlaylistDetails extends Omit<ParsedAllData, "items"> {
  items: PlaylistItemDetails[];
}

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



export interface SearchVideoItems {
  kind: string;
  id: {
    kind: string;
    videoId: string;
  };
  snippet: {
    publishedAt : string;
    channelId : string;
    title: string;
    description: string;
    thumbnails: {
      default : Thumbnails;
      medium : Thumbnails;
      high : Thumbnails;
    };
    channelTitle: string;
    liveBroadcastContent: string;
    publishTime: string;
  };
}

export interface SearchVideoFnProps extends Omit<ParsedAllData, "items"> {
  items: SearchVideoItems[];
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
    hiddenSubscriberCount: boolean;
    subscriberCount: string;
    videoCount: string;
    viewCount: string;
  }
};

export interface ChannelProps extends Omit<ParsedAllData, "items"> {
  items: ChannelDetails[];
}


export interface SearchResultItemData {
  type: string;
  title: string;
  channelTitle: string;
  channelId: string;
  playlistId?: string;
  videoCount?: string | null;
  viewCount?: string;
  videoId?: string;
  description?: string;
  publishedText?: string;
  lengthText?: string;
  subscriberCount?: string;
  useVerticalPoster?:boolean;
  thumbnail: {
    url: string;
    width: number;
    height: number;
  }[];
  videos?: {
    videoId: string;
    title: string;
    lengthText: string;
  }[];
  richThumbnail?: {
    url: string;
    width: number;
    height: number;
  }[] | null;
  channelThumbnail?:{
    url: string;
    width: number;
    height: number;
  }[];
}

export interface SearchResultFetchData {
  data: SearchResultItemData[];
  continuation: string;
  msg: string;
  refinements?: string[];
  estimatedResults: string;
}


export interface searchFilterSliceProps {
  upload_date : string;
  type : string;
  duration : string;
  features : string;
  sort_by : string;
  [key: string]: string;
}


export interface channelVideoProps {
  meta? : {
    title: string;
    description: string;
    thumbnail : null;
    keywords: string[];
    image: {
      banner : null;
      tvBanner : null;
      mobileBanner : null;
    };
    subscriberCount : null;
    isFamilySafe: boolean;
    availableCountries : string[];
  }
  continuation : string;
  msg? : string;
  refinements?: string[];
  data : {
    videoId : string;
    title : string;
    description : string;
    lengthText : string;
    viewCount : string;
    publishedText : string;
    thumbnail : Thumbnails[];
    richThumbnail : Thumbnails[];
  }[];
}
