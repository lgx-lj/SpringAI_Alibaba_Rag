import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const lightTheme = {
  dark: false,
  colors: {
    background: '#F5F5F5',
    surface: '#FFFFFF',
    primary: '#1867C0',
    secondary: '#5CBBF6',
    accent: '#4CAF50',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
}

const darkTheme = {
  dark: true,
  colors: {
    background: '#121212',
    surface: '#1E1E1E',
    primary: '#2196F3',
    secondary: '#5CBBF6',
    accent: '#4CAF50',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
}

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'lightTheme',
    themes: { lightTheme, darkTheme }
  },
  defaults: {
    VBtn: { rounded: 'lg' },
    VCard: { rounded: 'lg', elevation: 1 },
    VTextField: { variant: 'outlined', density: 'comfortable' },
    VTextarea: { variant: 'outlined', density: 'comfortable' }
  }
})
