import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";

const sora = Sora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wabi Portfolio",
  description: "Personal portfolio showcase.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sora.className} flex min-h-screen flex-col bg-[#020a1f] text-[#dbe8ff] antialiased`}>
        <Navbar />
        <div className="min-h-screen flex-1 pt-20">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
