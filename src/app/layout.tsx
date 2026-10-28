import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { ThemeProvider } from "@/lib/theme";
import { SITE_NAME, SITE_URL, CONTACT } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "GSN Foundation | Exam Coaching and AI Programs", template: "%s | GSN Foundation" },
  description: "GSN Foundation offers coaching for PCMB 11th and 12th, JEE, NEET, KCET and 10th Board, plus new project-based Artificial Intelligence programs.",
  applicationName: SITE_NAME,
  alternates: { canonical: SITE_URL },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } : undefined,
  },
};
export const viewport: Viewport = { themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#080D1B" }, { media: "(prefers-color-scheme: light)", color: "#FFFFFF" }], width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
      <body>
        <ThemeProvider>
          <a href="#main" className="skip">Skip to content</a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <JsonLd data={{ "@context": "https://schema.org", "@type": "Organization", name: SITE_NAME, url: SITE_URL, email: CONTACT.email }} />
          <JsonLd data={{ "@context": "https://schema.org", "@type": "WebSite", name: SITE_NAME, url: SITE_URL }} />
        </ThemeProvider>
      </body>
    </html>
  );
}
