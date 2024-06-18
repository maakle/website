/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
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
        // Social media colors
        facebook: "#3b5999",
        messenger: "#0084ff",
        twitter: "#55acee",
        linkedin: "#0077b5",
        github: "#171515",
        skype: "#00aff0",
        dropbox: "#007ee5",
        wordpress: "#21759b",
        vimeo: "#1ab7ea",
        slideshare: "#0077b5",
        vk: "#4c75a3",
        tumblr: "#34465d",
        yahoo: "#410093",
        "google-plus": "#dd4b39",
        pinterest: "#bd081c",
        youtube: "#cd201f",
        stumbleupon: "#eb4924",
        reddit: "#ff5700",
        quora: "#b92b27",
        yelp: "#af0606",
        weibo: "#df2029",
        producthunt: "#da552f",
        hackernews: "#ff6600",
        soundcloud: "#ff3300",
        blogger: "#f57d00",
        whatsapp: "#25d366",
        wechat: "#09b83e",
        line: "#00c300",
        medium: "#02b875",
        vine: "#00b489",
        slack: "#3aaf85",
        instagram: "#e4405f",
        dribbble: "#ea4c89",
        flickr: "#ff0084",
        foursquare: "#f94877",
        behance: "#131418",
        snapchat: "#fffc00",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
