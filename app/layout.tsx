import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Petit_Formal_Script } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BackgroundAnimation } from "@/components/visuals/BackgroundAnimation";
import { site } from "@/lib/site";
import "./globals.css";

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

// The script face carries the brand; it only ever sets two words.
const petitFormalScript = Petit_Formal_Script({
  variable: "--font-petit-formal",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — don't interrupt your coding flow`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "Claude Code",
    "desktop widget",
    "developer notifications",
    "always on top",
    "Windows",
  ],
  openGraph: {
    type: "website",
    url: site.url,
    title: `${site.name} — don't interrupt your coding flow`,
    description: site.description,
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — don't interrupt your coding flow`,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#fff7e8",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${jetBrainsMono.variable} ${petitFormalScript.variable} h-full antialiased`}
    >
      <body className="relative flex min-h-full flex-col overflow-x-clip">
        <BackgroundAnimation />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
