import "@styles/globals.css";
import "@styles/app.scss";
import "@styles/theme.scss";
import 'react-toastify/dist/ReactToastify.css';

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Nav from "@components/Nav";
import NextSessionProvider from "@components/Provider";
import ReduxProvider from "@redux/provider";
import ToastProvider from "@/providers/Toast";

export const metadata: Metadata = {
  title: "PES Academy",
  description: "Learn from our carefully curated catalog of courses.",
};

const inter = Inter({ subsets: ["latin"], variable: "--inter" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body>
        <ToastProvider>
          <NextSessionProvider>
            <ReduxProvider>
              <Nav />
              <div className="app">{children}</div>
            </ReduxProvider>
          </NextSessionProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
