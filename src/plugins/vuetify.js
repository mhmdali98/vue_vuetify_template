import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import i18n from '@/i18n'

Vue.use(Vuetify)

const theme = {
  primary: '#3F51B5',
  secondary: '#E91E63',
  accent: '#9C27b0',
  info: '#00CAE3'
}

export default new Vuetify({
  rtl: true,
  lang: {
    t: (key, ...params) => i18n.t(key, params)
  },
  theme: {
    themes: {
      dark: theme,
      light: theme
    }
  }
})
