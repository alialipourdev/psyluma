import type React from "react"
import type { Metadata } from "next"
import { Inter, Montserrat } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "../contexts/language-context"
import { ThemeProvider } from "../contexts/theme-context"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  title: "Psyluma - Professional Psychology Tests & Personality Insights",
  description:
    "Discover your personality, intelligence, and emotional health with scientifically-backed psychology tests. Take MBTI, IQ, anxiety, depression assessments on Psyluma - the psychology platform that illuminates your mind.",
  keywords: [
    "psychology tests",
    "personality test",
    "MBTI test",
    "IQ test",
    "anxiety test",
    "depression test",
    "relationship test",
    "mental health assessment",
    "personality insights",
    "psychological evaluation",
    "Psyluma",
  ],
  authors: [{ name: "Psyluma Team" }],
  creator: "Psyluma",
  publisher: "Psyluma",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://psyluma.com",
    siteName: "Psyluma",
    title: "Psyluma - Professional Psychology Tests & Personality Insights",
    description:
      "Discover your personality, intelligence, and emotional health with scientifically-backed psychology tests.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Psyluma - Psychology Tests Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Psyluma - Professional Psychology Tests",
    description: "Discover your personality and mental health with scientific psychology tests.",
    images: ["/og-image.jpg"],
    creator: "@psyluma",
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
  alternates: {
    canonical: "https://psyluma.com",
  },
  category: "health",
  generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": "https://psyluma.com/#website",
                  url: "https://psyluma.com",
                  name: "Psyluma",
                  description: "Professional psychology tests and personality insights platform",
                  publisher: {
                    "@id": "https://psyluma.com/#organization",
                  },
                  potentialAction: [
                    {
                      "@type": "SearchAction",
                      target: {
                        "@type": "EntryPoint",
                        urlTemplate: "https://psyluma.com/tests?q={search_term_string}",
                      },
                      "query-input": "required name=search_term_string",
                    },
                  ],
                  inLanguage: "en-US",
                },
                {
                  "@type": "Organization",
                  "@id": "https://psyluma.com/#organization",
                  name: "Psyluma",
                  url: "https://psyluma.com",
                  logo: {
                    "@type": "ImageObject",
                    inLanguage: "en-US",
                    "@id": "https://psyluma.com/#/schema/logo/image/",
                    url: "https://psyluma.com/logo.png",
                    contentUrl: "https://psyluma.com/logo.png",
                    width: 512,
                    height: 512,
                    caption: "Psyluma",
                  },
                  image: {
                    "@id": "https://psyluma.com/#/schema/logo/image/",
                  },
                  sameAs: [
                    "https://twitter.com/psyluma",
                    "https://facebook.com/psyluma",
                    "https://linkedin.com/company/psyluma",
                  ],
                  contactPoint: {
                    "@type": "ContactPoint",
                    contactType: "customer service",
                    availableLanguage: ["English"],
                  },
                },
                {
                  "@type": "WebPage",
                  "@id": "https://psyluma.com/#webpage",
                  url: "https://psyluma.com",
                  name: "Psyluma - Professional Psychology Tests & Personality Insights",
                  isPartOf: {
                    "@id": "https://psyluma.com/#website",
                  },
                  about: {
                    "@id": "https://psyluma.com/#organization",
                  },
                  description:
                    "Discover your personality, intelligence, and emotional health with scientifically-backed psychology tests.",
                  breadcrumb: {
                    "@id": "https://psyluma.com/#breadcrumb",
                  },
                  inLanguage: "en-US",
                  potentialAction: [
                    {
                      "@type": "ReadAction",
                      target: ["https://psyluma.com"],
                    },
                  ],
                },
                {
                  "@type": "BreadcrumbList",
                  "@id": "https://psyluma.com/#breadcrumb",
                  itemListElement: [
                    {
                      "@type": "ListItem",
                      position: 1,
                      name: "Home",
                      item: "https://psyluma.com",
                    },
                  ],
                },
                {
                  "@type": "Service",
                  "@id": "https://psyluma.com/#service",
                  name: "Psychology Testing Platform",
                  description:
                    "Comprehensive psychology tests for personality, intelligence, and mental health assessment",
                  provider: {
                    "@id": "https://psyluma.com/#organization",
                  },
                  areaServed: "Worldwide",
                  hasOfferCatalog: {
                    "@type": "OfferCatalog",
                    name: "Psychology Tests",
                    itemListElement: [
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "MBTI Personality Test",
                          description: "Myers-Briggs Type Indicator personality assessment",
                        },
                      },
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "IQ Intelligence Test",
                          description: "Cognitive ability and intelligence assessment",
                        },
                      },
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "Anxiety Assessment",
                          description: "Mental health screening for anxiety levels",
                        },
                      },
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "Depression Screening",
                          description: "PHQ-9 based depression assessment tool",
                        },
                      },
                    ],
                  },
                },
              ],
            }),
          }}
        />
        <link rel="canonical" href="https://psyluma.com" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="application-name" content="Psyluma" />
        <meta name="apple-mobile-web-app-title" content="Psyluma" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      </head>
      <body className={`${inter.variable} ${montserrat.variable} font-sans`} suppressHydrationWarning>
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
