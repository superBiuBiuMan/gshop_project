<template>
  <div>
    <!-- 导航栏 -->
    <Nav></Nav>
    <!-- <h1>用户搜索的值:{{this.$route.path}}</h1> -->
    <!--list-content-->
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-if="this.options.categoryName">
              {{ this.options.categoryName }}
              <i @click="removeCategory">×</i>
            </li>
            <li class="with-x" v-if="this.options.keyword">
              {{ this.options.keyword }}
              <i @click="removeKeyword">×</i>
            </li>
            <li class="with-x" v-if="this.options.trademark">
              {{ this.options.trademark }}
              <i @click="removeTrademark">×</i>
            </li>
            <!-- 遍历详细属性 -->
            <li class="with-x" v-for="(el, index) in options.props" :key="el">
              {{ el }}
              <i @click="removeProps(index)">×</i>
            </li>
          </ul>
        </div>
        <!--selector-->
        <SearchSelector
          :setTrademark="setTrademark"
          :setOptionProps="setOptionProps"
        ></SearchSelector>
        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: orderInfo[0] === '1' }">
                  <a href="javascript:;" @click="orderProduct('1')">
                    综合
                    <i
                      v-show="orderInfo[0] === '1'"
                      class="iconfont"
                      :class="orderInfo[1] === 'desc' ? 'icon-down' : 'icon-up'"
                    ></i>
                  </a>
                </li>
                <li :class="{ active: orderInfo[0] === '3' }">
                  <a href="javascript:;">
                    销量
                    <i
                      v-show="orderInfo[0] === '3'"
                      class="iconfont"
                      :class="orderInfo[1] === 'desc' ? 'icon-down' : 'icon-up'"
                    ></i>
                  </a>
                </li>
                <li :class="{ active: orderInfo[0] === '4' }">
                  <a href="javascript:;">
                    新品
                    <i
                      v-show="orderInfo[0] === '4'"
                      class="iconfont"
                      :class="orderInfo[1] === 'desc' ? 'icon-down' : 'icon-up'"
                    ></i>
                  </a>
                </li>
                    <li :class="{ active: orderInfo[0] === '5' }">
                  <a href="javascript:;">
                    评价
                    <i
                      v-show="orderInfo[0] === '5'"
                      class="iconfont"
                      :class="orderInfo[1] === 'desc' ? 'icon-down' : 'icon-up'"
                    ></i>
                  </a>
                </li>
                <li :class="{ active: orderInfo[0] === '2' }">
                  <a href="javascript:;"  @click="orderProduct('2')">
                    价格
                    <i
                      v-show="orderInfo[0] === '2'"
                      class="iconfont"
                      :class="orderInfo[1] === 'desc' ? 'icon-down' : 'icon-up'"
                    ></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 搜索商品的展示 -->
          <div class="goods-list">
            <!-- 事件委派方式添加进购物车 -->
            <ul class="yui3-g" @click="addCart($event)">
              <li class="yui3-u-1-5" v-for="item in goodsList" :key="item.id" :data-id="item.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="'/detail/'+item.id">
                      <!-- 懒加载模式 -->
                      <img v-lazy="item.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ item.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <router-link :to="'/detail/'+item.id">{{item.title}}</router-link>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>{{getRandomIntInclusive(587,2540)}}</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="javascript:;"
                      class="sui-btn btn-bordered btn-danger"
                      data-add="1"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <MyPagination 
          :currentPage="options.pageNo"
          :total="totalPage"
          :showPageNo="5"
          :pageSize="options.pageSize"
          @currentPage="getShopList"
          />
        </div>
        <!--hotsale-->
        <div class="clearfix hot-sale">
          <h4 class="title">热卖商品</h4>
          <div class="hot-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/search/like_01.png" />
                  </div>
                  <div class="attr">
                    <em>Apple苹果iPhone 6s (A1699)</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>4088.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有700人评价</i>
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/search/like_03.png" />
                  </div>
                  <div class="attr">
                    <em>金属A面，360°翻转，APP下单省300！</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>4088.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有700人评价</i>
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/search/like_04.png" />
                  </div>
                  <div class="attr">
                    <em>256SSD商务大咖，完爆职场，APP下单立减200</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>4068.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有20人评价</i>
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/search/like_02.png" />
                  </div>
                  <div class="attr">
                    <em>Apple苹果iPhone 6s (A1699)</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>4088.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有700人评价</i>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SearchSelector from "./SearchSelector";
