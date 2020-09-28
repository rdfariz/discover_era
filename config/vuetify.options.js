import '@fortawesome/fontawesome-free/css/all.css' // Ensure you are using css-loader

let darkMode = false
let rtl = false
if (typeof Storage !== 'undefined') { // eslint-disable-line
  darkMode = localStorage.getItem('_olivia_darkmode') || false
  rtl = localStorage.getItem('_olivia_rtl') || false
}

const base = {
  primary: '#5352ed', // primary main
  primarylight: '#5352ed', // primary light
  primarydark: '#FF6600', // primary dark
  secondary: '#3742fa', // secondary main
  secondarylight: '#3742fa', // secondary light
  secondarydark: '#505050', // secondary dark
  anchor: '#5352ed' // link
}

const palette = {
  base
}

export const theme = {
  ...palette.base
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
