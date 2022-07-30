<template>
  <div style="background: #ccc; height: 80px;">
    <h2>Event2组件</h2>
    <button>分发自定义click事件</button><br>

    
    <!-- 绑定在html元素上,是DOM事件 -->
    <button @click="$emit('click',10)">分发自定义xxx事件</button><br>
  </div>
</template>
