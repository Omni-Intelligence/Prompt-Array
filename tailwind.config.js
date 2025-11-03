/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        brand: "hsl(var(--brand))",
        "brand-blue": "hsl(var(--brand-blue))",
        "brand-orange": "hsl(var(--brand-orange))",
        "brand-yellow": "hsl(var(--brand-yellow))",
        "brand-pink": "hsl(var(--brand-pink))",
        success: "hsl(var(--success))",
        warning: "hsl(var(--warning))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, rgba(102, 84, 245, 0.95) 0%, rgba(255, 107, 107, 0.95) 100%)',
        'gradient-hero': 'linear-gradient(180deg, rgba(102, 84, 245, 0.1) 0%, rgba(0, 0, 0, 0) 100%)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        'brand': '0 4px 20px rgba(102, 84, 245, 0.15)',
        'brand-lg': '0 8px 30px rgba(102, 84, 245, 0.25)',
        'glow': '0 0 20px rgba(102, 84, 245, 0.5)',
        'glow-lg': '0 0 40px rgba(102, 84, 245, 0.8)',
        'glow-orange': '0 0 20px rgba(255, 127, 0, 0.5)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "fade-in-up": {
          "from": { opacity: "0", transform: "translateY(20px)" },
          "to": { opacity: "1", transform: "translateY(0)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(102, 84, 245, 0.5)" },
          "50%": { boxShadow: "0 0 40px rgba(102, 84, 245, 0.8)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 4s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.6s ease-out",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': 'hsl(var(--foreground))',
            '--tw-prose-headings': 'hsl(var(--foreground))',
            '--tw-prose-links': 'hsl(var(--brand))',
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};