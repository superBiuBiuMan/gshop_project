<template>
  <div>
    <div class="no">404 not found page!</div>
    <div style="text-align:center"><router-link to="/" style="font-size:60px;color: #4cbcf4;">返回首页</router-link></div>
  </div>
</template>

<script>
export default {
  name: 'notfound',
}
</script>

<style lang="less" scoped>
.no{
  font-size: 80px;
  text-align: center;
  margin-top: 20%;
  white-space: nowrap;
}
</style>
