import { createApp } from 'vue'
import { createPinia } from 'pinia'
import i18n from './i18n'
import { createVuestic } from 'vuestic-ui'
import { createGtm } from '@gtm-support/vue-gtm'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../axios'
import stores from './stores'
import router from './router'
import PrimeVue from 'primevue/config'
import vuesticGlobalConfig from './services/vuestic-ui/global-config'
import App from './App.vue'

//PrimeVue
import 'primevue/resources/themes/lara-light-indigo/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

import 'datatables.net-bs5'
// import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css'
import 'jszip'
import 'pdfmake'
import 'datatables.net-buttons-bs5/css/buttons.bootstrap5.min.css'
import 'datatables.net-buttons/js/buttons.colVis'
import 'datatables.net-buttons/js/buttons.flash'
import 'datatables.net-buttons/js/buttons.html5'
import 'datatables.net-buttons/js/buttons.print'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(stores)
app.use(router)
app.use(i18n)
app.use(PrimeVue)
app.use(createVuestic({ config: vuesticGlobalConfig }))

if (import.meta.env.VITE_APP_GTM_ENABLED) {
  app.use(
    createGtm({
      id: import.meta.env.VITE_APP_GTM_KEY,
      debug: false,
      vueRouter: router,
    }),
  )
}

app.mount('#app')
