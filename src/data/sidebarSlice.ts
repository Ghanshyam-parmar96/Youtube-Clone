import { createSlice } from '@reduxjs/toolkit';

// Define a type for the slice state
interface SidebarState {
  isExpanded: boolean;
  closePannal: boolean;
}

// Define the initial state using that type
const initialState: SidebarState = {
  isExpanded: window.innerWidth > 1024,
  closePannal: window.innerWidth < 1024,
}

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isExpanded = !state.isExpanded;
    },
  },
})

export const { toggleSidebar } = sidebarSlice.actions

export default sidebarSlice.reducer