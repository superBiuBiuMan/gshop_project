<template>
  <div class="pay-main">
    <div class="pay-container">
      <div class="checkout-tit">
        <h4 class="tit-txt">
          <span class="success-icon"></span>
          <span class="success-info">订单提交成功，请您及时付款，以便尽快为您发货~~</span>
        </h4>
        <div class="paymark">
          <span class="fl">请您在提交订单<em class="orange time">4小时</em>之内完成支付，超时订单会自动取消。订单号：<em>{{orderNo}}</em></span>
          <span class="fr"><em class="lead">应付金额：</em><em class="orange money">￥{{orderInfo.totalFee}}</em></span>
        </div>
      </div>
      <div class="checkout-steps">
        <div class="step-tit">
          <h5>支付平台</h5>
        </div>
        <div class="step-cont">
          <ul class="payType">
            <li><img src="./images/pay2.jpg"></li>
            <li style="position:relative;" class="check"><img src="./images/pay3.jpg" ></li>
          </ul>

        </div>
        <div class="hr"></div>

        <div class="payshipInfo">
          <div class="step-tit">
            <h5>支付网银</h5>
          </div>
          <div class="step-cont">
            <ul class="payType">
              <li><img src="./images/pay10.jpg"></li>
              <li><img src="./images/pay11.jpg"></li>
              <li><img src="./images/pay12.jpg"></li>
              <li><img src="./images/pay13.jpg"></li>
              <li><img src="./images/pay14.jpg"></li>
              <li><img src="./images/pay15.jpg"></li>
              <li><img src="./images/pay16.jpg"></li>
              <li><img src="./images/pay17.jpg"></li>
              <li><img src="./images/pay18.jpg"></li>
              <li><img src="./images/pay19.jpg"></li>
              <li><img src="./images/pay20.jpg"></li>
              <li><img src="./images/pay21.jpg"></li>
              <li><img src="./images/pay22.jpg"></li>

            </ul>
          </div>

        </div>
        <div class="hr"></div>

        <div class="submit">
          <!-- <router-link class="btn" to="/paysuccess">立即支付</router-link> -->
          <a class="btn" @click="payMoney">立即支付</a>
        </div>
        <div class="otherpay">
          <div class="step-tit">
            <h5>其他支付方式</h5>
          </div>
          <div class="step-cont">
            <span><a href="weixinpay.html" target="_blank">微信支付</a></span>
            <span>中国银联</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import QRCode from 'qrcode'
  export default {
    name: 'Pay',
    data(){
      return {
        //后期需要根据orderNo生成支付二维码
        orderNo:"",
        orderInfo:{},
        //定时器
        timer:"",
        //支付状态
        payStatu:0
      }
    },
    beforeMount(){
      //获取订单编号
      this.orderNo = this.$route.query.orderNo;
    },
    mounted(){
      //do something
      this.getOrderInfo();
    },
    methods:{
      // 获取微信二维码
      async payMoney(){
        //使用node-qrcode插件生成二维码
          //产生二维码
          const imgUrl = await QRCode.toDataURL(this.orderInfo.codeUrl);
          //弹出二维码支付弹窗
          this.$alert(`<img src="${imgUrl}" style="height:150px;" />`, '请用微信扫码支付', {
            dangerouslyUseHTMLString: true,
            //关闭关闭按钮的显示
            showClose:false,
            //显示取消按钮
            showCancelButton:true,
            //取消按钮文本
            cancelButtonText:"支付遇到问题",
            //确认按钮文本
            confirmButtonText:"我已成功支付",
            //居中显示
            center:true,
            // 关闭前的回调(也就是用户单击确认和取消按钮,使得消息框消失之前的回调)
            beforeClose: (action, instance, done)=>{
              //action 的值为'confirm', 'cancel'或'close'；
              //done 用于关闭 MessageBox 实例
              if(action == 'confirm'){
                // 用户单击确认键
                 clearInterval(this.timer);
                 this.timer = null;
                 this.$router.push("/paysuccess");
                 done();
              }else if (action == 'cancel'){
                this.$message({
                  message:"请联系客服小姐姐解决~",
                  type:"warning"
                });
              }
            },
          });
          //开始轮询
          if(!this.timer){
            this.timer = setInterval(async () => {
                let result = await this.$API.queryPayStatus(this.orderNo)
                if(result.code == 200){
                  //说明支付成功了
                  //清除定时器
                  clearInterval(this.timer);
                  //置空timer
                  this.timer = null;
                  //更改支付状态记录表  
                  this.payStatu = result.code;
                  //关闭信息弹窗
                  this.$msgbox.close();
                  //跳转路由
                  this.$router.push("/paysuccess");
                }
            }, 2000);
          }
      },
      // 获取订单信息
      async getOrderInfo(){
        let result = await this.$API.reqPayInfo(this.orderNo);
        if(result.code == 200){
          //支付成功
          this.orderInfo = result.data;
        }else{
          this.$message.error(result.message);
          // alert(result.message);
        }
      }
    },

  }
