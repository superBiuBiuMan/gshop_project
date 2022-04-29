<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="shopCart in shopCartList" :key="shopCart.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="shopCart.isChecked" @click="setCheckCart(shopCart)"/>
          </li>
          <li class="cart-list-con2">
            <img :src="shopCart.imgUrl" />
            <div class="item-msg">
              {{shopCart.skuName}}
            </div>
          </li>
          <li class="cart-list-con4">
            <!-- 商品价格 -->
            <span class="price">{{shopCart.skuPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="changeCartNum(shopCart,true,-1)">-</a>
            <input
              autocomplete="off"
              type="text" 
              :value="shopCart.skuNum"
              @change="changeCartNum(shopCart,false,$event.target.value*1)"
              minnum="1"
              class="itxt"
            />
            <a href="javascript:void(0)" class="plus" @click="changeCartNum(shopCart,true,1)">+</a>
          </li>
          <li class="cart-list-con6">
            <!-- 小计 -->
            <span class="sum">{{shopCart.cartPrice * shopCart.skuNum}}</span>
          </li>
          <li class="cart-list-con7">
            <a href="javascript:;" class="sindelet" @click="deleteOne(shopCart.skuId)">删除</a>
            <!-- <a href="javascript:;" class="sindelet" >删除</a> -->
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" v-model="isCheckedAll"/>
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascript:;" @click="deleteAll">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>{{totalAmount}}</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalAccount}}</i>
        </div>
        <div class="sumbtn">
          <!-- <a class="sum-btn" href="###" target="_blank">结算</a> -->
          <router-link  class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex"
export default {
  name: "ShopCart",
  mounted(){
    this.getShopCartList();
  },
  methods:{
    // 删除所有选中购物车
    async deleteAll(){
      try {
        await this.$store.dispatch("setDeleteCartAll");
        this.getShopCartList();
      } catch (error) {
         alert("删除失败",error.message);
      }
    },
    // 删除单个购物车
    async deleteOne(skuId){
      //接口挂了
      try {
        await this.$store.dispatch("setDeleteCartOne",skuId);
        //重新获取数据
        this.getShopCartList();
      } catch (error) {
        alert("删除失败",error.message);
      }
    },
    // 切换购物车选中状态
    async setCheckCart(shopCart){
      try {
          await this.$store.dispatch("setCheckCart",{
          skuId:shopCart.skuId,
          //真 => 假  假 => 真
          isChecked:shopCart.isChecked?0:1
        });
        //重新获取数据
        this.getShopCartList();
      } catch (error) {
        alert("修改状态发生错误!",error.message);
      }
      
    },
    //对购物车商品数量更改 shopCart修改的商品属性,flag:为真为+,-操作,为假为用户输入操作,endNumber为最终的值
    async changeCartNum(shopCart,flag,endNumber){
        // 变化量
        let changeNumber;
        if(!flag){
          // 为用户输入
          if(endNumber <= 0){
             // 变化量设置为原来数值小1的数,并且是负数,比如10,那么这里的变化量将为-9
            changeNumber = 1 - shopCart.skuNum;
          }else{
            changeNumber = endNumber - shopCart.skuNum;
          }
        }else{
          //判断是否小于0
          if(endNumber<=0){
            // 变化量设置为原来数值小1的数,并且是负数,比如10,那么这里的变化量将为-9
            changeNumber = 1 - shopCart.skuNum;
          }else{
            changeNumber = endNumber;
          }
        }
        console.log(changeNumber);
      //向服务器发送修改购物车数据
      try {
        await this.$store.dispatch("getAddOrUpdateCart",{skuId:shopCart.skuId,skuNum:changeNumber});
      } catch (error) {
        alert("修改购物车数量失败!",error.message);
      }
      //重新获取数据
      this.getShopCartList();
    },
    //发送获取购物车列表
    getShopCartList(){
      this.$store.dispatch("getShopCartList");
    }
  },
  computed:{
    ...mapState({
      //获取购物车列表
      shopCartList:state=>state.shopcart.shopCartList
    }),
    // 是否全部选中
    isCheckedAll:{
      get(){
        if(this.shopCartList.length===0){
          return false;
        }else{
          return this.shopCartList.every(function(item){
            return item.isChecked;
          });
        }
        //或者简写return this.shopCartList.every((item)=>item.isChecked);
      },
      async set(newValue){
        // console.log("isCheckedAll set被调用",newValue);
        //获取返回的结果,注意,此promise不是checkAll当中的promise,知识一个结果
        try{
          // let resultAll = await this.$store.dispatch("checkAll",newValue ? 1 : 0);
          // console.log(resultAll);
          await this.$store.dispatch("checkAll",newValue ? 1 : 0);

          //更新所有状态
          this.getShopCartList();
        }catch(error){
          alert("修改全部选中失败",error.message);
        }
        //为什么单击选择框不会调用这个
        // console.log(newValue);
      }
    },
    //总价
    totalAccount(){
      return this.shopCartList.reduce((prev,shop)=>{
        if(shop.isChecked){
          prev+=(shop.cartPrice * shop.skuNum);
        }
        return prev;
      },0)
    },
    //总商品数量
    totalAmount(){
      return this.shopCartList.reduce((prev,shop)=>{
        if(shop.isChecked){
          prev+=(shop.skuNum);
        }
        return prev;
      },0)
    }
  },

};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          // width: 4.1667%;
          width: 13%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        // .cart-list-con3 {
        //   width: 20.8333%;

        //   .item-txt {
        //     text-align: center;
        //   }
        // }

        .cart-list-con4 {
          // width: 12.5%;
          width: 10%;
        }

        .cart-list-con5 {
          // width: 12.5%;
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          // width: 12.5%;
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          // width: 12.5%;
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>