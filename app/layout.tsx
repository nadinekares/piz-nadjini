import type { Metadata } from "next";
import "./globals.css";
import { CustomCursor } from "@/components/ui/custom-cursor";

export const metadata: Metadata = {
  title: "Piz Nadjini | DJ & Kimono Designer",
  description:
    "Minimal landing page for Piz Nadjini, a DJ and kimono designer blending sound and style.",
  openGraph: {
    title: "Piz Nadjini | DJ & Kimono Designer",
    description:
      "Minimal landing page for Piz Nadjini, a DJ and kimono designer blending sound and style.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Piz Nadjini | DJ & Kimono Designer",
    description:
      "Minimal landing page for Piz Nadjini, a DJ and kimono designer blending sound and style.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
