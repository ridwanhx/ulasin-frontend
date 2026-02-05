import { useEffect, useState } from "react";

function BackToTop() {
  // Inisialisasi state (default: false)
  const [isVisible, setIsVisible] = useState(false);

  // Tampilkan button saat scroll
  useEffect(() => {
    const toggleVisibility = () => {
      // tombol akan muncul ketika scroll bergulir 200px ke bawah
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // add animation scroll
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
    >
      <button
        onClick={scrollToTop}
        aria-label="Back to top"
        className="w-[50px] h-[50px] bg-[#E50914] hover:bg-[#b90710]
        text-white rounded-full shadow-lg shadow-[#E50914]/30
        flex items-center justify-center transition-all hover:scale-105 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={3}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 15l7-7 7 7"
          />
        </svg>
      </button>
    </div>
  );
}

export { BackToTop };
