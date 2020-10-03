let darkMode = false
let rtl = false

// Color
export const defaultColors = {
  primary: '#5352ed',
  primarylight: '#5352ed',
  primarydark: '#2980b9',
  secondary: '#3742fa',
  secondarylight: '#3742fa',
  secondarydark: '#505050',
  anchor: '#2980b9'
}
let colors = { ...defaultColors }

if (typeof Storage !== 'undefined') { // eslint-disable-line
  // ColorPallete Configuration
  try {
    const _pallete = localStorage.getItem('_fullmoon_pallete') || {}
    const palletejson = JSON.parse(_pallete)
    Object.assign(colors, palletejson)
  } catch (err) {
    colors = { ...defaultColors }
  }

  // DarkMode & RTL
  darkMode = localStorage.getItem('_fullmoon_darkmode') || false
  rtl = localStorage.getItem('_fullmoon_rtl') || false
}

// const base = {
//   ...colors
// }

// const palette = {
//   base
// }

export const theme = {
  ...colors
}

export default {
  rtl: rtl === 'true',
  theme: {
    dark: darkMode === 'true',
    themes: {
      light: {
        ...theme
      },
      dark: {
        ...theme
      }
    },
    options: {
      customProperties: true
    }
  },
  breakpoint: {
    thresholds: {
      xs: 340,
      sm: 540,
      md: 800,
      lg: 1280
    },
    scrollBarWidth: 24
  },
  icons: {
    iconfont: 'fa' // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
  }
}
