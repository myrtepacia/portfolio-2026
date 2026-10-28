import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import GridBackground from "@/components/GridBackground";
import ConsoleSignature from "@/components/ConsoleSignature";
import ScriptCleanup from "@/components/ScriptCleanup";
import HtmlComments from "@/components/HtmlComments";
import { profile } from "@/constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const description =
  "Portfolio of Henmyr Vincent Tepacia, a Computer Science student and freelance web developer in Dumaguete, Philippines, building with Next.js, React, TypeScript, and Tailwind CSS.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.site),
  title: {
    default: `${profile.shortName} · ${profile.role}`,
    template: `%s · ${profile.shortName}`,
  },
  description,
  applicationName: profile.shortName,
  authors: [{ name: profile.name, url: profile.site }],
  creator: profile.name,
  keywords: [
    "Henmyr Vincent Tepacia",
    "portfolio",
    "web developer",
    "frontend developer",
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Dumaguete",
    "Philippines",
    "freelance",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: profile.shortName,
    title: `${profile.shortName} · ${profile.role}`,
    description,
    locale: "en_US",
    images: [{ url: "/images/profile-img.jpg", alt: profile.name }],
  },
  twitter: {
    card: "summary",
    title: `${profile.shortName} · ${profile.role}`,
    description,
    images: ["/images/profile-img.jpg"],
  },
  robots: { index: true, follow: true },
  // The tab icon comes from app/icon.png and app/apple-icon.png; Next adds a
  // version hash to their URLs so browsers pick up a new icon right away.
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0c0f" },
  ],
};

// Shows at the top of <body> in the Elements panel for anyone inspecting the page
const sourceNote = `<!--
  Hey there, curious developer 👋
  ${profile.name} · ${profile.role}
  Built with Next.js, React, TypeScript, and Tailwind CSS.
  Like what you see? ${profile.email}
-->`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans bg-bg text-fg antialiased`}>
        <div hidden dangerouslySetInnerHTML={{ __html: sourceNote }} />
        <Script src="https://js.puter.com/v2/" strategy="afterInteractive" />
        <ConsoleSignature />
        <ScriptCleanup />
        <HtmlComments />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <GridBackground />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
