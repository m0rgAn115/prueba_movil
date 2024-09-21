module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}", // Ajusta según la estructura de tu proyecto
    ],
    theme: {
      extend: {
        colors: {
          primary: "#EB0029",
        },
        keyframes: {
          glow: {
            '0%, 100%': { textShadow: '0 0 20px rgba(255, 255, 255, 0.9)' },
            '50%': { textShadow: '0 0 40px rgba(255, 255, 255, 1)' },
          },
          colorShadow: {
            '0%, 100%': { textShadow: '0 0 10px #00eaff' },  // Rojo
            '25%': { textShadow: '0 0 20px #0bee44' },       // Verde
            '50%': { textShadow: '0 0 30px #9b48ffff' },       // Azul
            '75%': { textShadow: '0 0 40px #fff200' },       // Amarillo
          },
        },
        animation: {
          glow: 'glow 2s ease-in-out infinite',
          colorShadow: 'colorShadow 7s ease-in-out infinite',
        },
      },
    },
    plugins: [],
  };