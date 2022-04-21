import Vue from 'vue'
import App from './App.vue'
//vuex
import store from "@/store"
import router from "@/router"
//全局组件-导航栏
import Nav from "@/components/Nav"
//引入swiper插件
import "@/plugins/swiper.js";
//关闭开发提示
Vue.config.productionTip = false
//注册全局组件-导航栏
Vue.component(Nav.name,Nav);//Nav.name 为Nav,所以后面可以只用Nav来进行使用这个组件
new Vue({
  el:"#app",
  render:h=>h(App),
  store,
  router
})
