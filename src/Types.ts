import { ElementType, ReactNode } from "react";

export type CategoryPillProps = {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
};


export type VideoGridItemProps = {
  id: string;
  title: string;
  channel: {
    id: string;
    name: string;
    profileUrl: string;
  };
  views: number;
  postedAt: Date;
  duration: number;
  thumbnailUrl: string;
  videoUrl: string;
};


export type SmallSidebarItemProps = {
  url: string;
  title: string;
  Icon : ElementType
};


export type LargeSidebarItemProps = {
  IconOrImgUrl : ElementType | string;
  title: string;
  url: string;
  isActive?: boolean;
};

export type LargeSidebarSectionProps ={
  children: ReactNode;
  title?: string;
  visibleItemCount?: number;
};