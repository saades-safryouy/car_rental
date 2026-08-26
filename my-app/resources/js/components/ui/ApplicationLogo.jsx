// src/components/ui/ApplicationLogo.jsx
import React, { useEffect, useState } from 'react';
import DarkLogo from "../../../../public/Image/Logo/dark-mode.png";
import LightLogo from "../../../../public/Image/Logo/light-mode.png";
import { Link } from 'react-router-dom';

const ApplicationLogo = ({ className = 'h-12 w-auto' }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Initial check
    setIsDark(document.documentElement.classList.contains('dark'));

    // Create observer for dark mode changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDark(document.documentElement.classList.contains('dark'));
        }
      });
    });

    // Start observing
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    // Cleanup
    return () => observer.disconnect();
  }, []);

  return (
    <Link
      to="/"
      className="flex items-center gap-3 transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
      aria-label="Return to homepage"
    >
      <div className="relative">
        <img
          className={`${className} object-contain transition-transform hover:scale-110`}
          src={isDark ? DarkLogo : LightLogo}
          alt="AutoShop Logo"
          loading="lazy"
        />
      </div>
    </Link>
  );
};

export default ApplicationLogo;