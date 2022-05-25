import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store.js"

//google api key  AIzaSyAEdyDhwzgy5nc6QvL3fcvAbSyFBYivKaE
import * as VueGoogleMaps from "vue2-google-maps" // Import package

import './registerServiceWorker'




Vue.config.productionTip = false
Vue.use(VueGoogleMaps, { 
    load: { 
      key: "AIzaSyAEdyDhwzgy5nc6QvL3fcvAbSyFBYivKaE", 
      libraries: "places", 
      region: "KR" },
      autobindAllEvents: false,
  });
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
