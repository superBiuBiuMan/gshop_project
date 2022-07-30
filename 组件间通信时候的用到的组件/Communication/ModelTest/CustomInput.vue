<template>
  <div style="background: #ccc; height: 50px;">
    <h2>input包装组件</h2>
    <!-- 绑定从父亲传递过来的参数 并且绑定原生DOM事件@input,功能为$emit -->
    <input type="text" :value="value" @input="$emit('input',$event.target.value) "/>
    <span>{{ value }}</span>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'CustomInput',
    // 接收从父亲传递过来的:value="msg"的值
    props:["value"]
  }
</script>
