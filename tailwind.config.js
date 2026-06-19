export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: '#2563EB',
        'main-hover': '#2159D4',
        'main-active': '#1E4FBC',
        'main-darker': '#1C4AB0',
        'text-black': '#131927',
        'text-gray': '#6D717F',
        'light-blue': '#DEE8FC',
        'light-blue-active': '#BBCFF9',
      },
      fontFamily: {
        montaga: ['Montaga', 'serif'],
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      spacing: {
        'main-margin-y': '58px',
        'main-margin-x': '120px',
        'section-pad-y': '64px',
        'section-pad-x': '40px',
        'card-pad': '32px',
        'gap-custom': '40px',
        'gap-small': '24px',
      },
      boxShadow: {
        'shadow-1': '0 6px 12px -4px rgba(19, 25, 39, 0.12)',
        'shadow-2': '0 8px 22px -4px rgba(19, 25, 39, 0.08)',
      },
    },
  },
  plugins: [],
}