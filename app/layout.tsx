import type { Metadata } from "next";
import "./globals.css";
import { ConvexClientProvider } from "@/provider/convex-provider";
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
      <ConvexClientProvider>
        {children}
        <Toaster position="top-right"/>
    </ConvexClientProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
