import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// Define a type for the slice state
interface SidebarState {
  isExpanded: boolean;
  closePannal: boolean;
}

// Define the initial state using that type
const initialState: SidebarState = {
  isExpanded: false,
  closePannal: window.innerWidth < 1535,
}

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isExpanded = !state.isExpanded;
    },
    resizeBy: (state, action: PayloadAction<number>) => {
      state.closePannal = action.payload < 1535;
    },
  },
})

export const { toggleSidebar,resizeBy } = sidebarSlice.actions

export default sidebarSlice.reducer