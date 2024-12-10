import {
  AiOutlineStar,
  AiOutlineGlobal,
  AiOutlineFileText,
} from "react-icons/ai";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

interface NavbarProps {
  handleDemoClick: () => void;
  handlePurposeClick: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  handleDemoClick,
  handlePurposeClick,
  darkMode,
  toggleDarkMode,
}) => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setShowNavbar(false); // Hide on scroll down
      } else {
        setShowNavbar(true); // Show on scroll up
      }
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
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          onClick={handleDemoClick}
        >
          <AiOutlineFileText size={20} />
          Demo
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          onClick={handlePurposeClick}
        >
          <AiOutlineStar size={20} />
          Purpose
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://aclanthology.org/J95-2003/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <AiOutlineGlobal size={20} />
          Go to paper →
        </a>
      </div>
    </section>
  );
};

export default Navbar;
