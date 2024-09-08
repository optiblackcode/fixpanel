import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FixPanel",
  description: "the real fake finance app!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const basePath = process.env.NODE_ENV === "production" ? "/fixpanel" : "";

  return (
    <html lang="en">
      <head>
        <script src={`${basePath}/mixpanel.js`} defer />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
