import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import Footer from "@/components/Footer/footer"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Currency & Crypto Converter - Fast, Reliable, Real-Time Rates",
  description: "Easily convert fiat currencies and cryptocurrencies with our fast, reliable, and up-to-date currency converter. Get accurate rates at your fingertips.",
  keywords: "currency converter, crypto converter, exchange rates, currency rates, cryptocurrency rates, currency conversion, crypto conversion",
  icons: {
    icon: "/images/favicon.ico",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster theme="dark" richColors position="top-center" />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
