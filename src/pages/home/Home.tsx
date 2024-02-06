import { useState } from "react";
import CategoryPills from "../../components/CategoryPills";
import { categories, videos } from "../../data/categories";
import VideoGridItem from "../../components/VideoGridItem";
import Sidebar from "../../layouts/Sidebar";
import ContentWrapper from "../../components/ContentWrapper";

const Home = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    return (
        <ContentWrapper>
            <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto h-[calc(100vh_-_65px)]" >
                <Sidebar />
                <div className="overflow-x-hidden px-6">
                    <div className="sticky top-0 bg-white z-10 pb-3 pt-2">
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
            </div>
        </ContentWrapper>
    )
}

export default Home;