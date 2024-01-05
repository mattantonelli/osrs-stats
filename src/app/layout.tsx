import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OSRS Stats",
  description: "A graphical history of the growth of an Old School RuneScape character."
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} d-flex flex-column`}>
        <div className="container">
          <main className="mt-3">{children}</main>
        </div>
        <div className="footer mt-auto py-3">
          <div className="container text-center">
            <span>Created by Raelys</span>
            <a href="https://github.com/mattantonelli/osrs-stats" target="_blank" className="m-1">
              <Image src="/images/github.png" alt="GitHub" width="25" height="25" />
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}