<template>
  <div id="pagination_self"></div>
</template>

<script>
import "./js/paginationself";
export default {
  name: "Pagination",
};
</script>

<style lang="less" scoped>
#pagination_self {
  width: 100%;
  height: 50px;
  border: 1px solid #e5e5e5;
  margin: 20px auto;
  display: flex;
  justify-content: center;
  align-items: center;

  .public {
    border: 1px solid #e5e5e5;
    margin: 0px 5px;
    padding: 5px 5px;
    cursor: pointer;
    min-width: 40px;
    text-align: center;
    background-color: white;
    user-select: none;
  }

  .publichover {
    border: 1px solid #ff4400;
    color: #ff4400;
  }

  /* (可活动) */
  .self-first,
  .self-prev,
  .self-next,
  .self-last {
    &:extend(#pagination_self .public);

    /*鼠标经过首页,上一页,下一页,尾页*/
    &:hover {
      .publichover();
    }
  }

  /*不可活动*/
  .self-first.noactive,
  .self-prev.noactive,
  .self-next.noactive,
  .self-last.noactive {
    color: #cccccc;

    &:hover {
      border: 1px solid #e5e5e5;
    }
  }

  /* 页码样式 */
  .self-list {
    display: flex;
    justify-content: center;
    align-items: center;

    /*普通页码显示样式*/
    p {
      // display: flex;
      // justify-content: center;
      // align-items: center;
      border: 1px solid #e5e5e5;
      margin: 0px 5px;
      padding: 5px 0px;
      color: #3e3e3e;
      background-color: white;
      cursor: pointer;
      text-align: center;
      min-width: 35px;
      user-select: none;

      /*页码鼠标经过页*/
      &:hover {
        .publichover();
      }
    }

    /* 页码活动样式 */
    p.active {
      color: white;
      background-color: #ff4400;
    }
  }

  /* 页码样式 */
  .self-list {
    display: flex;
    justify-content: center;
    align-items: center;

    /*普通页码显示样式*/
    p {
      // display: flex;
      // justify-content: center;
      // align-items: center;
      border: 1px solid #e5e5e5;
      margin: 0px 5px;
      padding: 5px 0px;
      color: #3e3e3e;
      background-color: white;
      cursor: pointer;
      text-align: center;
      min-width: 35px;
      user-select: none;

      /*页码鼠标经过页*/
      &:hover {
        .publichover();
      }
    }

    /* 页码活动样式 */
    p.active {
      color: white;
      background-color: #ff4400;
    }
  }

  /* 页码样式 */
  .self-list {
    display: flex;
    justify-content: center;
    align-items: center;

    /*普通页码显示样式*/
    p {
      // display: flex;
      // justify-content: center;
      // align-items: center;
      border: 1px solid #e5e5e5;
      margin: 0px 5px;
      padding: 5px 0px;
      color: #3e3e3e;
      background-color: white;
      cursor: pointer;
      text-align: center;
      min-width: 35px;
      user-select: none;

      /*页码鼠标经过页*/
      &:hover {
        .publichover();
      }
    }

    /* 页码活动样式 */
    p.active {
      color: white;
      background-color: #ff4400;
    }
  }

  /* 输入框样式 */
  .self-input {
    text-align: center;
    width: 30px;
    padding: 5px 10px;
    outline: none;
  }

  /*按钮样式*/
  button.self-button {
    margin: 0px 5px;
    min-width: 50px;
    padding: 5px 10px;
    background-color: white;
    border: 1px solid #e5e5e5;

    /*鼠标经过按钮*/
    &:hover {
      .publichover();
    }
  }
}
</style>
