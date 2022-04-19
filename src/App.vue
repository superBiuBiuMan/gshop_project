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
export default {
  name: "App",
  components: {
    Footer,
    Header,
  },
};
</script>

<style>
</style>