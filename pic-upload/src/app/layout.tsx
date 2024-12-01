import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./Providers"; // Import the new Providers component

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ImageUpload - Upload and Share Your Images",
  description:
    "Experience seamless image uploading and sharing with our cutting-edge platform.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
