<template>
  <div>
    <h2>爸爸有存款: {{ money }}</h2>
    <button @click="borrowFromXM(100)">找小明借钱100</button><br />
    <button @click="borrowFromXH(150)">找小红借钱150</button><br />

    <button @click="borrowFromAll(200)">找所有孩子借钱200</button><br />

    <br />
    <Son ref="son" />

    <br />
    <Daughter ref="dau" />
    
  </div>
</template>

<script>
import Son from "./Son";
import Daughter from "./Daughter";

export default {
  name: "ChildrenParentTest",
  data() {
    return {
      money: 1000,
    };
  },

  methods: {
    //找小明借钱100
    borrowFromXM(money) {
      //儿子钱-100
      this.$refs.son.money -= 100;
      //父亲钱+100
      this.money += money;
    },

    //找小红借钱150
    borrowFromXH(money) {
      //女儿钱-100
      this.$refs.dau.money -= 200;
      //父亲钱+100
      this.money += money;
    },

    //找所有孩子借钱200
    borrowFromAll(money) {
      //获取所有的子女
      var childrenAll = this.$children;//返回的是VueComponent组成的数组

      //所有子女钱-200
      childrenAll.forEach((child)=>{
        child.money -= 200;
      })

      //自己的钱+400;
      this.money= this.money + money * 2;


      // //儿子钱-100
      // this.$refs.son.money -= 200;
      // //女儿钱-100
      // this.$refs.dau.money -= 200;
      // this.money= this.money + money * 2;
    },
  },

  components: {
    Son,
    Daughter,
  },
};
</script>

<style>
</style>
