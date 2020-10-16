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

if (typeof Storage !== 'undefined') {
  // DarkMode & RTL
  darkMode = localStorage.getItem('_discover_darkmode') || false
  rtl = localStorage.getItem('_discover_rtl') || false
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
    iconfont: 'fa'
  }
}
