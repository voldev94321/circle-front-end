import ReduxProvider from "@/app/providers/ReduxProvider";
import type { AppProps } from "next/app";
import "@/styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider>
      <Component {...pageProps} />
    </ReduxProvider>
  );
}

export default MyApp;
