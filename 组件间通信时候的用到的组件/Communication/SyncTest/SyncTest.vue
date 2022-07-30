<template>
  <div>
    小明的爸爸现在有{{moneyFather}}元

    <h2>原始(无效果)</h2>
    <!-- 弹出警告说数据不同步 -->
    <Child :money="moneyFather"></Child>
    <hr/>

    <h2>不使用sync修改符</h2>

    <!-- $event在自定义组件当中是$emit传递的参数 -->
    <!-- @update:xxx为固定格式,不可以更改,xxx为绑定的数据属性也就是v-bind:xxx="值"(当中的xxx) 
        对应简写属性 :xxx="值" 当中的xxx
     -->
    <Child2 :money="moneyFather" @update:money="moneyFather = $event"></Child2>

    <hr/>

    <h2>使用sync修改符</h2>
    <Child2 :money.sync="moneyFather" ></Child2>
    <hr/>

    <h2>使用v-model修改符</h2>
    <Child3 :value="moneyFather" @input="moneyFather = $event"></Child3>
    <hr>
  </div>
</template>

<script type="text/ecmascript-6">
  import Child from './Child.vue'
  import Child2 from './Child2.vue'
  import Child3 from './Child3.vue'
  export default {
    name: 'SyncTest',
    data(){
      return {
        moneyFather:1000
      }
    },
    components: {
      Child,
      Child2,
      Child3
    }
  }
</script>
