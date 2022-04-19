<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="!$route.meta.isHidenFooter"></Footer>
  </div>
</template>

<script>
// 引入非路由组件
import Footer from "@/components/Footer";
import Header from "@/components/Header";
// ajax
import {getBaseCategoryList} from "./api";
export default {
  name: "App",
  mounted(){
    getBaseCategoryList().then(data=>{
      console.log(data);
    })
  },
  components: {
    Footer,
    Header,
  },
};
</script>

<style>
</style>