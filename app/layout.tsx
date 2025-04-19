import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import {Toaster} from 'sonner'

export const metadata: Metadata = {
  title: "Framework",
  description: "Miro clone built with nextjs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={`antialiased font-mono`}>
        {children}
        <Toaster position="top-right"/>
      </body>
    </html>
    </ClerkProvider>
  );
}
