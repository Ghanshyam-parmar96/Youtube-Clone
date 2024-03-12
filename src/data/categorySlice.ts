import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialStateProps {
  selectedCategory: string;
  categories: {
    categoryId: string;
    categoryName: string;
  }[];
}

const initialState: InitialStateProps = {
  selectedCategory: "All",
  categories: [
    { categoryId: "xx", categoryName: "All" },
    { categoryId: "101", categoryName: "JavaScript" },
    { categoryId: "100", categoryName: "TypeScript" },
    { categoryId: "102", categoryName: "Programming" },
    { categoryId: "103", categoryName: "Travelling" },
    { categoryId: "104", categoryName: "Cricket World Cup 2023" },
    { categoryId: "105", categoryName: "Bowling" },
    { categoryId: "106", categoryName: "Cricket" },
    { categoryId: "107", categoryName: "React" },
    { categoryId: "108", categoryName: "Next.js" },
    { categoryId: "109", categoryName: "UI/UX Design" },
    { categoryId: "111", categoryName: "Object Oriented Programming" },
    { categoryId: "112", categoryName: "Frontend Web Development" },
    { categoryId: "113", categoryName: "Backend Web Development" },
    { categoryId: "114", categoryName: "Web Development" },
    { categoryId: "115", categoryName: "Coding" },
    { categoryId: "1", categoryName: "Film & Animation" },
    { categoryId: "2", categoryName: "Autos & Vehicles" },
    { categoryId: "10", categoryName: "Music" },
    { categoryId: "15", categoryName: "Pets & Animals" },
    { categoryId: "17", categoryName: "Sports" },
    { categoryId: "18", categoryName: "Short Movies" },
    { categoryId: "19", categoryName: "Travel & Events" },
    { categoryId: "20", categoryName: "Gaming" },
    { categoryId: "21", categoryName: "Videoblogging" },
    { categoryId: "22", categoryName: "People & Blogs" },
    { categoryId: "23", categoryName: "Comedy" },
    { categoryId: "24", categoryName: "Entertainment" },
    { categoryId: "25", categoryName: "News & Politics" },
    { categoryId: "26", categoryName: "Howto & Style" },
    { categoryId: "27", categoryName: "Education" },
    { categoryId: "28", categoryName: "Science & Technology" },
    { categoryId: "30", categoryName: "Movies" },
    { categoryId: "31", categoryName: "Anime/Animation" },
    { categoryId: "32", categoryName: "Action/Adventure" },
    { categoryId: "33", categoryName: "Classics" },
    { categoryId: "34", categoryName: "Comedy" },
    { categoryId: "35", categoryName: "Documentary" },
    { categoryId: "36", categoryName: "Drama" },
    { categoryId: "37", categoryName: "Family" },
    { categoryId: "38", categoryName: "Foreign" },
    { categoryId: "39", categoryName: "Horror" },
    { categoryId: "40", categoryName: "Sci-Fi/Fantasy" },
    { categoryId: "41", categoryName: "Thriller" },
    { categoryId: "42", categoryName: "Shorts" },
    { categoryId: "43", categoryName: "Shows" },
    { categoryId: "44", categoryName: "Trailers" },
  ],
};

const categories = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
  },
});

export const {setSelectedCategory} = categories.actions;
export default categories.reducer;
