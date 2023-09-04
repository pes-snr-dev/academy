import "@styles/globals.css";
import "@styles/app.scss";
import "@styles/theme.scss";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Nav from "@components/Nav";
import Provider from "@components/Provider";

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
        <Provider>
          <Nav />
          <div className="app">{children}</div>
        </Provider>
      </body>
    </html>
  );
}
