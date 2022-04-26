import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store.js"
// import * as VueGoogleMaps from "vue2-google-maps" // Import package

Vue.config.productionTip = false

// Vue.use(VueGoogleMaps, { 
//   load: { key: "AIzaSyAsRf91TuMS99c-n80Zk8a3Q_MhZRCmqls", 
//   libraries: "places", 
//   region: "japan" }});

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
