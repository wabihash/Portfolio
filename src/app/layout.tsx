import "./globals.css";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import SceneWrapper from "@/components/layout/SceneWrapper";
import { HashScrollManager } from "@/components/layout/HashScrollManager";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { ThemeScript } from "@/components/layout/ThemeScript";
import { rootMetadata } from "@/lib/metadata";
import { DigitalTwin } from "@/features/assistant/DigitalTwin";

export const metadata = rootMetadata;

export const viewport = {
  themeColor: '#020a1f',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body
        className="flex min-h-screen flex-col antialiased"
        style={{ backgroundColor: 'var(--bg-base)', color: 'var(--text-primary)' }}
      >
        <ThemeProvider>
          <HashScrollManager />
          <Navbar />
          <div className="min-h-screen flex-1 pt-12 sm:pt-20">
            <SceneWrapper>{children}</SceneWrapper>
          </div>
          <DigitalTwin />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
