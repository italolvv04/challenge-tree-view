import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        sidebar: '#17192D',
        unitLink: '#023B78',
        colorLink: '#2188FF',
      },
      width: {
        sidebar: '1336px',
      },
      boxShadow: {
        unitLink: '0px 2px 0px 0px #0000000D',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
