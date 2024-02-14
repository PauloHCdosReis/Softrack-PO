module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          primaria: 'rgb(0, 255, 159)',
          secundaria: '#465DFF',
          fundo: '#293541',
          branco: '#fff',
          text: '#fff',
          text2: '#000',
          card: '#323f4d',
        },
        light: {
          primaria: '#465DFF',
          secundaria: 'rgb(0, 255, 159)',
          fundo: '#e2e2e2',
          branco: '#fff',
          text: '#000',
          text2: '#e2e2e2',
          card: '#d1d1d1',
        },
      },
    },
    letterSpacing: {
      wider: 22,
  },
  plugins: [],
}}
