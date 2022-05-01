<template>
  <div>
      <button @click="show">单击我显示</button>
      <Address v-model="controlshow" @cancelAddress="clickCancel" @confirmAddress="clickConfirm"/>
  </div>
</template>

<script>
import Address from "./index.vue";
export default {
  name: '',
  components:{Address},
  data(){
      return {
          controlshow:false,
      }
  },
  methods:{
      //单击显示
      show(){
          this.controlshow = true;
      },
      //用户单击了确定
      clickConfirm(){
          console.log("用户单击确定");
      },
      //用户单击取消
      clickCancel(){
          console.log("用户单击取消");
          this.controlshow=false;
      }
  }
}
</script>

<style lang="less" scoped>

</style>
