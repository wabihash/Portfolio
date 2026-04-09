import "./globals.css";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import SceneWrapper from "@/components/layout/SceneWrapper";
import { rootMetadata } from "@/lib/metadata";

export const metadata = rootMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-[#020a1f] text-[#dbe8ff] antialiased">
        <Navbar />
        <div className="min-h-screen flex-1 pt-20">
          <SceneWrapper>{children}</SceneWrapper>
        </div>
        <Footer />
      </body>
    </html>
  );
}
