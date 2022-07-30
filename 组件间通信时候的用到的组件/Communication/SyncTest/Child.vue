<template>
  <div style="background: #ccc; height: 50px">
    <span>小明每次花100元</span>

    <!-- 每次单击爸爸的钱少100 -->
    <button @click="money = money - 100">花钱</button>

    <!-- 显示爸爸剩余多少钱 -->
    爸爸还剩 {{ money }} 元
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "Child",

  // 接收父亲传递过来的信息,告诉了我现在父亲有多少钱
  props: ["money"],
};
</script>
