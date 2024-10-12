import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SidebarState {
  isLargeOpen: boolean;
  isSmallOpen: boolean;
}

const initialState: SidebarState = {
  isLargeOpen: false,
  isSmallOpen: false,
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setIsLargeOpen: (state, action: PayloadAction<boolean>) => {
      state.isLargeOpen = action.payload;
    },
    setIsSmallOpen: (state, action: PayloadAction<boolean>) => {
      state.isSmallOpen = action.payload;
    },

    toggleIsLarge: (state) => {
      state.isLargeOpen = !state.isLargeOpen;
    },
    toggleIsSmall: (state) => {
      state.isSmallOpen = !state.isSmallOpen;
    },

    toggleSidebar: (state, action: PayloadAction<boolean>) => {
      if (action.payload) state.isSmallOpen = !state.isSmallOpen;
      else state.isLargeOpen = !state.isLargeOpen;
    },

    closeSidebar: (state, action: PayloadAction<boolean>) => {
      if (action.payload) state.isSmallOpen = false;
      else state.isLargeOpen = false;
    },
  },
});

// Export actions
export const {
  setIsLargeOpen,
  setIsSmallOpen,
  toggleIsLarge,
  toggleIsSmall,
  toggleSidebar,
  closeSidebar,
} = sidebarSlice.actions;

// Export Reducer
export default sidebarSlice.reducer;
