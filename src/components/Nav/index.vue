<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
       
      <!-- 嵌套一个外层div,这样子就可以实现全部商品分类和item中不会移出鼠标 -->
      <div @mouseleave="hideFirst" @mouseenter="showFirst">
        <h2 class="all">全部商品分类</h2>
        <transition name="slide">
        <div class="sort" v-show="isShowFirst">
          <!-- 利用事件委派跳转路由 -->
          <div class="all-sort-list2" @click="toSearch">
            <div
              class="item"
              v-for="(c1, index) in baseCategoryList"
              :key="c1.categoryId"
              :class="{ active: currentIndex == index }"
              @mouseenter="showCurrentItem(index)"
            >
              <!-- 一级 -->
              <h3>
                <!-- <a href="">{{c1.categoryName}}</a> -->
                <!-- 声明式导航  过多的组件产生 -->
                <!-- <router-link :to="`/search?categoryName=${c1.categoryName}&category1Id=${c1.categoryId}`">{{c1.categoryName}}</router-link> -->
                <!-- 编程式导航 非委派-->
                <!-- <a href="javascript:;" @click="$router.push(`/search?categoryName=${c1.categoryName}&category1Id=${c1.categoryId}`)">{{ c1.categoryName }}</a> -->
                <a
                  href="javascript:;"
                  :data-categoryname="c1.categoryName"
                  :data-category1Id="c1.categoryId"
                  >{{ c1.categoryName }}</a
                >
              </h3>
              <div class="item-list clearfix">
                <div class="subitem">
                  <dl
                    class="fore"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <!-- 二级 -->
                    <dt>
                      <!-- <a href="">{{c2.categoryName}}</a> -->
                      <!-- 声明式导航  过多的组件产生 -->
                      <!-- <router-link :to="`/search?categoryName=${c2.categoryName}&category2Id=${c2.categoryId}`">{{c2.categoryName}}</router-link> -->
                      <!-- 编程式导航 非委派-->
                      <!-- <a href="javascript:;" @click="$router.push(`/search?categoryName=${c2.categoryName}&category2Id=${c2.categoryId}`)">{{ c2.categoryName }}</a> -->
                      <a
                        href="javascript:;"
                        :data-categoryname="c2.categoryName"
                        :data-category2Id="c2.categoryId"
                        >{{ c2.categoryName }}</a
                      >
                    </dt>
                    <dd>
                      <!-- 三级 -->
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <!-- <a href="">{{c3.categoryName}}</a> -->
                        <!-- 声明式导航  过多的组件产生-->
                        <!-- <router-link :to="`/search?categoryName=${c3.categoryName}&category3Id=${c3.categoryId}`">{{c3.categoryName}}</router-link> -->
                        <!-- 编程式导航 非委派-->
                        <!-- <a href="javascript:;" @click="$router.push(`/search?categoryName=${c3.categoryName}&category3Id=${c3.categoryId}`)">{{ c3.categoryName }}</a> -->
                        <a
                          href="javascript:;"
                          :data-categoryname="c3.categoryName"
                          :data-category3Id="c3.categoryId"
                          >{{ c3.categoryName }}</a
                        >
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
         </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "Nav",
  data() {
    return {
      //当前显示的分类栏
      currentIndex: -2,
      //控制一级分类栏是否显示
      isShowFirst:this.$route.path==="/"
    };
  },
  computed: {
    //获取三级分类 方法1
    // baseCategoryList(){
    //   return this.$store.state.home.baseCategoryList;
    // }
    //获取三级分类 方法2
    // 映射数据
    ...mapState({
      baseCategoryList: (state) => state.home.baseCategoryList,
    }),
  },
  methods: {
    /* 跳转搜索 */
    toSearch(event) {
      //利用data自定义属性
      let { categoryname, category1id, category2id, category3id } = event.target.dataset; //解构赋值
      let query = {};
      //放入查询值
      if (categoryname) {
        query.categoryName = categoryname;
      }
      //判断是哪一个分配查询的
      if (category1id) {
        query.category1Id = category1id;
      } else if (category2id) {
        query.category2Id = category2id;
      } else if (category3id) {
        query.category3Id = category3id;
      }
      let opts={
        name: "search",
        query,
        params:this.$route.params
      };
      //跳转
      if(this.$route.name=="search"){
          this.$router.replace(opts);
        }
      this.$router.push(opts);
      //隐藏
      this.hideFirst();
    },

    /* 显示当前指向的分类列表  */
    // 使用节流,隔一段时间就调用,注意不能使用箭头函数
    showCurrentItem:throttle(function(index){
      if(this.currentIndex!=-2){
        this.currentIndex=index;
      }
    },200),
    
    /* 鼠标进入,显示一级分类 */
    showFirst(){
      this.currentIndex=-1;
      this.isShowFirst=true;
    },
    
    /* 鼠标移出去,隐藏一级分类 */
    hideFirst(){
      if(this.$route.path!=="/"){
        this.isShowFirst=false;
      }
        this.currentIndex=-2; 
    }
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      //这里已经是终点了相当于
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      &.slide-enter,
      &.slide-leave-to{
        opacity: 0;
        height: 0;
      }
      &.slide-enter-active,
      &.slide-leave-active{
        transition: all .3s;
      }

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
          //控制分类列表显示隐藏
          &.active {
            background-color: rgb(139, 134, 134);
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
