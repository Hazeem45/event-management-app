import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main
      className={cn(
        inter.className,
        "lg:0 flex min-h-screen min-w-full flex-col items-center justify-center gap-10 py-10",
      )}
    >
      <Component {...pageProps} />
    </main>
  );
}
