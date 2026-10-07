import type { Metadata } from "next";
import { Inter, Ubuntu } from "next/font/google";
import "./globals.css";
import "../styles/base.css";
import "../styles/header.css";
import "../styles/category-nav.css";
import "../styles/catalog.css";
import "../styles/faq.css";
import "../styles/reviews.css";
import "../styles/footer.css";
import "../styles/overlays.css";
import "../styles/cart-drawer.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const ubuntu = Ubuntu({
  variable: "--font-ubuntu",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Rent gaming gadgets in Bangalore - Zero Deposit Rentals - SharePal",
  description:
    "Rent the latest gaming gadgets in Bangalore from SharePal: PS5, Xbox, Oculus VR, Racing Wheel on rent. Zero deposit rentals with doorstep delivery.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${ubuntu.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
