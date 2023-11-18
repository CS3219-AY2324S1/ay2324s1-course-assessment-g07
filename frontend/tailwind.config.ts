import type { Config } from 'tailwindcss';
const { nextui } = require('@nextui-org/react');
const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      height: {
        '10/100': '10%',
        '20/100': '20%',
        '40/100': '40%',
        '42/100': '42%',
        '45/100': '45%',
        '46/100': '46%',
        '60/100': '60%',
        '70/100': '70%',
        '75/100': '75%',
        '76/100': '76%',
        '80/100': '80%',
        '83/100': '83%',
        '84/100': '84%',
        '85/100': '85%',
        '87/100': '87%',
        '90/100': '90%',
        '91/100': '91%',
        '92/100': '92%',
        '93/100': '93%',
        '94/100': '94%',
        '95/100': '95%',
        '96/100': '96%',
        '97/100': '97%',
        '98/100': '98%',
      },
      maxHeight: {
        '1/10': '10%',
        '2/10': '20%',
        '3/10': '30%',
        '1/4': '25%',
        '1/2': '50%',
        '7/10': '70%',
        '3/4': '75%',
        '8/10': '80%',
        '9/10': '90%',
        full: '100%',
      },
    },
  },
  // darkMode: 'class',
  plugins: [require('daisyui'), nextui()], //require('daisyui'),
  daisyui: {
    themes: ['dark'],
  },
};
export default config;
