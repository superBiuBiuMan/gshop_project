<template>
  <div style="background: #ccc; height: 50px">
    <h3>女儿小红: 有存款: {{ money }}</h3>
    <button @click="borrowToFather(100)">给爸爸钱: 100</button>
  </div>
</template>

<script>
import myMixIn from "./mymixin.js";
export default {
  mixins:[myMixIn],
  name: "Daughter",
  data() {
    return {
      money: 20000,
    };
  },

  methods: {
    // borrowToFather(money) {
    //   //通过this.$parent获取父亲(如果有二个父亲的话不适用这种!因为存在组件复用的情况!)
    //   //必须只有一个父亲才可以使用

    //   //自己的钱-100
    //   this.money -= money;

    //   //父亲钱+100
    //   this.$parent.money += money;
    // },
  },
};
</script>
