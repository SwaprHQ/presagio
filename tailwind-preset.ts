import colors from "tailwindcss/colors";

module.exports = {
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        button: "inset 0px -1px 0px 0px var(--color-black-12)",
      },
    },
    boxShadow: {
      0: "0px 0px 0px 0px var(--effect-shadow-e0)",
      1: "0px 1px 3px -1px var(--effect-shadow-e3)",
      2: "0px 3px 4px -2px var(--effect-shadow-e3)",
      3: "0px 8px 24px -4px var(--effect-shadow-e2)",
      4: "0px 18px 32px -8px var(--effect-shadow-e2)",
      5: "0px 28px 24px -8px var(--effect-shadow-e1)",
      6: "0px 40px 48px -8px var(--effect-shadow-e1)",
    },
    fontSize: {
      "2xs": ["10px", "16px"],
      xs: ["11px", "16px"],
      sm: ["12px", "16px"],
      base: ["14px", "24px"],
      md: ["16px", "24px"],
      lg: ["18px", "28px"],
      xl: ["20px", "32px"],
      "2xl": ["26px", "40px"],
      "3xl": ["32px", "40px"],
    },
    borderRadius: {
      0: "0px",
      4: "4px",
      6: "6px",
      8: "8px",
      12: "12px",
      16: "16px",
      20: "20px",
      32: "32px",
      48: "48px",
      64: "64px",
      100: "100px",
    },
    colors: {
      transparent: "transparent",
      inherit: colors.inherit,
      black: {
        12: "var(--color-black-12)",
      },
      outline: {
        none: "var(--outline-none)",
        white: "var(--outline-white)",
        black: "var(--outline-black)",
        "base-em": "var(--outline-base-em)",
        "low-em": "var(--outline-low-em)",
        "med-em": "var(--outline-med-em)",
        "high-em": "var(--outline-high-em)",
        primary: {
          "base-em": "var(--outline-primary-base-em)",
          "low-em": "var(--outline-primary-low-em)",
          "med-em": "var(--outline-primary-med-em)",
          "high-em": "var(--outline-primary-high-em)",
        },
        success: {
          "base-em": "var(--outline-success-base-em)",
          "low-em": "var(--outline-success-low-em)",
          "med-em": "var(--outline-success-med-em)",
          "high-em": "var(--outline-success-high-em)",
        },
        danger: {
          "base-em": "var(--outline-danger-base-em)",
          "low-em": "var(--outline-danger-low-em)",
          "med-em": "var(--outline-danger-med-em)",
          "high-em": "var(--outline-danger-high-em)",
        },
        info: {
          "base-em": "var(--outline-info-base-em)",
          "low-em": "var(--outline-info-low-em)",
          "med-em": "var(--outline-info-med-em)",
          "high-em": "var(--outline-info-high-em)",
        },
        warning: {
          "base-em": "var(--outline-warning-base-em)",
          "low-em": "var(--outline-warning-low-em)",
          "med-em": "var(--outline-warning-med-em)",
          "high-em": "var(--outline-warning-high-em)",
        },
        "neutral-alt": {
          white: "var(--outline-neutral-alt-white)",
          black: "var(--outline-neutral-alt-black)",
        },
      },
      text: {
        white: "var(--text-white)",
        black: "var(--text-black)",
        "low-em": "var(--text-low-em)",
        "med-em": "var(--text-med-em)",
        "high-em": "var(--text-high-em)",
        disabled: "var(--text-disabled)",
        primary: {
          base: "var(--text-primary-base)",
          main: "var(--text-primary-main)",
          med: "var(--text-primary-med)",
          em: "var(--text-primary-em)",
        },
        secondary: {
          main: "var(--text-secondary-main)",
          em: "var(--text-secondary-em)",
        },
        success: {
          main: "var(--text-success-main)",
          em: "var(--text-success-em)",
        },
        danger: {
          main: "var(--text-danger-main)",
          em: "var(--text-danger-em)",
        },
        info: {
          main: "var(--text-info-main)",
          em: "var(--text-info-em)",
        },
        "neutral-alt": {
          white: "var(--text-neutral-alt-white)",
          black: "var(--text-neutral-alt-black)",
        },
      },
      surface: {
        white: "var(--surface-white)",
        black: "var(--surface-black)",
        disabled: {
          "base-em": "var(--surface-disabled-base-em)",
          "low-em": "var(--surface-disabled-low-em)",
          "med-em": "var(--surface-disabled-med-em)",
          "high-em": "var(--surface-disabled-high-em)",
        },
        primary: {
          main: "var(--surface-primary-main)",
          accent: {
            1: "var(--surface-primary-accent-1)",
            2: "var(--surface-primary-accent-2)",
            3: "var(--surface-primary-accent-3)",
          },
        },
        secondary: {
          main: "var(--surface-secondary-main)",
          accent: {
            1: "var(--surface-secondary-accent-1)",
            2: "var(--surface-secondary-accent-2)",
            3: "var(--surface-secondary-accent-3)",
          },
        },
        success: {
          main: "var(--surface-success-main)",
          accent: {
            1: "var(--surface-success-accent-1)",
            2: "var(--surface-success-accent-2)",
            3: "var(--surface-success-accent-3)",
          },
        },
        danger: {
          main: "var(--surface-danger-main)",
          accent: {
            1: "var(--surface-danger-accent-1)",
            2: "var(--surface-danger-accent-2)",
            3: "var(--surface-danger-accent-3)",
          },
        },
        info: {
          main: "var(--surface-info-main)",
          accent: {
            1: "var(--surface-info-accent-1)",
            2: "var(--surface-info-accent-2)",
            3: "var(--surface-info-accent-3)",
          },
        },
        warning: {
          main: "var(--surface-warning-main)",
          accent: {
            1: "var(--surface-warning-accent-1)",
            2: "var(--surface-warning-accent-2)",
            3: "var(--surface-warning-accent-3)",
          },
        },
        surface: {
          0: "var(--surface-surface-0)",
          1: "var(--surface-surface-1)",
          2: "var(--surface-surface-2)",
          3: "var(--surface-surface-3)",
          4: "var(--surface-surface-4)",
          bg: "var(--surface-surface-bg)",
          "high-em": "var(--surface-surface-high-em)",
        },
        "neutral-alt": {
          white: "var(--surface-neutral-alt-white)",
          black: "var(--surface-neutral-alt-black)",
        },
      },
      shadow: {
        e0: "var(--effect-shadow-e0)",
        e1: "var(--effect-shadow-e1)",
        e2: "var(--effect-shadow-e2)",
        e3: "var(--effect-shadow-e3)",
      },
    },
  },
  plugins: [],
};
