import type { Metadata } from "next";
import { Geist, Geist_Mono,Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],


});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Henmyr Vincent Tepacia",
  description: "Henmyr Vincent Tepacia portfolio.",
    icons: {
    icon: '/profile-img.jpg',
    shortcut: '/profile-img.jpg',
    apple: '/profile-img.jpg',
  
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}  antialiased`}  >
         <ThemeProvider
           attribute="class"
          defaultTheme="system" 
          enableSystem 
          disableTransitionOnChange
          >
      
        {children}

        </ThemeProvider>
      </body>
    </html>
  );
}
