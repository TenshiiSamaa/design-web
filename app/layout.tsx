import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TestingThemeProvider } from "@/providers/theme-provider";
import { TestingSidebar } from "@/components/testing-sidebar";
import { ThemeControlsToolbar } from "@/components/theme-controls-toolbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "design-web — Professional UI/UX Laboratory",
  description: "Advanced UI/UX testing sandbox, color palette engine, custom animation builder, and component playground.",
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        <TestingThemeProvider>
          <div className="flex min-h-screen w-full">
            <TestingSidebar />
            <div className="flex-1 min-w-0 overflow-x-hidden flex flex-col">
              {/* Lab Banner */}
              <div className="w-full bg-[var(--warning)]/10 border-b border-[var(--warning)]/30 px-4 py-1.5 flex items-center justify-center gap-2 text-xs shrink-0 select-none">
                <span className="font-bold text-[var(--warning)] uppercase tracking-widest text-[10px]">
                  🔬 UI/UX Laboratory
                </span>
                <span className="text-[var(--warning)]/70 hidden sm:block">
                  · Sandbox Environment · Active Dev Version
                </span>
              </div>
              <ThemeControlsToolbar />
              <div className="flex-1 flex flex-col">
                {children}
              </div>
            </div>
          </div>
        </TestingThemeProvider>
      </body>
    </html>
  );
}


