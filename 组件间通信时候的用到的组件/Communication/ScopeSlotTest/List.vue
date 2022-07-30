<template>
  <div>
    <ul>
      <li v-for="(todo,index) in todos" :key="todo.id">
        <slot name="biubiu" :todo="todo">
          {{todo.text}}
        </slot>
         <slot name="biubiu2" :todo="todo" :index="index">
          {{todo.text}}
        </slot>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'List',
  props:{
    todos:Array
  }
}
</script>

<style lang="less" scoped>

</style>
