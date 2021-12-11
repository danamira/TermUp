import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
String.prototype.farsiNum= function() {
  return this.replace(/\d/g, d =>  '٠١٢٣٤٥٦٧٨٩'[d])
}
new Vue({
  render: h => h(App),
}).$mount('#app')