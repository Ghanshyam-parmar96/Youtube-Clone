import { ElementType, ReactNode } from "react";

export type CategoryPillProps = {
  categories: {
    categoryId : string,
    categoryName : string
  }[] | undefined;
  selectedCategory: string;
  onSelect: (category: string) => void;
};

export interface HomePageCategoryPills {
  kind : string;
  etag : string;
  id : string;
  snippet : {
    assignable : boolean; 
    title : string;
    channelId : string;
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
      default: Thumbnails ,
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
  items : ParseVideoList[];
  nextPageToken : string;
  prevPageToken? : string;
  pageInfo : {
    totalResults : number;
    resultsPerPage : number;
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

export interface FetchPageData {
  kind: string;
  etag: string;
  items: NewVideoDataList[];
  nextPageToken: string;
  prevPageToken?: string;
  pageInfo: {
      totalResults: number;
      resultsPerPage: number;
  };
}