"use client";
import { persistor, store } from "@/store/store";
import { lazy } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "@/styles/globals.css";
import ReactQueryProvider from "./ReactQueryProvider";
import RepostModal from "@/components/modal/RepostModal";
import ImageModal from "@/components/modal/ImageModal";
import ReportModal from "@/components/modal/ReportModal";
import BlogModal from "@/components/modal/BlogModal";
import ProfileModal from "@/components/modal/ProfileModal";
const LazyWalletContext = lazy(() => import("./WalletContext"));
const LazyWalletConnectModal = lazy(
  () => import("@/components/modal/WalletConnectModal")
);

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LazyWalletContext>
      <ReactQueryProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {children}
            <LazyWalletConnectModal />
            <RepostModal />
            <BlogModal />
            <ImageModal />
            <ReportModal />
            <ProfileModal />
          </PersistGate>
        </Provider>
      </ReactQueryProvider>
    </LazyWalletContext>
  );
}
