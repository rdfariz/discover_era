export default {
  computed: {
    story () {
      return this.$store.getters.layout || {}
    },
    content () {
      return this.story.content || {}
    },
    search_placeholder () {
      return this.$store.getters.home.search_placeholder || ''
    },
    menu () {
      if (this.content.menu) {
        return this.content.menu.map((el) => {
          if (el.component && el.component === 'menu-item-nested') {
            const items = el.items.map((item) => {
              return {
                title: item.title || '',
                icon: (item.icon && item.icon.icon) ? item.icon.icon : '',
                icon_code: item.icon_code || '',
                link: item.link || '',
                link_external: item.link_external || false,
                disabled: item.disabled || false,
                variant: item.variant || ''
              }
            })
            return {
              title: el.title || '',
              disabled: el.disabled || false,
              items: items || []
            }
          } else {
            return {
              title: el.title || '',
              icon: (el.icon && el.icon.icon) ? el.icon.icon : '',
              icon_code: el.icon_code || '',
              link: el.link || '',
              link_external: el.link_external || false,
              disabled: el.disabled || false,
              variant: el.variant || ''
            }
          }
        })
      } else {
        return []
      }
    },
    drawerLogoSquare () {
      return this.content.drawer_logo_square || ''
    },
    drawerLogoSquareDark () {
      return this.content.drawer_logo_square_dark || ''
    },
    drawerLogoDark () {
      return this.content.drawer_logo_dark || this.drawerLogo
    },
    drawerLogo () {
      return this.content.drawer_logo || ''
    },
    drawerLogoHeight () {
      return this.content.drawer_logo_height || ''
    },
    drawerLogoContain () {
      return this.content.drawer_logo_contain || true
    },
    footerHeight () {
      return this.content.footer_height || ''
    },
    footerBackground () {
      return this.content.footer_background && this.content.footer_background.color ? this.content.footer_background.color : ''
    },
    footerBackgroundImage () {
      return this.content.footer_background_image || ''
    },
    footerDark () {
      return this.content.footer_dark || false
    },
    footerLogoContain () {
      return this.content.footer_logo_contain || true
    },
    footerLogo () {
      return this.content.footer_logo || ''
    },
    footerLogoDark () {
      return this.content.footer_logo_dark || this.footerLogo
    },
    footerLogoHeight () {
      return this.content.footer_logo_height || ''
    },
    footerIntro () {
      return this.content.footer_intro || ''
    },
    footerMenu () {
      if (this.content.footer_menu) {
        return this.content.footer_menu.map((el) => {
          const items = el.items.map((item) => {
            return {
              title: item.title || '',
              icon: (item.icon && item.icon.icon) ? item.icon.icon : '',
              icon_code: item.icon_code || '',
              link: item.link || '',
              link_external: item.link_external || false,
              disabled: item.disabled || false,
              variant: item.variant || ''
            }
          })
          return {
            title: el.title || '',
            disabled: el.disabled || false,
            items: items || []
          }
        })
      } else {
        return []
      }
    },
    footerData () {
      return {
        height: this.footerHeight,
        background: this.footerBackground,
        backgroundImage: this.footerBackgroundImage,
        intro: this.footerIntro,
        logo: this.footerLogo,
        logoDark: this.footerLogoDark,
        logoHeight: this.footerLogoHeight,
        logoContain: this.footerLogoContain,
        dark: this.footerDark,
        menu: this.footerMenu
      }
    }
  }
}
