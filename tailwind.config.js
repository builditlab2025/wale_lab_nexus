/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // ── Brand Colors ────────────────────────────────────────────────────────
      colors: {
        brand: {
          green: "#00a708", // --wu-green  (primary action, borders, badges)
          dark: "#02250a", // --wu-dark   (primary bg, headings, footer bar)
          orange: "#f8921e", // --wu-orange (accent, highlights, stage badges)
          bg: "#f8fafc", // --wu-bg     (light page background)
        },
      },

      // ── Typography ───────────────────────────────────────────────────────────
      fontFamily: {
        // h1-h4 / .brand-font  → Montserrat
        brand: ["Montserrat", "sans-serif"],
        // body copy            → Inter
        sans: ["Inter", "sans-serif"],
        // pull-quotes / .serif → Playfair Display
        serif: ["Playfair Display", "serif"],
      },

      fontWeight: {
        // weights used across the design
        light: "300",
        regular: "400",
        semibold: "600",
        bold: "700",
        extrabold: "800",
      },

      // ── Letter-spacing tokens (used heavily for uppercase labels) ────────────
      letterSpacing: {
        tighter: "-0.05em",
        tight: "-0.025em",
        "widest-2": "0.2em",
        "widest-3": "0.3em",
        "widest-4": "0.4em",
        "widest-5": "0.5em",
      },

      // ── Custom font sizes (badge / meta text) ────────────────────────────────
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "1rem" }], // 10px — DOI refs, meta
        "3xs": ["0.5625rem", { lineHeight: "0.875rem" }], // 9px — tag chips
      },

      // ── Border radius ────────────────────────────────────────────────────────
      borderRadius: {
        // The design uses sharp rectangles (rounded-none implicit)
        // and rounded-xl / rounded-2xl / rounded-3xl for cards/modals.
        // Tailwind's defaults cover these; nothing extra needed here.
      },

      // ── Box shadows ──────────────────────────────────────────────────────────
      boxShadow: {
        "card-hover": "0 20px 25px -5px rgb(0 0 0 / 0.1)",
        "cta-green": "0 4px 14px 0 rgb(0 167 8 / 0.4)", // shadow-green-900/10 equivalent
      },

      // ── Background gradients (used in hero, journal section, card overlays) ─
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #02250a 0%, #064e3b 100%)",
        "card-overlay-dark":
          "linear-gradient(to top, rgba(2,37,10,0.8), transparent)",
        "journal-cover": "linear-gradient(to bottom right, #02250a, #011a07)",
        "hero-accent": "linear-gradient(to bottom right, #00a708, #f8921e)",
        "logo-icon": "linear-gradient(to top right, #00a708, transparent)",
        "card-glow": "radial-gradient(circle, #00a708 0%, transparent 70%)",
      },

      // ── Backdrop blur (sticky nav uses backdrop-blur-md) ────────────────────
      // Tailwind's default `backdrop-blur-md` is sufficient; listed for clarity.

      // ── Spacing / sizing ─────────────────────────────────────────────────────
      // All spacing in the design uses Tailwind's default scale.
      // One custom aspect ratio used for the journal cover mock:
      aspectRatio: {
        "3/4": "3 / 4",
      },

      // ── Opacity ──────────────────────────────────────────────────────────────
      opacity: {
        5: "0.05", // logo-pattern background
        15: "0.15",
        60: "0.60",
      },

      // ── Blur ─────────────────────────────────────────────────────────────────
      blur: {
        "3xl": "64px", // used in impact card glow circle
      },

      // ── Z-index ──────────────────────────────────────────────────────────────
      zIndex: {
        40: "40", // filter bar sticky layer
        50: "50", // nav sticky layer
      },

      // ── Transition timing ────────────────────────────────────────────────────
      transitionTimingFunction: {
        card: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      transitionDuration: {
        200: "200ms",
        300: "300ms",
      },
    },
  },
  plugins: [],
};
