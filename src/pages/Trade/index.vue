<template>
<div>
  <div class="trade-container">
    <h3 class="title">填写并核对订单信息</h3>
    <div class="content">
      <h5 class="receive">
        收件人信息
        <a href="javascript:;" @click="addAddress">新增收货地址</a>
      </h5>
      <!-- 用户地址信息展示 -->
      <template v-if="userAddressList.length!=0">
        <!-- 存在地址 -->
        <div class="address clearFix" v-for="(userAddress,index) in userAddressList" :key="userAddress.id">
          <span class="username" :class="{selected:userAddress.isDefault == 1}">{{userAddress.consignee}}</span>
          <p @click="changeDefault(userAddress,userAddressList)">
            <span class="s1">{{userAddress.userAddress}}</span>
            <span class="s2">{{userAddress.phoneNum}}</span>
            <span class="s3" v-if="userAddress.isDefault == 1">默认地址</span>
          </p>
          <!-- 地址操作区 -->
          <span class="place" style="float: right;">
            <!-- 通过index可以获取到userAddress.id  -->
            <a href="javascript:;" style="margin-left: 150px; margin-right: 7px;" @click="updateUserAddress(index)">修改</a>
            <el-popconfirm title="确定删除该地址吗?" @confirm="removeUserAddress(userAddress.id)">
              <a href="javascript:;" slot="reference" >删除</a>
            </el-popconfirm>
          </span>
        </div>
      </template>
        <!-- 不存在地址的时候 -->
      <template v-else>
        <div class="no-address">
          <a href="javascript:;" @click="addAddress" >找不到您的地址信息,赶快去添加地址信息吧~</a>
        </div>
      </template>
      <div class="line"></div>
      <h5 class="pay">支付方式</h5>
      <div class="address clearFix">
        <span class="username selected">在线支付</span>
        <span class="username" style="margin-left:5px;">货到付款</span>

      </div>
      <div class="line"></div>
      <h5 class="pay">送货清单</h5>
      <!-- 配送方式 -->
      <div class="way">
        <h5>配送方式</h5>
        <div class="info clearFix">
          <span class="s1">天天快递</span>
          <p>配送时间：预计8月10日（周三）09:00-15:00送达</p>
        </div>
      </div>
      <!-- 商品清单 -->
      <div class="detail">
        <h5>商品清单</h5>
        <ul class="list clearFix" v-for="(detailInfo) in detailArrayList" :key="detailInfo.skuId">
          <li>
            <img :src="detailInfo.imgUrl" alt="" style="width:100px;height:100px">
          </li>
          <li>
            <p>
              {{detailInfo.skuName}}</p>
            <h4>7天无理由退货</h4>
          </li>
          <li>
            <h3>￥{{detailInfo.orderPrice}}</h3>
          </li>
          <li>X1{{detailInfo.skuNum}}</li>
          <li>有货</li>
        </ul>
       
      </div>
      <!-- 留言区 -->
      <div class="bbs">
        <h5>买家留言：</h5>
        <textarea placeholder="建议留言前先与商家沟通确认" class="remarks-cont" v-model="userWant"></textarea>
      </div>
      <div class="line"></div>
      <div class="bill">
        <h5>发票信息：</h5>
        <div>普通发票（电子） 个人 明细</div>
        <h5>使用优惠/抵用</h5>
      </div>
    </div>
    <div class="money clearFix">
      <ul>
        <li>
          <b><i>{{tradeInfo.totalNum}}</i>件商品，总商品金额</b>
          <span>¥{{tradeInfo.totalAmount}}</span>
        </li>
        <li>
          <b>返现：</b>
          <span>0.00</span>
        </li>
        <li>
          <b>运费：</b>
          <span>0.00</span>
        </li>
      </ul>
    </div>
    <div class="trade">
      <div class="price">应付金额:　<span>¥{{tradeInfo.totalAmount}}</span></div>
      <!-- Object.keys(this.defaultUserAddress).length === 0 -->
      <div class="receiveInfo" v-if="Object.keys(this.defaultUserAddress).length !== 0">
        寄送至:
        <span>{{defaultUserAddress.userAddress}}</span>
        收货人：<span>{{defaultUserAddress.consignee}}</span>
        <span>{{defaultUserAddress.phoneNum}}</span>
      </div>
      <div class="receiveInfo" v-else>
        未选择收获地址信息
      </div>
    </div>
    <div class="sub clearFix">
      <a class="subBtn" @click="orderShop">提交订单</a>
    </div>
  </div>
  <!-- 地址编辑  -->
   <AddressInfoModel :controlAddressShow.sync="controlAddressShow" @confirmAddress="clickConfirm"/>
  </div>
