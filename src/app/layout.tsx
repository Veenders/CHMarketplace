import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import MainTitle from "@atoms/MainTitle";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400","600"]
});

export const metadata: Metadata = {
  title: "CH Marketplace",
  description: "Carles Vila technical test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={`${poppins.variable}`}>
        <header><MainTitle>CH Marketplace</MainTitle></header>
        {children}
      </body>
    </html>
  );
}
