import { useState } from "react";
import CategoryPills from "../../components/CategoryPills";
import { categories, videos } from "../../data/categories";
import VideoGridItem from "../../components/VideoGridItem";

const Home = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    return (
        <div className="overflow-x-hidden sm:px-6">
            <div className="sticky top-0 bg-white z-10 pb-3 pt-3 px-3 sm:px-0">
                <CategoryPills
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onSelect={setSelectedCategory}
                />
            </div>

            <div className="grid gap-4 mt-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
                {videos.map((video) => (
                    <VideoGridItem {...video} key={video.id} />
                ))}
            </div>
        </div>
    )
}

export default Home;