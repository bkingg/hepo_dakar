"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const AnimateOnScroll: React.FC = () => {
  const pathname = usePathname(); // Get current path

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>(".section");

    if (sections.length === 0) return; // Exit if no sections exist

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollPosition >= sectionTop + sectionHeight / 3) {
          section.classList.add("visible"); // Add visible class for animation
        }
      });
    };

    // Initialize scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup event listeners
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]); // Re-run when pathname changes

  return null;
};

export default AnimateOnScroll;