</script>

<style lang="less" scoped>
  .pay-main {
    margin-bottom: 20px;
    //选择的支付状态
    .check::after{
      // content:url("./images/check.png");
      content: "";
      background-image: url("./images/check.png");
      background-size: 48px 48px;
      position: absolute;
      bottom: -5px;
      right: -5px;
      width: 48px;
      height: 48px;
    } 
    .pay-container {
      margin: 0 auto;
      width: 1200px;

      a:hover {
        color: #4cb9fc;
      }

      .orange {
        color: #e1251b;
      }

      .money {
        font-size: 18px;
      }

      .zfb {
        color: #e1251b;
        font-weight: 700;
      }

      .checkout-tit {
        padding: 10px;

        .tit-txt {
          font-size: 14px;
          line-height: 21px;

          .success-icon {
            width: 30px;
            height: 30px;
            display: inline-block;
            background: url(./images/icon.png) no-repeat 0 0;
          }

          .success-info {
            padding: 0 8px;
            line-height: 30px;
            vertical-align: top;
          }
        }

        .paymark {
          overflow: hidden;
          line-height: 26px;
          text-indent: 38px;

          .fl {
            float: left;
          }

          .fr {
            float: right;

            .lead {
              margin-bottom: 18px;
              font-size: 15px;
              font-weight: 400;
              line-height: 22.5px;
            }
          }
        }
      }

      .checkout-info {
        padding-left: 25px;
        padding-bottom: 15px;
        margin-bottom: 10px;
        border: 2px solid #e1251b;

        h4 {
          margin: 9px 0;
          font-size: 14px;
          line-height: 21px;
          color: #e1251b;
        }

        ol {
          padding-left: 25px;
          list-style-type: decimal;
          line-height: 24px;
          font-size: 14px;
        }

        ul {
          padding-left: 25px;
          list-style-type: disc;
          line-height: 24px;
          font-size: 14px;
        }
      }

      .checkout-steps {
        border: 1px solid #ddd;
        padding: 25px;

        .hr {
          height: 1px;
          background-color: #ddd;
        }

        .step-tit {
          line-height: 36px;
          margin: 15px 0;
        }

        .step-cont {
          margin: 0 10px 12px 20px;

          ul {
            font-size: 0;

            li {
              margin: 2px;
              display: inline-block;
              padding: 5px 20px;
              border: 1px solid #ddd;
              cursor: pointer;
              line-height: 18px;
            }
          }
        }
      }

      .submit {
        text-align: center;

        .btn {
          display: inline-block;
          padding: 15px 45px;
          margin: 15px 0 10px;
          font: 18px "微软雅黑";
          font-weight: 700;
          border-radius: 0;
          background-color: #e1251b;
          border: 1px solid #e1251b;
          color: #fff;
          text-align: center;
          vertical-align: middle;
          cursor: pointer;
          user-select: none;
          text-decoration: none;
        }
      }
    }
  }
</style>