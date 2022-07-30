<template>
  <div>
    <h2>深入v-model</h2>
    <!-- html标签的v-model  普通写法-->
    <input type="text" v-model="msg" />
    <span>{{ msg }}</span>
    <br />
    <br />

    <!-- html标签的v-model  拆解写法 等同于上方的 v-model -->
    <input type="text" :value="msg1" @input="msg1 = $event.target.value" />
    <span>{{ msg1 }}</span>
    <br />
    <br />

    <!-- 组件的v-model的实现 :value="msg2" 相当于父亲传递值给儿子,儿子使用props接收 -->
    <!-- 并且传递自定义事件@input  ,并且$event在自定义事件当中代表子组件$emit传递过来的数据-->
    <CustomInput :value="msg2" @input="msg2 = $event"></CustomInput>
    
    <!-- 上面一行代码等同于下面一行代码  -->
    <CustomInput :value="msg2" @input="test1"></CustomInput>
    <br />
    <br />

    <!-- 自定义组件简写 -->
    <CustomInput v-model="msg3"></CustomInput>

    <!-- 说通俗点就是 v-model向自定义组件传递的数据最终自定义组件可以通过 props:["value"] 来接收
        但是要实现数据绑定,依旧要在自定义组件当中做处理,而不能直接像标签一样不做处理就可以实现
    -->
  </div>
</template>

<script type="text/ecmascript-6">
import CustomInput from "./CustomInput.vue";
export default {
  name: "ModelTest",
  methods:{
    test1(valueData){
      this.msg2 = valueData;
    }
  },
  data() {
    return {
      msg: "李白0",
      msg1: "李白1",
      msg2: "李白2",
      msg3: "李白3",
    };
  },
  components: {
    CustomInput,
  },
};
</script>
