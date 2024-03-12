import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import Button from "./Button"
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import LazyImage from "./LazyLoadImage";

interface VideosSliderProps {
    videoId: string;
    videoTitle: string;
    thumbnailUrl: string;
    views: string;
    postedAt: string;
    durations: string;
}

const VideosSlider = ({ videos = [] }: {videos : VideosSliderProps[]}) => {
    const [translate, setTranslate] = useState(0);
    const [isLeftVisible, setIsLeftVisible] = useState(true);
    const [isRightVisible, setIsRightVisible] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);

    const TRANSLATE_AMOUNT = containerRef?.current?.clientWidth || 200;

    const moveToLeft = () => {
        setTranslate((trans) => {
            const newTranslate = trans - TRANSLATE_AMOUNT;
            if (newTranslate <= 0) return 0;
            return newTranslate;
        })
    };

    const moveToRight = () => {
        setTranslate((trans) => {
            if (containerRef.current == null) return trans;
            const newTranslate = trans + TRANSLATE_AMOUNT;
            const edge = containerRef.current.scrollWidth;
            const width = containerRef.current.clientWidth;
            if (newTranslate + width >= edge) return edge - width;
            return newTranslate;
        })
    };

    useEffect(() => {
        if (containerRef.current == null) return;

        const observer = new ResizeObserver((entries) => {
            const container = entries[0]?.target;

            if (container == null) return;

            setIsLeftVisible(translate > 0);
            setIsRightVisible(translate + container.clientWidth < container.scrollWidth);
        })

        observer.observe(containerRef.current);

        return () => {
            observer.disconnect();
        };
    }, [videos, translate])


    return (
        <div ref={containerRef} className=" overflow-x-auto sm:overflow-x-hidden relative scrollbarHide">
            <div className="flex whitespace-nowrap gap-3 duration-1000 transition-transform w-[max-content]" style={{ transform: `translateX(-${translate}px)` }}>
                {videos?.map((list) => (
                    <div key={list.videoId} className="flex flex-col gap-2 w-60">
                        <div className="relative aspect-video" >
                            <LazyImage src={list.thumbnailUrl} className={`transition-[border-radius] duration-200 sm:rounded-xl`} alt="" />

                            <div className="absolute bottom-1 right-1 bg-secondary-dark text-secondary text-sm px-1 pb-0.5 rounded flex items-center gap-1">
                                {list.durations}
                            </div>
                        </div>

                        <div className="flex flex-col gap-1 px-3 w-full ">
                            <Link to={`/watch?v=${list.videoId}`} className="font-semibold text-sm w-full text-wrap line-clamp-2">
                                {list.videoTitle}
                            </Link>

                            <div className="text-secondary-text text-sm">
                                {list.views} Views • {list.postedAt}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {isLeftVisible && (<div className="absolute left-0 top-1/3 -translate-y-1/2 bg-white/40 rounded-full shadow-lg hidden sm:block">
                <Button variant="ghost" size="icon" className="h-10 grid place-content-center  aspect-square w-auto p-1.5 text-black" onClick={moveToLeft} >
                    <IoIosArrowBack />
                </Button>
            </div>)}

            {isRightVisible && (<div className="absolute right-0 top-1/3 -translate-y-1/2 bg-white/40 rounded-full shadow-lg justify-end flex-shrink-0 hidden sm:flex" onClick={moveToRight} >
                <Button variant="ghost" size="icon" className="h-10 grid place-content-center  aspect-square w-auto p-1 text-black">
                    <IoIosArrowForward />
                </Button>
            </div>)}
        </div>
    )
}

export default VideosSlider