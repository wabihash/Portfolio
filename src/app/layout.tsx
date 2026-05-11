import "./globals.css";
import { Navbar } from "@/components/shared/Navbar";
import { FooterDeferred } from "@/components/shared/FooterDeferred";
import SceneWrapper from "@/components/layout/SceneWrapper";
import { HashScrollManager } from "@/components/layout/HashScrollManager";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { ThemeScript } from "@/components/layout/ThemeScript";
import { StructuredData } from "@/components/shared/StructuredData";
import { rootMetadata } from "@/lib/metadata";
import { DigitalTwinDeferred } from "@/features/assistant/components/DigitalTwinDeferred";

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
        <StructuredData />
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
          <DigitalTwinDeferred />
          <FooterDeferred />
        </ThemeProvider>
      </body>
    </html>
  );
}
