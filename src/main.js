import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

let app=new Vue({
  render: h => h(App),
}).$mount('#app')

console.log("hello world!")