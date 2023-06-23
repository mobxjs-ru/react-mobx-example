import "src/styles/globals.css";
import { AppProvider } from "@src/providers/AppProvider/app-provider";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  );
}
