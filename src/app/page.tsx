"use client";

import { useRef, useState } from "react";
import Demo from "@/components/Demo";
import Navbar from "@/components/Navbar";
import Guide from "@/components/Guide";
import Title from "@/components/Title";
import BlurFade from "@/components/ui/blur-fade";
import localFont from "next/font/local";
import Purpose from "@/components/Purpose";

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

export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const demoRef = useRef<HTMLDivElement>(null);
  const purposeRef = useRef<HTMLDivElement>(null);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleDemoClick = () => {
    if (demoRef.current) {
      window.scrollTo({
        top: demoRef.current.offsetTop - 100,
        behavior: "smooth",
      });
    }
  };

  const handlePurposeClick = () => {
    if (purposeRef.current) {
      window.scrollTo({
        top: purposeRef.current.offsetTop - 100,
        behavior: "smooth",
      });
    }
  };

  return (
    <html
      lang="en"
      className={`${
        darkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-black"
      }`}
    >
      <body
        className={`${geistSans.variable} ${
          geistMono.variable
        } antialiased relative ${
          darkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-black"
        }`}
      >
        <div
          className={`w-full min-h-screen ${
            darkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-black"
          } transition-colors duration-300`}
        >
          <main className="grid grid-rows-[auto_1fr_auto] mx-auto py-4 gap-8 font-[family-name:var(--font-geist-sans)] w-full max-w-screen-xl mb-10">
            <Navbar
              handleDemoClick={handleDemoClick}
              handlePurposeClick={handlePurposeClick}
              darkMode={darkMode}
              toggleDarkMode={toggleDarkMode}
            />

            <BlurFade delay={0.1}>
              <section className="mt-16 sm:mt-20">
                <Title />
              </section>
            </BlurFade>

            <section>
              <BlurFade delay={0.2}>
                <Guide darkMode={darkMode} />
              </BlurFade>
            </section>

            <section ref={demoRef}>
              <BlurFade delay={0.3}>
                <Demo
                  userInput={userInput}
                  setUserInput={setUserInput}
                  darkMode={darkMode}
                />
              </BlurFade>
            </section>

            <section ref={purposeRef}>
              <BlurFade delay={0.4}>
                <Purpose></Purpose>
              </BlurFade>
            </section>
          </main>
        </div>
      </body>
    </html>
  );
}