</template>

<script>
  import AddressInfoModel from "@/pages/AddressModel";
  import {mapGetters, mapState} from "vuex"
  export default {
    name: 'Trade',
    components:{AddressInfoModel},
    data(){
      return {
        // 用户留言 
        userWant:"",
        //地址信息对话框显示和隐藏
        controlAddressShow:false
      }
    },
    computed:{
      ...mapGetters(["detailArrayList","userAddressList"]),
      ...mapState({
        tradeInfo: state => state.trade.tradeInfo
      }),
      //计算最终确认的用户信息
      defaultUserAddress(){
        return this.userAddressList.find(item => item.isDefault === '1') || {};
      }
    },
    mounted(){
      this.sendTradeInfo();
    },
    methods:{
      // 删除地址
      async removeUserAddress(id){
        // 数据库移除
        let result = await this.$API.reqRemoveUserAddress(id);
        if(result.code == 200){
          //删除地址成功
          this.$message.success("删除地址成功!");
          //刷新界面 后面愿意优化的话可以把获取地址信息和商品信息分离开
          this.sendTradeInfo();
        }else{
          this.$message.error(result.message);
          console.log(result.message,"删除地址失败!");
        }
      },
      // 修改地址
      updateUserAddress(index){
        //获取地址信息
        console.log("用户单击修改地址信息");
        let addInfo = this.userAddressList[index];
        console.log("输出根据索引找到的地址信息",addInfo);
        this.$store.state.trade.changAddress = addInfo;
        //显示弹窗
        this.controlAddressShow = true;
      },
      // 地址弹出框用户单击确定
      clickConfirm(){
        //隐藏弹窗
        this.controlAddressShow=false;
        //刷新界面 后面愿意优化的话可以把获取地址信息和商品信息分离开
        this.sendTradeInfo();
      },
      // 添加地址
      addAddress(){
        this.$store.state.trade.changAddress = {}
        this.controlAddressShow = true;
      },
      // 提交订单
      async orderShop(){
        // 判断是否已经选了地址
        if(Object.keys(this.defaultUserAddress).length === 0){
          //禁止提交数据
          this.$message({
              message: '请选择您的地址后再提交订单',
              type: 'warning'
          });
          return;
        }
        let {tradeNo} = this.tradeInfo;
        let {consignee,phoneNum,userAddress} = this.defaultUserAddress;
        // 提交订单信息
        let infoObj = {
          consignee:consignee,
          consigneeTel:phoneNum,
          deliveryAddress:userAddress,
          paymentWay:"ONLINE",
          orderComment:this.userWant,
          orderDetailList:this.detailArrayList
        }
        try {
          // 提交订单信息
          let result = await this.$API.reqOrderInfo(tradeNo,infoObj);
          if(result.code == 200){
            //提交订单成功
            this.$message.success("提交订单成功!");
            //跳转,附带orderId 订单号
            this.$router.push("/pay?orderNo="+result.data);
          }else{
            //不能重复提交订单 status依旧为201!!!
            this.$message.warning(result.message);
          }
        } catch (error) {
          //提交订单失败
          this.$message.warning(error);
          console.log(error);
        }
        
      },
      // 改变默认地址
      changeDefault(userAddress,userAddressList){
        //传入引用数据类型,然后
        userAddressList.forEach(item => item.isDefault = '0');//其他设置为未选中
        userAddress.isDefault = '1';//设置为默认地址
      },
      //获取信息
      sendTradeInfo(){
        this.$store.dispatch("getTradeInfo");
      }
    },
  }
