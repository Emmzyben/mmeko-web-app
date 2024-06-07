import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import UserProvider from "./context/user";
import AllOverlays from "./components/AllOverlays";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mmeko",
  description: "Mmeko",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       <UserProvider>
      <body className={`${inter.className} bg-dark-1`}>
        <div>
      <AllOverlays />
      </div>
        {children}
        </body>
        </UserProvider>
      
    </html>
  );
}
