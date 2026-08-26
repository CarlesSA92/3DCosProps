import type { Metadata } from "next";
import { Hanken_Grotesk, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://3dcosprops.com"),
  title: {
    default: "3D CosProps | Premium 3D Printing Studio",
    template: "%s | 3D CosProps",
  },
  description:
    "High-fidelity 3D modeling and printing studio. Premium replicas, production-ready craftsmanship, and custom commissions.",
  openGraph: {
    type: "website",
    siteName: "3D CosProps",
    title: "3D CosProps | Premium 3D Printing Studio",
    description:
      "High-fidelity 3D modeling and printing studio with premium craftsmanship.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${hankenGrotesk.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full font-body text-foreground">{children}</body>
    </html>
  );
}
