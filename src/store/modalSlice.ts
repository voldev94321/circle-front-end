import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface ModalState {
  walletConnectModalState: boolean;
  repostModalState: boolean;
  repostModalData: any;
}

// Initial state
const initialState: ModalState = {
  walletConnectModalState: false,
  repostModalState: false,
  repostModalData: {},
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setWalletConnectModalState: (state, action: PayloadAction<boolean>) => {
      state.walletConnectModalState = action.payload;
    },
    setRepostModalState: (state, action: PayloadAction<boolean>) => {
      state.repostModalState = action.payload;
    },
    setRepostModalData: (state, action: PayloadAction<any>) => {
      state.repostModalData = action.payload;
    },
  },
});

export const { setWalletConnectModalState, setRepostModalData, setRepostModalState } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
