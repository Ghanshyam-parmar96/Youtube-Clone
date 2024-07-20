import { HiOutlineXMark } from "react-icons/hi2"
import { useAppDispatch, useAppSelector } from "../../data/hooks"
import { setSortBy, setUploadDate, setFeatures, setDuration, setType } from "../../data/searchFilterSlice";
import { searchFilterSliceProps } from "../../Types";

const SearchFilter = ({closeFilter}: { closeFilter : (arg : searchFilterSliceProps) => void} ) => {
    const dispatch = useAppDispatch();
    const {upload_date, duration, features, sort_by, type} = useAppSelector((state) => state.searchFilter);
    
  return (
    <div className="absolute inset-0 bg-black/60 z-30 -mt-2 grid place-content-center">
        <div className="w-full sm:h-full bg-white dark:text-black rounded-lg p-4 shadow-lg mt-32 sm:mt-0 select-none">
            <div className="flex items-center justify-between font-semibold">
                <p>Search Filters</p>
                <span onClick={() => closeFilter({upload_date, duration, features, sort_by, type})} className="cursor-pointer" >
                    <HiOutlineXMark className="text-2xl" />
                </span>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 text-sm text-secondary-text dark:text-black/60 mt-5">
               <ul className="flex flex-col gap-3">
                    <li className="text-black font-medium">UPLOAD DATE</li> 
                    <hr />
                    <li className={`cursor-pointer relative ${upload_date === "hour" && "text-black after:content-['X'] after:right-0 after:-mt-0.5 after:absolute after:text-lg "}`} onClick={() => dispatch(setUploadDate("hour"))} >Last hour</li>
                    <li className={`cursor-pointer relative ${upload_date === "today" && "text-black after:content-['X'] after:right-0 after:-mt-0.5 after:absolute after:text-lg "}`} onClick={() => dispatch(setUploadDate("today"))} >Today</li>
                    <li className={`cursor-pointer relative ${upload_date === "week" && "text-black after:content-['X'] after:right-0 after:-mt-0.5 after:absolute after:text-lg "}`} onClick={() => dispatch(setUploadDate("week"))} >This week</li>
                    <li className={`cursor-pointer relative ${upload_date === "month" && "text-black after:content-['X'] after:right-0 after:-mt-0.5 after:absolute after:text-lg "}`} onClick={() => dispatch(setUploadDate("month"))} >This month</li>
                    <li className={`cursor-pointer relative ${upload_date === "year" && "text-black after:content-['X'] after:right-0 after:-mt-0.5 after:absolute after:text-lg "}`} onClick={() => dispatch(setUploadDate("year"))} >This year</li>
               </ul>
               <ul className="flex flex-col gap-3">
                    <li className="text-black font-medium">TYPE</li>
                    <hr />
                    <li className={`cursor-pointer relative ${type === "video" && "text-black after:content-['X'] after:right-0 after:-mt-0.5 after:absolute after:text-lg "}`} onClick={() => dispatch(setType("video"))} >Video</li>
                    <li className={`cursor-pointer relative ${type === "channel" && "text-black after:content-['X'] after:right-0 after:-mt-0.5 after:absolute after:text-lg "}`} onClick={() => dispatch(setType("channel"))} >Channel</li>
                    <li className={`cursor-pointer relative ${type === "playlist" && "text-black after:content-['X'] after:right-0 after:-mt-0.5 after:absolute after:text-lg "}`} onClick={() => dispatch(setType("playlist"))} >Playlist</li>
                    <li className={`cursor-pointer relative ${type === "movie" && "text-black after:content-['X'] after:right-0 after:-mt-0.5 after:absolute after:text-lg "}`} onClick={() => dispatch(setType("movie"))} >Film</li>
               </ul>
               <ul className="flex flex-col gap-3">
                    <li className="text-black font-medium">DURATION</li>
                    <hr />
                    <li className={`cursor-pointer relative ${duration === "short" && "text-black after:content-['X'] after:right-0 after:-mt-0.5 after:absolute after:text-lg "}`} onClick={() => dispatch(setDuration("short"))} >Under 4 minutes</li>
                    <li className={`cursor-pointer relative ${duration === "medium" && "text-black after:content-['X'] after:right-0 after:-mt-0.5 after:absolute after:text-lg "}`} onClick={() => dispatch(setDuration("medium"))} >4-20 minutes</li>
                    <li className={`cursor-pointer relative ${duration === "long" && "text-black after:content-['X'] after:right-0 after:-mt-0.5 after:absolute after:text-lg "}`} onClick={() => dispatch(setDuration("long"))} >Over 20 minutes</li>
               </ul>
               <ul className="flex flex-col gap-1">
                    <li className="text-black font-medium">FEATURES</li>
                    <hr className="my-2" />
                    <li className={`cursor-pointer relative ${features === "Live" && "text-black after:content-['X'] after:-right-3 after:-mt-0.5 after:absolute after:text-lg "}`}  onClick={()=> dispatch(setFeatures("Live"))} >Live</li>
                    <li className={`cursor-pointer relative ${features === "4K" && "text-black after:content-['X'] after:-right-3 after:-mt-0.5 after:absolute after:text-lg "}`}  onClick={()=> dispatch(setFeatures("4K"))} >4K</li>
                    <li className={`cursor-pointer relative ${features === "HD" && "text-black after:content-['X'] after:-right-3 after:-mt-0.5 after:absolute after:text-lg "}`}  onClick={()=> dispatch(setFeatures("HD"))} >HD</li>
                    <li className={`cursor-pointer relative ${features === "subtitles" && "text-black after:content-['X'] after:-right-3 after:-mt-0.5 after:absolute after:text-lg "}`}  onClick={()=> dispatch(setFeatures("subtitles"))} >Subtitles/CC</li>
                    <li className={`cursor-pointer relative ${features === "CCommons" && "text-black after:content-['X'] after:-right-3 after:-mt-0.5 after:absolute after:text-lg "}`}  onClick={()=> dispatch(setFeatures("CCommons"))} >Creative Commons</li>
                    <li className={`cursor-pointer relative ${features === "360" && "text-black after:content-['X'] after:-right-3 after:-mt-0.5 after:absolute after:text-lg "}`}  onClick={()=> dispatch(setFeatures("360"))} >360</li>
                    <li className={`cursor-pointer relative ${features === "VR180" && "text-black after:content-['X'] after:-right-3 after:-mt-0.5 after:absolute after:text-lg "}`}  onClick={()=> dispatch(setFeatures("VR180"))} >VR180</li>
                    <li className={`cursor-pointer relative ${features === "3D" && "text-black after:content-['X'] after:-right-3 after:-mt-0.5 after:absolute after:text-lg "}`}  onClick={()=> dispatch(setFeatures("3D"))} >3D</li>
                    <li className={`cursor-pointer relative ${features === "HDR" && "text-black after:content-['X'] after:-right-3 after:-mt-0.5 after:absolute after:text-lg "}`}  onClick={()=> dispatch(setFeatures("HDR"))} >HDR</li>
                    <li className={`cursor-pointer relative ${features === "Location" && "text-black after:content-['X'] after:-right-3 after:-mt-0.5 after:absolute after:text-lg "}`}  onClick={()=> dispatch(setFeatures("Location"))} >Location</li>
                    <li className={`cursor-pointer relative ${features === "Purchased" && "text-black after:content-['X'] after:-right-3 after:-mt-0.5 after:absolute after:text-lg "}`}  onClick={()=> dispatch(setFeatures("Purchased"))} >Purchased</li>
               </ul>
               <ul className="flex flex-col gap-3">
                    <li className="text-black font-medium" >SORT BY</li>
                    <hr />
                    <li className={`cursor-pointer relative ${sort_by === "relevance" && "text-black after:content-['X'] after:right-0 after:-mt-0.5 after:absolute after:text-lg "}`} onClick={()=> dispatch(setSortBy("relevance"))} >Relevance</li>
                    <li className={`cursor-pointer relative ${sort_by === "date" && "text-black after:content-['X'] after:right-0 after:-mt-0.5 after:absolute after:text-lg "}`} onClick={()=> dispatch(setSortBy("date"))} >Upload date</li>
                    <li className={`cursor-pointer relative ${sort_by === "views" && "text-black after:content-['X'] after:right-0 after:-mt-0.5 after:absolute after:text-lg "}`} onClick={()=> dispatch(setSortBy("views"))} >View count</li>
                    <li className={`cursor-pointer relative ${sort_by === "rating" && "text-black after:content-['X'] after:right-0 after:-mt-0.5 after:absolute after:text-lg "}`} onClick={()=> dispatch(setSortBy("rating"))} >Rating</li>
               </ul>
            </div>
        </div>
    </div>
  )
}

export default SearchFilter