/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // ── Brand Colors ────────────────────────────────────────────────────────
      colors: {
        brand: {
          green: "#00a708",
          dark: "#02250a",
          orange: "#f8921e",
          bg: "#f8fafc",
        },
      },

      // ── Typography ───────────────────────────────────────────────────────────
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Playfair Display", "serif"],
        brand: ["Montserrat", "sans-serif"],
      },

      // ── Custom font sizes ────────────────────────────────────────────────────
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "1rem" }],
        "3xs": ["0.5625rem", { lineHeight: "0.875rem" }],
      },

      // ── Letter spacing ───────────────────────────────────────────────────────
      letterSpacing: {
        "widest-2": "0.2em",
        "widest-3": "0.3em",
        "widest-4": "0.4em",
        "widest-5": "0.5em",
      },

      // ── Box shadows ──────────────────────────────────────────────────────────
      boxShadow: {
        "card-hover": "0 20px 25px -5px rgb(0 0 0 / 0.1)",
        "cta-green": "0 4px 14px 0 rgb(0 167 8 / 0.4)",
      },

      // ── Background gradients ─────────────────────────────────────────────────
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #02250a 0%, #064e3b 100%)",
        "card-overlay-dark":
          "linear-gradient(to top, rgba(2,37,10,0.8), transparent)",
        "journal-cover": "linear-gradient(to bottom right, #02250a, #011a07)",
        "hero-accent": "linear-gradient(to bottom right, #00a708, #f8921e)",
      },

      // ── Aspect ratios ────────────────────────────────────────────────────────
      aspectRatio: {
        "3/4": "3 / 4",
      },

      // ── Opacity ──────────────────────────────────────────────────────────────
      opacity: {
        5: "0.05",
        15: "0.15",
        60: "0.60",
      },

      // ── Blur ─────────────────────────────────────────────────────────────────
      blur: {
        "3xl": "64px",
      },

      // ── Z-index ──────────────────────────────────────────────────────────────
      zIndex: {
        40: "40",
        50: "50",
      },
    },
  },
  plugins: [],
};
