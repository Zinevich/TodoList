import Vue from 'vue'
import {store} from "./store/store";
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import Animate from 'animate.css'

window.eventBus = new Vue()

Vue.config.productionTip = false


new Vue({
  store,
  router,
  Animate,
  render: h => h(App)
}).$mount('#app')
