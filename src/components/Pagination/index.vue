<template>
  <div class="pagination">
    <button
      :disabled="myCurrentPage === 1"
      @click="setCurrentPage(myCurrentPage - 1)"
    >
      上一页
    </button>
    <!-- start要大于1 -->
    <button v-if="startEnd.start > 1" @click="setCurrentPage(1)">1</button>
    <!-- start要大于2 -->
    <button disabled v-if="startEnd.start > 2">···</button>
    <!-- 
      v-for与v-if的优先级   面试题
      v-for的优先级高, 先执行, 每个遍历都会执行v-if
      1). 将v-if判断的处理放在v-for父标签上: 只需要判断一次(原本是每个遍历的元素都会判断)  ==> 适用于判断与元素无关的情况
      2). 最好使用计算属性来去掉v-if  ===> 减少遍历的次数 ==> 适用于根据元素数据来判断的情况
    -->
    <!-- 
      <span v-if="isShow"> 
        <button v-for="item in startEndArr"  :class="{active: item===myCurrentPage}" @click="setCurrentPage(item)">{{item}}</button>
      </span> 
    -->

    <!-- <button v-for="item in startEnd.end" v-if="item>=startEnd.start" 
      :class="{active: item===myCurrentPage}" @click="setCurrentPage(item)">{{item}}</button> -->

    <button
      v-for="(item, index) in startEndArr"
      :class="{ active: item === myCurrentPage }"
      :key="index"
      @click="setCurrentPage(item)"
    >
      {{ item }}
    </button>

    <button disabled v-if="startEnd.end < totalPages - 1">···</button>
    <button
      v-if="startEnd.end < totalPages"
      @click="setCurrentPage(totalPages)"
    >
      {{ totalPages }}
    </button>
    <button
      :disabled="myCurrentPage === totalPages"
      @click="setCurrentPage(myCurrentPage + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px" disabled>共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "MyPagination",

  props: {
    currentPage: {
      // 当前页码
      type: Number,
      default: 1,
      // required: true
    },
    total: {
      // 总数量
      type: Number,
      default: 0,
      // required: true
    },
    pageSize: {
      // 每页数量
      type: Number,
      default: 10,
    },
    showPageNo: {
      // 连续页码数 (一般是奇数)
      type: Number,
      default: 5,
      validator: function (value) {
        return value % 2 === 1;
      },
    },
  },

  data() {
    return {
      // 将传入当前页码作为内部的当前页码
      myCurrentPage: this.currentPage || 1,
      isShow: true,
    };
  },

  watch: {
    // 当接收到新的currentPage(本质就是Sesarch组件中的options.pageNo变化了)
    currentPage(value) {
      // this.myCurrentPage = this.currentPage
      this.myCurrentPage = value;
    },
  },

  computed: {
    /* 
      总页数
      */
    totalPages() {
      const { total, pageSize } = this; // 31 10 ==> 4
      return Math.ceil(total / pageSize); // 需要向上取整
    },

    /* 
      计算出包含从start到end的数组
      */
    startEndArr() {
      const { start, end } = this.startEnd;
      const arr = [];
      for (let i = start; i <= end; i++) {
        arr.push(i);
      }
      return arr;
    },

    /* 
      计算出连续页码的start和end [3, 7]  {start: 3, end: 7}
      start最小值为1
      end最大值为totalPages
      start到end的数量最大是showPageNo: 
        end = start + showPageNo - 1
        start = end - showPageNo + 1
      */
    startEnd() {
      // 取出依赖(相关)数据
      const { myCurrentPage, showPageNo, totalPages } = this;

      let start, end;
      // 计算产生需要的结果数据
      // 计算start
      /* 
        myCurrentPage, showPageNo, totalPages
          4                 5           8          23[4]56
        */
      start = myCurrentPage - Math.floor(showPageNo / 2); // 4 - 2
      /* 
        myCurrentPage, showPageNo, totalPages
          2                 5           8          1[2]345
        start上面算出的是0, 应该为1
        */
      // 当当前页码比较小时, start值就会小于1, 小于了最小值
      if (start < 1) {
        start = 1;
      }

      // 计算end
      // 根据start和showPageNo来计算end
      /* 
        myCurrentPage, showPageNo, totalPages
          2                 5           8          1[2]345
        start上面算出为1
        */
      end = start + showPageNo - 1; // 1 + 5 - 1

      //  end最大值为totalPages, 如果超过了, 修正为totalPages
      /* 
        myCurrentPage, showPageNo, totalPages
          8                5           9        567[8]9
        start上面算出为 6  ==> 9 - 5 + 1 = 5
        end上面算出为  10  ==> 9
        */
      if (end > totalPages) {
        // 修正end
        end = totalPages;
        // 修正start
        start = end - showPageNo + 1; // 前提是totalPages>=showPageNo
        /* 
          myCurrentPage, showPageNo, totalPages
            4                6           5        123[4]5
          start上面算出为 5 - 6 + 1 = 0
          end上面算出为  5
          */
        // 如果totalPages<showPageNo ==> 上面的计算start是小于1的
        if (start < 1) {
          start = 1;
        }
      }
      // 返回结果数据
      return {
        start,
        end,
      };
    },
  },

  methods: {
    /* 
      设置新的当前页码
      */
    setCurrentPage(page) {
      if (page === this.myCurrentPage) return;
      // 更新内部的当前页码
      this.myCurrentPage = page;
      // 通知父组件当前页码变化了
      this.$emit("currentPage", page);
    },
  },
};
</script>
<style lang="less" scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>