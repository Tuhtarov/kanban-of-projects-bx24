import {BX24} from './libs/dev-rest'
window.BX24 = BX24
import './libs/bitrix24-complexBatch'

import Vue from 'vue'
import router from './router'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

new Vue({
    store,
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app')

window.BX24.init(function () {
    store.dispatch('runBatch')
})



