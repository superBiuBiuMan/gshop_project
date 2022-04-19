import Vue from 'vue'
import App from './App.vue'
import store from "@/store"
import router from "@/router"
import Nav from "@/components/Nav"
Vue.config.productionTip = false
Vue.component(Nav.name,Nav);//Nav.name 为Nav,所以后面可以只用Nav来进行使用这个组件
new Vue({
  el:"#app",
  render:h=>h(App),
  store,
  router
})
