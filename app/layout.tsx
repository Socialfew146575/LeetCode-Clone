

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

import RecoilContextProvider from "@/context/RecoilContextProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Leetcode",
  description:
    "Explore a comprehensive web application featuring a vast array of coding problems with detailed solutions in the form of video tutorials. Elevate your coding skills, practice problem-solving, and enhance your knowledge with our curated collection of challenges. Join a community of learners passionate about mastering algorithms and data structures. Level up your coding game on our Leetcode clone – your go-to platform for honing programming expertise.",
  icons: {
    icon: "./favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RecoilContextProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </RecoilContextProvider>
  );
}