</script>

<style lang="less" scoped>
  .trade-container {
    .title {
      width: 1200px;
      margin: 0 auto;
      font-size: 14px;
      line-height: 21px;
    }
    //没有地址时候的css
    .no-address{
      text-align: center;
      margin: 15px 0;
      a{
        font-size: 16px;
      }
    }
    .content {
      width: 1200px;
      margin: 10px auto 0;
      border: 1px solid rgb(221, 221, 221);
      padding: 25px;
      box-sizing: border-box;

      .receive,
      .pay {
        line-height: 36px;
        margin: 18px 0;
      }

      .receive{
        a{
          font-size: 12px;
          float: right;
          &:hover{
            color: #4cb9fc;
            text-decoration: underline;
          }
        }
      }


      .address {
        padding-left: 20px;
        margin-bottom: 15px;

        .username {
          float: left;
          width: 100px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          border: 1px solid #ddd;
          position: relative;
        }

        .username::after {
          content: "";
          display: none;
          width: 13px;
          height: 13px;
          position: absolute;
          right: 0;
          bottom: 0;
          background: url(./images/choosed.png) no-repeat;
        }

        .username.selected {
          border-color: #e1251b;
        }

        .username.selected::after {
          display: block;
        }

        p {
          width: 610px;
          float: left;
          line-height: 30px;
          margin-left: 10px;
          padding-left: 5px;
          cursor: pointer;

          .s1 {
            float: left;

          }

          .s2 {
            float: left;
            margin: 0 5px;
          }

          .s3 {
            float: left;
            width: 56px;
            height: 24px;
            line-height: 24px;
            margin-left: 10px;
            background-color: #878787;
            color: #fff;
            margin-top: 3px;
            text-align: center;
          }
        }

        p:hover {
          background-color: #ddd;
        }
      }

      .line {
        height: 1px;
        background-color: #ddd;
      }

      .way {
        width: 1080px;
        height: 110px;
        background: #f4f4f4;
        padding: 15px;
        margin: 0 auto;

        h5 {
          line-height: 50px;
        }

        .info {
          margin-top: 20px;

          .s1 {
            float: left;
            border: 1px solid #ddd;
            width: 120px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            margin-right: 10px;
          }

          p {
            line-height: 30px;
          }
        }
      }

      .detail {
        width: 1080px;

        background: #feedef;
        padding: 15px;
        margin: 2px auto 0;

        h5 {
          line-height: 50px;
        }

        .list {
          display: flex;
          justify-content: space-between;

          li {
            line-height: 30px;

            p {

              margin-bottom: 20px;
            }

            h4 {
              color: #c81623;
              font-weight: 400;
            }

            h3 {

              color: #e12228;
            }
          }
        }
      }

      .bbs {
        margin-bottom: 15px;

        h5 {
          line-height: 50px;
        }

        textarea {
          width: 100%;
          border-color: #e4e2e2;
          line-height: 1.8;
          outline: none;
          resize: none;
        }
      }

      .bill {
        h5 {
          line-height: 50px;
        }

        div {
          padding-left: 15px;
        }
      }
    }

    .money {
      width: 1200px;
      margin: 20px auto;

      ul {
        width: 220px;
        float: right;

        li {
          line-height: 30px;
          display: flex;
          justify-content: space-between;

          i {
            color: red;
          }
        }
      }
    }

    .trade {
      box-sizing: border-box;
      width: 1200px;
      padding: 10px;
      margin: 10px auto;
      text-align: right;
      background-color: #f4f4f4;
      border: 1px solid #ddd;

      div {
        line-height: 30px;
      }

      .price span {
        color: #e12228;
        font-weight: 700;
        font-size: 14px;
      }

      .receiveInfo {
        color: #999;
      }
    }

    .sub {
      width: 1200px;
      margin: 0 auto 10px;

      .subBtn {
        float: right;
        width: 164px;
        height: 56px;
        font: 700 18px "微软雅黑";
        line-height: 56px;
        text-align: center;
        color: #fff;
        background-color: #e1251b;

      }
    }

  }
</style>