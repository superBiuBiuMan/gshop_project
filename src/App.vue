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
//引入swipercss
import "swiper/css/swiper.css"
// ajax
export default {
  name: "App",
  mounted(){
    //获取三级分类
    this.$store.dispatch("getBaseCategoryList");
  },
  components: {
    Footer,
    Header,
  },
};
</script>

<style>
</style>