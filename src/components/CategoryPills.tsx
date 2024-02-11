import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import { CategoryPillProps } from "../Types"
import Button from "./Button"
import { useEffect, useRef, useState } from "react";

const TRANSLATE_AMOUNT = 200;

const CategoryPills = ({ categories, onSelect, selectedCategory }: CategoryPillProps) => {
    const [translate, setTranslate] = useState(0);
    const [isLeftVisible, setIsLeftVisible] = useState(true);
    const [isRightVisible, setIsRightVisible] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);

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
    }, [categories, translate])

    return (
        <div ref={containerRef} className="overflow-x-hidden relative">
            <div className="flex whitespace-nowrap gap-3 transition-transform w-[max-content]" style={{ transform: `translateX(-${translate}px)` }}>
                {categories?.map((category) => (
                    <Button
                        key={category.categoryId}
                        onClick={() => onSelect(category.categoryName)}
                        variant={selectedCategory === category.categoryName ? "dark" : "default"}
                        className="py-1 text-xs px-3 rounded-lg whitespace-nowrap">
                        {category.categoryName}
                    </Button>
                ))}
            </div>

            {isLeftVisible && (<div className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-white from-50% to-transparent w-24 h-full">
                <Button variant="ghost" size="icon" className="h-full text-base aspect-square w-auto p-1.5" onClick={moveToLeft} >
                    <IoIosArrowBack />
                </Button>
            </div>)}

            {isRightVisible && (<div className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-white from-50% to-transparent w-24 h-full flex justify-end flex-shrink-0" onClick={moveToRight} >
                <Button variant="ghost" size="icon" className="h-full aspect-square w-auto p-1">
                    <IoIosArrowForward />
                </Button>
            </div>)}
        </div>
    )
}

export default CategoryPills