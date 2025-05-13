import { createApp } from 'vue'
import { createVuetify } from 'vuetify'

import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles.scss'

import './style.css'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import App from './App.vue'

const vuetify = createVuetify({
  components,
  directives,
})

createApp(App).use(vuetify).mount('#app')





