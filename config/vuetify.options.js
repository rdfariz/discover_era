let darkMode = false
let rtl = false

// Color
export const defaultColors = {
  primary: '#000000',
  primarylight: '#000000',
  primarydark: '#000000',
  secondary: '#FCDE3E',
  secondarylight: '#FCDE3E',
  secondarydark: '#FCDF3E',
  anchor: '#000000'
}
export const defaultColorsDark = {
  primary: '#000000',
  primarylight: '#000000',
  primarydark: '#000000',
  secondary: '#ffffff',
  secondarylight: '#ffffff',
  secondarydark: '#ffffff',
  anchor: '#FCDE3E'
}

// let colors = { ...defaultColors }

if (typeof Storage !== 'undefined') { // eslint-disable-line
  // ColorPallete Configuration
  // try {
  //   const _pallete = localStorage.getItem('_fullmoon_pallete') || {}
  //   const palletejson = JSON.parse(_pallete)
  //   Object.assign(colors, palletejson)
  // } catch (err) {
  //   colors = { ...defaultColors }
  // }

  // DarkMode & RTL
  darkMode = localStorage.getItem('_fullmoon_darkmode') || false
  rtl = localStorage.getItem('_fullmoon_rtl') || false
}

export const theme = {
  ...defaultColors
}
export const themeDark = {
  ...defaultColorsDark
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
        ...themeDark
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
