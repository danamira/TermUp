import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
String.prototype.farsiNum= function() {
  return this.replace(/\d/g, d =>  '٠١٢٣٤٥٦٧٨٩'[d])
}
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')