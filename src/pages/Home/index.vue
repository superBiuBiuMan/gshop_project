<template>
  <div>
    <!-- <div>Home</div> -->
    <Nav></Nav>
    <ListContainer></ListContainer>
    <TodayRecommend></TodayRecommend>
    <Rank></Rank>
    <Like></Like>
    <!-- 注册二个组件 -->
    <Floor :key="1"></Floor>
    <Floor :key="2"></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
// 组件
import ListContainer from "@/pages/Home/ListContainer";
import TodayRecommend from "@/pages/Home/TodayRecommend";
import Rank from "@/pages/Home/Rank";
import Like from "@/pages/Home/Like";
import Floor from "@/pages/Home/Floor";
import Brand from "@/pages/Home/Brand";
export default {
  name: "Home",
  // 局部组件注册
  components: {
    Brand,
    Floor,
    Like,
    ListContainer,
    Rank,
    TodayRecommend,
  },
};
</script>

<style lang="less" scoped>
</style>
