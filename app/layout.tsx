import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FixPanel",
  description: "the real fake finance app!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>		
        <script src="/mixpanel.js" defer type="text/javascript"></script>
		<script src="/analytics.js" defer></script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
