"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const AnimateOnScroll: React.FC = () => {
  const pathname = usePathname(); // Get current path

  useEffect(() => {
    let observer: IntersectionObserver;

    const initializeObserver = () => {
      const sections = document.querySelectorAll<HTMLElement>(".section");

      if (sections.length === 0) return; // Exit if no sections exist

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible"); // Add animation class
              observer.unobserve(entry.target); // Stop observing once visible
            }
          });
        },
        {
          root: null,
          rootMargin: "0px 0px -10% 0px",
          threshold: 0.2,
        }
      );

      sections.forEach((section) => observer.observe(section));
    };

    // Add slight delay to ensure DOM is fully updated after route change
    const timeout = setTimeout(initializeObserver, 300);

    return () => {
      clearTimeout(timeout);
      if (observer) observer.disconnect();
    };
  }, [pathname]); // Re-run on route change

  return null;
};

export default AnimateOnScroll;
