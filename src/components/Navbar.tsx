"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  AiOutlineFileText,
  AiOutlineGlobal,
  AiOutlineSetting,
} from "react-icons/ai";
import { FaSun, FaMoon } from "react-icons/fa";
import { useDarkMode } from "@/components/DarkModeContext";

const Navbar: React.FC = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const router = useRouter();
  const pathname = usePathname();

  const handleDemoNavigation = () => {
    if (pathname === "/") {
      document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push("/#demo");
    }
  };

  const handleImplementationNavigation = () => {
    if (pathname !== "/implementation") {
      router.push("/implementation");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowNavbar(currentScrollY <= lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <section
      className={`fixed top-0 left-0 w-full flex gap-6 flex-wrap items-center justify-between py-2 px-6 shadow-md transition-transform duration-300 z-10 ${
        darkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-black"
      } ${showNavbar ? "translate-y-0" : "-translate-y-full"}`}
    >
      {/* Dark Mode Toggle Button */}
      <button
        onClick={toggleDarkMode}
        className="flex items-center justify-center p-2 rounded-lg shadow-md hover:shadow-lg transition-all"
        aria-label="Toggle Dark Mode"
      >
        {darkMode ? (
          <FaSun className="text-yellow-500" size={20} />
        ) : (
          <FaMoon className="text-gray-500" size={20} />
        )}
      </button>

      {/* Navigation Links */}
      <div className="flex gap-6">
        <a
          className="relative flex items-center gap-2 cursor-pointer group"
          onClick={handleDemoNavigation}
        >
          <AiOutlineFileText size={20} />
          <span className="relative">
            Demo
            <span className="absolute left-0 bottom-[-1px] w-0 h-[2px] bg-current transition-all duration-300 group-hover:w-full"></span>
          </span>
        </a>
        <a
          className="relative flex items-center gap-2 cursor-pointer group"
          onClick={handleImplementationNavigation}
        >
          <AiOutlineSetting size={20} />
          <span className="relative">
            Implementation
            <span className="absolute left-0 bottom-[-1px] w-0 h-[2px] bg-current transition-all duration-300 group-hover:w-full"></span>
          </span>
        </a>
        <a
          className="relative flex items-center gap-2 group"
          href="https://aclanthology.org/J95-2003/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <AiOutlineGlobal size={20} />
          <span className="relative">
            Go to paper →
            <span className="absolute left-0 bottom-[-1px] w-0 h-[2px] bg-current transition-all duration-300 group-hover:w-full"></span>
          </span>
        </a>
      </div>
    </section>
  );
};

export default Navbar;
