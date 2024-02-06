import { createSlice } from '@reduxjs/toolkit';

// Define a type for the slice state
interface SidebarState {
  isExpanded: boolean
}

// Define the initial state using that type
const initialState: SidebarState = {
  isExpanded: false,
}

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    isExpanded: (state) => {
      state.isExpanded = !state.isExpanded
    },
  },
})

export const { isExpanded } = sidebarSlice.actions

export default sidebarSlice.reducer