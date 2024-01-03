import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";

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
      <body className={inter.className}>
        <div className="container">
          <main className="mt-3">{children}</main>
        </div>
      </body>
    </html>
  );
}