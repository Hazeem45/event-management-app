import PageHead from "@/components/common/PageHead";
import { Button } from "@/components/ui/button";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div
      className={`${geistSans.className} ${geistMono.className} flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black`}
    >
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center bg-white px-16 py-32 dark:bg-black">
        <PageHead />
        <h1>Ohayo Sekai</h1>
        <Button onClick={() => alert("ngontol")}>Click here</Button>
      </main>
    </div>
  );
}
