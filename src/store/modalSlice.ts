import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface ModalState {
  walletConnectModalState: boolean;
  repostModalState: boolean;
  repostModalData: any;
  imageModalState: boolean;
  imageModalData: any;
  reportModalState: boolean;
  reportModalData: any;
  blogModalState: boolean;
  blogModalData: any;
  profileModalState: boolean;
  profileModalData: any;
}

// Initial state
const initialState: ModalState = {
  walletConnectModalState: false,
  repostModalState: false,
  repostModalData: {},
  imageModalState: false,
  imageModalData: "",
  reportModalState: false,
  reportModalData: {
    blogId: "",
    commentId: "",
  },
  blogModalState: false,
  blogModalData: {},
  profileModalState: false,
  profileModalData: {},
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
    setImageModalState: (state, action: PayloadAction<boolean>) => {
      state.imageModalState = action.payload;
    },
    setImageModalData: (state, action: PayloadAction<any>) => {
      state.imageModalData = action.payload;
    },
    setReportModalState: (state, action: PayloadAction<boolean>) => {
      state.reportModalState = action.payload;
    },
    setReportModalData: (state, action: PayloadAction<any>) => {
      state.reportModalData = action.payload;
    },
    setBlogModalState: (state, action: PayloadAction<boolean>) => {
      state.blogModalState = action.payload;
    },
    setBlogModalData: (state, action: PayloadAction<any>) => {
      state.blogModalData = action.payload;
    },
    setProfileModalState: (state, action: PayloadAction<boolean>) => {
      state.profileModalState = action.payload;
    },
    setProfileModalData: (state, action: PayloadAction<any>) => {
      state.profileModalData = action.payload;
    },
  },
});

export const {
  setWalletConnectModalState,
  setRepostModalData,
  setRepostModalState,
  setImageModalState,
  setImageModalData,
  setReportModalState,
  setReportModalData,
  setBlogModalState,
  setBlogModalData,
  setProfileModalState,
  setProfileModalData,
} = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
