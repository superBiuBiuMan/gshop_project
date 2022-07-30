<template>
  <div>
    <h1>EventTest组件</h1>
    <!-- 等同于<button @click="test1($event)"></button> -->
    <button @click="test1">test1</button>

    <!-- 给组件绑定  绑定的是自定义事件,无效-->
    <!-- <Event1 @click="test2"></Event1> -->

    <!-- 给组件绑定 使用.native关键字 绑定的是DOM事件,有效-->
    <Event1 @click.native="test2"></Event1>

    <!-- 给组件绑定  绑定的是自定义事件click -->
    <Event2 @click="xxx"></Event2>

    <input :value="watch">
  </div>
</template>

<script type="text/ecmascript-6">
  import Event1 from './Event1.vue'
  import Event2 from './Event2.vue'

  export default {
    name: 'EventTest',
    data(){
      return {
        watch:"看着点",
      }
    },
    components: {
      Event1,
      Event2,
    },

    methods: {
      test1(event){
        console.log(event.target.textContent);
      },
      test2(event){
        console.log(event.target.textContent);
      },
      xxx(event){
        console.log(event);
      }
    }
  }
</script>
