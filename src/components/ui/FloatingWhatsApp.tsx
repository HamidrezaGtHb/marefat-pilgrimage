"use client";

import React, { useState, useEffect } from "react";

export interface FloatingWhatsAppProps {
  phoneNumber: string;
  message?: string;
  position?: "left" | "right";
  showTooltip?: boolean;
  tooltipText?: string;
}

/**
 * Floating WhatsApp button that stays visible on all pages
 * Modern, accessible, and follows design system patterns
 */
export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  phoneNumber,
  message = "Hello! I'm interested in your pilgrimage tours.",
  position = "right",
  showTooltip = true,
  tooltipText = "Chat with us",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    // Show button after a short delay for better UX
    const timer = setTimeout(() => setIsVisible(true), 1000);

    // Handle scroll to make button smaller when scrolling
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Track analytics if needed
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'whatsapp_click', {
        event_category: 'engagement',
        event_label: 'floating_button',
      });
    }

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const positionClasses = position === "right"
    ? "right-6 sm:right-8"
    : "left-6 sm:left-8";

  const sizeClasses = hasScrolled
    ? "h-14 w-14"
    : "h-16 w-16 sm:h-[70px] sm:w-[70px]";

  return (
    <>
      {/* Floating Button */}
      <div
        className={`fixed bottom-6 sm:bottom-8 z-50 transition-all duration-300 ${positionClasses} ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="relative">
          {/* Tooltip */}
          {showTooltip && isExpanded && (
            <div
              className={`absolute bottom-full mb-3 whitespace-nowrap rounded-xl bg-charcoal px-4 py-2 text-xs font-medium text-ivory shadow-lg transition-all ${
                position === "right" ? "right-0" : "left-0"
              }`}
            >
              {tooltipText}
              <div
                className={`absolute top-full ${
                  position === "right" ? "right-4" : "left-4"
                } h-2 w-2 -translate-y-1 rotate-45 bg-charcoal`}
              />
            </div>
          )}

          {/* Main Button */}
          <button
            onClick={handleClick}
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
            className={`
              group relative flex items-center justify-center
              ${sizeClasses}
              rounded-full bg-[#25D366] text-white
              shadow-lg shadow-[#25D366]/30
              transition-all duration-300
              hover:scale-110 hover:shadow-xl hover:shadow-[#25D366]/40
              focus:outline-none focus:ring-4 focus:ring-[#25D366]/30
              active:scale-95
            `}
            aria-label="Contact us on WhatsApp"
          >
            {/* Pulse Animation Ring */}
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />

            {/* WhatsApp Icon */}
            <svg
              className={`relative ${hasScrolled ? "h-7 w-7" : "h-8 w-8 sm:h-9 sm:w-9"} transition-all`}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>

            {/* Online Badge (optional - shows green dot) */}
            <span className="absolute right-0 top-0 flex h-3 w-3 sm:h-4 sm:w-4">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-3 w-3 sm:h-4 sm:w-4 rounded-full bg-green-500 border-2 border-white" />
            </span>
          </button>
        </div>
      </div>
    </>
  );
};