export default {
  name: "Search",
  components: {
    SearchSelector,
  },
  data() {
    return {
      //要发送的请求
      options: {
        category1Id: "", //一级分类
        category2Id: "", //二级分类
        category3Id: "", //三级分类
        categoryName: "", //分类名称
        keyword: "", //搜索关键字
        props: [], //商品属性的数组: ["属性ID:属性值:属性名"]示例: ["2:6.0～6.24英寸:屏幕尺寸"]
        trademark: "", //品牌: "ID:品牌名称"示例: "1:苹果
        order: "1:desc", //排序 排序方式 1: 综合,2: 价格 asc: 升序,desc: 降序  示例: "1:desc"
        pageNo: 1, //页码
        pageSize: 10, //每页数量
      },
    };
  },
  watch: {
    //监视路由参数的变化
    // $route(toParams,fromParams){
    //   //发生变化,重写并查询
    //    this.updateParams();
    //    this.getShopList();
    // }
    $route: {
      handler(toParams, fromParams) {
        //发生变化,重写并查询
        this.updateParams();
        this.getShopList();
      },
      immediate: true,
    },
  },
  methods: {
    //添加到购物车
      async addCart(event){
      //不为加入购物车按钮
      if(!!!event.target.dataset.add){
        return;
      }
      //加入购物车操作
      let nodeLi = event.target.parentElement?.parentElement?.parentElement;
      if(nodeLi){
        //存在值才操作
        let skuId = nodeLi.dataset.id;//获取商品id
        let skuNum = 1;//商品数量默认为1
        let skuName = nodeLi.querySelector(".attr>a")?.textContent;//商品的名字
        let skuDefaultImg = nodeLi.querySelector(".p-img img")?.src;
         //由于是async所以返回的是promise
          try{
            let result = await this.$store.dispatch("getAddOrUpdateCart",{skuId,skuNum});
            if(result=="OK"){
              this.$message.success({
                message:"添加购物车成功",
                duration:1000
              })
              //跳转
              this.$router.push({
                name:"addcartsuccess",
                query:{
                  skuNum,
                }
              });
              //复杂数据(商品信息)存入sessionStorage - 便于添加购物车成功页面读取
              sessionStorage.setItem("SKUINFO_KEY",JSON.stringify({
                skuDefaultImg,
                skuName,
                id:skuId,
              }));
            }
          }catch(error){
            this.$message.error("添加购物车失败"+error.message);
          }
      }
      // let skuNum = 1//商品数量
      // let skuId = event.target.dataset.id;//商品id
      // console.log(event.target);
      // console.log(skuId);
      // if(!skuId){
      //   return;
      // }
      //由于是async所以返回的是promise
      // try{
      //   let result = await this.$store.dispatch("getAddOrUpdateCart",{skuId,skuNum:1});
      //   if(result=="OK"){
      //     alert("添加购物车成功,开始跳转...");
      //     //跳转
      //     this.$router.push({
      //       name:"addcartsuccess",
      //       query:{
      //         skuNum:this.skuNum
      //       }
      //     });
      //     //复杂数据存入sessionStorage
      //     sessionStorage.setItem("SKUINFO_KEY",JSON.stringify(this.skuInfo));
      //   }
      // }catch(error){
      //   alert("添加购物车失败",error.message);
      // }
    },
    /* 分页器页码发生变化的回调 */
    // currentChange(newPage){
    //   this.options.pageNo=newPage;
    //   this.getShopList();
    // },
    /* 随机数生成 取闭区间[x,y]范围内的数 */
    getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    /* 排序 flage为1或者2*/
    orderProduct(flagAfter){
      //降序升序切换
      let [flagBefore,type]=this.orderInfo;
      if(flagBefore===flagAfter){
        //切换排序方式
        type=type==='desc'?'asc':'desc';
      }else{
        //一个新的类型
        type='desc';
      }
      this.options.order=flagAfter+":"+type;
      //发送请求来更新
      this.getShopList();
    },
    /* 移除详细属性 */
    removeProps(index) {
      this.options.props.splice(index, 1);
      this.getShopList();
    },
    /* 设置品牌属性 */
    setOptionProps(value) {
      //如果已经有的值则不添加进
      if (!this.options.props.includes(value)) {
        this.options.props.push(value);
        //发送请求来更新
        this.getShopList();
        // console.log(this.options.props);
      }
    },
    /* 移除品牌 */
    removeTrademark() {
      //为了及时更新,这里就不用这种了
      // this.options.trademark = "";
      this.$delete(this.options,"trademark");
      this.getShopList();
    },
    /* 更改品牌 trademark */
    setTrademark(trademark) {
      //如果是相同的,就不重新发送ajax请求
      if (this.options.trademark != trademark) {
        //为了及时更新,这里就不用这种了
        // this.options.trademark = trademark;
        this.$set(this.options,"trademark",trademark);
        //重写发送ajax请求
        this.getShopList();
      }
    },
    /* 移除分类 */
    removeCategory() {
      this.options.category1Id = "";
      this.options.category2Id = "";
      this.options.category3Id = "";
      this.options.categoryName = "";
      //重发请求
      // this.getShopList();
      // 通过push  或者 router来更改,这样子地址栏就可以跟着删除了
      this.$router.replace({
        name: "search",
        params: this.$route.params,
      });
    },
    /* 移除查询关键字 */
    removeKeyword() {
      this.options.keyword = "";
      //重发请求
      // this.getShopList();
      //当删除了搜索关键字的时候,搜索框内容也应该被清除
      this.$router.replace({
        name: "search",
        query: this.$route.query,
      });
      //移除搜索框内容
      this.$bus.$emit("clearSearch");
    },
    /* 更新查询参数 */
    updateParams() {
      //获取数据
      let { keyword } = this.$route.params; //获取搜索关键字
      let { category1Id, category2Id, category3Id, categoryName } =
        this.$route.query; //获取搜索参数
      //覆盖
      this.options = {
        ...this.options,
        keyword,
        category1Id,
        category2Id,
        category3Id,
        categoryName,
      };
    },
    /* 发送更新后的查询ajax请求 */
    getShopList(newPage=1) {
      this.options.pageNo=newPage;
      // this.getShopList();
      //发送ajax请求
      this.$store.dispatch("reqSearch", this.options);
    },
  },
  computed: {
    // 为了避免undefined.xxx 出现报错,这里做处理 ,所以mapGetters可以对state数据做处理后返回
    // ...mapState({
    //   goodList:state=>state.search.productList.goodsList
    // })
    ...mapGetters(["goodsList","totalPage"]),
    // 相当于
    // goodsList(){
    //   return this.$store.goodsList
    // }
    /* 返回分割排序方式后的数组 [0]代表序号 [1]代表排序方式 */
    orderInfo() {
      return this.options.order.split(":");
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;
  .py-container {
    width: 1200px;
    margin: 0 auto;
    .bread {
      margin-bottom: 5px;
      overflow: hidden;
      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;
        li {
          display: inline-block;
          line-height: 18px;
          a {
            color: #666;
            text-decoration: none;
            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }
      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;
        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;
          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }
          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;
      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;
        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);
          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;
            li {
              float: left;
              line-height: 18px;
              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }
              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }
      .goods-list {
        margin: 20px 0;
        ul {
          display: flex;
          flex-wrap: wrap;
          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;
            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;
                a {
                  color: #666;
                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }
              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;
                strong {
                  font-weight: 700;
                  i {
                    margin-left: 3px;
                  }
                }
              }
              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                a {
                  color: #333;
                  text-decoration: none;
                }
              }
              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;
                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }
              .operate {
                padding: 12px 15px;
                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }
                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;
                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }
                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;
                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;
        .sui-pagination {
          margin: 18px 0;
          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;
            li {
              line-height: 18px;
              display: inline-block;
              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }
              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }
              &.prev {
                a {
                  background-color: #fafafa;
                }
              }
              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }
              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }
              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }
          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
    .hot-sale {
      margin-bottom: 5px;
      border: 1px solid #ddd;
      .title {
        font-weight: 700;
        font-size: 14px;
        line-height: 21px;
        border-bottom: 1px solid #ddd;
        background: #f1f1f1;
        color: #333;
        margin: 0;
        padding: 5px 0 5px 15px;
      }
      .hot-list {
        padding: 15px;
        ul {
          display: flex;
          li {
            width: 25%;
            height: 100%;
            .list-wrap {
              .p-img,
              .price,
              .attr,
              .commit {
                padding-left: 15px;
              }
              .p-img {
                img {
                  max-width: 100%;
                  vertical-align: middle;
                  border: 0;
                }
              }
              .attr {
                width: 85%;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
              }
              .price {
                font-size: 18px;
                color: #c81623;
                strong {
                  font-weight: 700;
                  i {
                    margin-left: 3px;
                  }
                }
              }
              .commit {
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;
              }
            }
          }
        }
      }
    }
  }
}
</style>
