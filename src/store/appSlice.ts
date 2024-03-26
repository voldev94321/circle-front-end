import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface AppState {
  searchValue: string,
}

// Initial state
const initialState: AppState = {
  searchValue: "",
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setSearchValueState : (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
  },
});

export const { setSearchValueState } = appSlice.actions;
export const appReducer = appSlice.reducer;
