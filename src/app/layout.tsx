import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://naturalprotein.co"),
  title: "NATURAL PROTEIN — Precision in Every Scoop",
  description:
    "Explore pure protein supplements formulated around 5 clean, verified ingredients. 26g native protein per serving with zero artificial gums, fillers, or synthetic sweeteners.",
  keywords: [
    "protein supplement",
    "clean protein",
    "cold-filtered protein",
    "natural protein",
    "chocolate vanilla protein",
    "transparent supplements",
    "native whey isolate",
  ],
  authors: [{ name: "NATURAL PROTEIN Co." }],
  openGraph: {
    title: "NATURAL PROTEIN — Built Around Better Nutrition",
    description:
      "26g pure protein per serving. Whole ground oats, California almonds, raw cacao, and Madagascar vanilla bean.",
    images: [
      {
        url: "/images/image-1.jpg",
        width: 1366,
        height: 768,
        alt: "NATURAL PROTEIN Canister on Studio Table",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "NATURAL PROTEIN — Precision in Every Scoop",
    description:
      "Crafted with 5 whole food ingredients. Zero industrial gums or artificial sweeteners.",
    images: ["/images/image-1.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F5F3EE] text-[#20211F]">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
