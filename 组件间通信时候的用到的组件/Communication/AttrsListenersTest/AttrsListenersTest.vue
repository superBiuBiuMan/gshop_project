<template>
  <div>
    <h2>自定义带Hover提示的按钮</h2>

    <MyButton 
    @eventA="test1" @eventB="test2"
    size="mini" type="success" title="成功提示" icon="el-icon-success">
    </MyButton>


  </div>
</template>

<script type="text/ecmascript-6">
  import MyButton from "./myButton.vue"
  export default {
    name: 'AttrsListenersTest',
    data(){
      return {
        b:10
      }
    },
    components:{
      MyButton
    },
    methods: {
      test1(){
        console.log("eventA");
      },
      test2(){
        console.log("eventB");
      }
    },
  }
</script>
