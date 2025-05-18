import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/header";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "UnbAIsly",
  description: "UnbAIsly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-neutral-100 lg:px-24 py-20">
        <Header />
        {children}
      </body>
    </html>
  );
}
