import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import dynamic from "next/dynamic";
import "./globals.css";

const CustomCursor = dynamic(() => import("@/components/layout/CustomCursor"), { ssr: false });

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#050510",
};

export const metadata: Metadata = {
  title: "Kreative Catalyst | Digital Marketing Agency",
  description: "Your Online Presence Deserves the Best. SEO, Social Media Marketing, Google Ads, Content Marketing, WhatsApp Marketing & Website Development.",
  metadataBase: new URL("https://kreativecatalyst.in"),
  openGraph: {
    title: "Kreative Catalyst | Digital Marketing Agency",
    description: "SEO, Social Media Marketing, Google Ads, Content Marketing, WhatsApp Marketing & Website Development.",
    url: "https://kreativecatalyst.in",
    siteName: "Kreative Catalyst",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kreative Catalyst | Digital Marketing Agency",
    description: "SEO, Social Media Marketing, Google Ads, Content Marketing, WhatsApp Marketing & Website Development.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Kreative Catalyst',
  url: 'https://kreativecatalyst.in',
  description: 'Digital marketing agency offering SEO, Social Media Marketing, Google Ads, Content Marketing, WhatsApp Marketing & Website Development.',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    availableLanguage: ['English', 'Hindi'],
  },
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body antialiased bg-dark text-light" suppressHydrationWarning>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[99999] focus:px-4 focus:py-2 focus:bg-accent-blue focus:text-white focus:rounded-md focus:outline-none"
        >
          Skip to main content
        </a>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
