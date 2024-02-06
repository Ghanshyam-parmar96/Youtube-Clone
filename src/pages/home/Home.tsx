import { useState } from "react";
import CategoryPills from "../../components/CategoryPills";
import { categories, videos } from "../../data/categories";
import VideoGridItem from "../../components/VideoGridItem";

const Home = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    return (
        <div className="grid grid-cols-[auto, 1fr] flex-grow-1 overflow-auto" >
            <div>Sidebar</div>
            <div className="overflow-x-hidden px-8">
                <div className="sticky top-0 bg-white z-10 my-4">
                    <CategoryPills
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onSelect={setSelectedCategory}
                    />
                </div>

                <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
                    
                    {videos.map((video) => (
                        <VideoGridItem {...video} key={video.id}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home;