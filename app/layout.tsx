import type { Metadata } from "next";
import "./globals.css";
import { ConvexClientProvider } from "@/provider/convex-provider";

 

export const metadata: Metadata = {
  title: "Framework",
  description: "Miro",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased font-mono`}>
      <ConvexClientProvider>
        {children}
    </ConvexClientProvider>
      </body>
    </html>
  );
}
