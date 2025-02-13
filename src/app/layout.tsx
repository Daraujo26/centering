import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { DarkModeProvider } from "@/components/DarkModeContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Centering Demo",
  description:
    "Centering: A Framework for Modeling the Local Coherence of Discourse | Barbara J. Grosz, Aravind K. Joshi, Scott Weinstein",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0"
        />
      </head>
      <body>
        <DarkModeProvider>
          {children}
          <Analytics />
        </DarkModeProvider>
      </body>
    </html>
  );
}
