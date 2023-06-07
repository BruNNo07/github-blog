/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend:{
      colors:{
          blue: '#3294F8',
          baseTitle: '#E7EDF4',
          baseSubTitle: '#C4D4E3',
          baseText: '#AFC2D4',
          baseSpan: '#7B96B2',
          baseLabel: '#3A536B',
          baseBorder: '#1C2F41',
          basePost: '#112131',
          baseProfile: '#0B1B2B',
          baseBackground: '#071422',
          baseInput: '#040F1A',
      },
    },
  },
  plugins: [],
}
