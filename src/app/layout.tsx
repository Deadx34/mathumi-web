import type { Metadata } from "next";
import { Cinzel, Lato, Playfair_Display } from "next/font/google";
import LayoutWrapper from "@/components/LayoutWrapper";
import { CartProvider } from "@/context/CartContext";
import { CourseProvider } from "@/context/CourseContext";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["italic", "normal"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Mathumi Bridal Boutique & Salon",
  description: "Tradition and Beauty, Woven and Taught. Pure Kaanchipuram sarees, beauty salon, and academy in Colombo, Sri Lanka.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${lato.variable} ${playfair.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col relative" suppressHydrationWarning>
        {/* Inner Gold Frame Bevel - Desktop only */}
        <div className="hidden md:block absolute inset-0 border-[6px] border-[#a37c35] border-opacity-70 pointer-events-none z-50 mix-blend-overlay shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]"></div>
        <div className="hidden md:block absolute inset-0 border-[8px] border-[#3a1f0d] pointer-events-none z-40 opacity-50"></div>
        
        {/* Main Content */}
        <CartProvider>
          <CourseProvider>
            <main className="flex-grow z-10 flex flex-col relative h-full overflow-y-auto">
              <LayoutWrapper>
                {children}
              </LayoutWrapper>
            </main>
          </CourseProvider>
        </CartProvider>
      </body>
    </html>
  );
}
