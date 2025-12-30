import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Pastebin Lite",
  description: "Create and share text pastes instantly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-gray-50 text-gray-900 min-h-full`}
      >
        <div className="min-h-full flex flex-col">
          <header className="bg-white shadow-sm border-b border-gray-200">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                  <h1 className="text-xl font-semibold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Pastebin Lite</h1>
                </div>
              </div>
            </nav>
          </header>

          <main className="flex-1">
            {children}
          </main>

          <footer className="bg-white border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="text-center text-sm text-gray-500">
                <p>All Rights are Reserved by @Pastebin-Lite</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
