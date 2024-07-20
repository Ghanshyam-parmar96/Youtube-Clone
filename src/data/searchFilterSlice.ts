import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { searchFilterSliceProps } from '../Types';

// Define the initial state using that type
const initialState: searchFilterSliceProps = {  
    upload_date : "",
    type : "",
    duration : "",
    features : "",
    sort_by : "relevance"
}

export const searchFilterSlice = createSlice({
  name: 'searchFilterSlice',
  initialState,
  reducers: {
    setUploadDate: (state, action: PayloadAction<string>) => {
        state.upload_date = state.upload_date !== action.payload ? action.payload : "";
    },
    setType: (state, action: PayloadAction<string>) => {
        state.type = state.type !== action.payload ? action.payload : "";
    },
    setDuration: (state, action: PayloadAction<string>) => {
        state.duration = state.duration !== action.payload ? action.payload : "";
    },
    setFeatures: (state, action: PayloadAction<string>) => {
        state.features = state.features !== action.payload ? action.payload : "";
    },
    setSortBy: (state, action: PayloadAction<string>) => {
        state.sort_by = state.sort_by !== action.payload ? action.payload : "relevance";
    },
  },
})

export const {setDuration, setFeatures, setSortBy, setType, setUploadDate } = searchFilterSlice.actions

export default searchFilterSlice.reducer