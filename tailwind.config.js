const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      spacing: {
        "72": "18rem",
        "84": "21rem",
        "96": "24rem",
        "108": "27rem",
        "130": "30rem",
        "142": "33rem",
        "154": "36rem",
        "166": "39rem",
        "178": "42rem",
        "190": "45rem",
        "202": "48rem"
      },
      minHeight: {
        "72": "18rem",
        "84": "21rem",
        "96": "24rem",
        "108": "27rem",
        "130": "30rem",
        "142": "33rem",
        "154": "36rem",
        "166": "39rem",
        "178": "42rem",
        "190": "45rem",
        "202": "48rem"
      }
    },
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'odd'],
  },
  plugins: [
    require('@tailwindcss/ui')({
      layout: 'sidebar',
    })
  ]
}