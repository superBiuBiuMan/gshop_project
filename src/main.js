import Vue from 'vue';
import App from './App.vue';
//vuex
import store from "@/store";
import router from "@/router";
//element-ui 
import "@/plugins/elementui.js";
//全局组件-导航栏
import Nav from "@/components/Nav";
//全局组件-自定义分页器
import MyPagination from "@/components/Pagination";

// API请求文件
import * as API from "@/api";

//引入swiper插件
import "@/plugins/swiper.js";
//引入假数据
import "@/mock/mockServe.js";

//图片懒加载
import VueLazyload from "vue-lazyload";
//表单验证
import "@/plugins/validate";

Vue.use(VueLazyload);
//图片懒加载过渡图片
const loadimage = require('@/assets/image/loading.gif')
Vue.use(VueLazyload, {
  preLoad: 1.3,
  // error: errorimage,//出错的图片
  loading: loadimage,
  attempt: 1//加载错误后最大尝试次数
})

//关闭开发提示
Vue.config.productionTip = false
//注册全局组件-导航栏
Vue.component(Nav.name,Nav);//Nav.name 为Nav,所以后面可以只用Nav来进行使用这个组件
Vue.component(MyPagination.name,MyPagination);


new Vue({
  beforeCreate(){
    //全局事件总线
    Vue.prototype.$bus = this;
    //不使用vue的时候,若要发送ajax请求,可以吧请求对象API捆绑在Vue原型上
    Vue.prototype.$API = API;
  },
  el:"#app",
  render:h => h(App),
  store,
  router
})
