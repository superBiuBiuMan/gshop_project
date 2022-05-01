<template>
  <div class="register-container">
    <!-- 注册内容 -->
    
    <div class="register">
      <h3>注册新用户
        <span class="go">我有账号，去 <router-link to="/login">登录</router-link>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <input 
           type="text"
           placeholder="请输入你的手机号"
           v-model="phone"
           name="phone"
           v-validate="{ required: true, regex: /^1\d{10}$/ }"
           :class="{ invalid: errors.has('phone') }"
        />
        <span class="error-msg">{{errors.first("phone")}}</span>
        <!-- <input type="text" placeholder="请输入你的手机号" v-model="phone"> -->
        <!-- <span class="error-msg">错误提示信息</span> -->
      </div>
      <div class="content">
        <label>验证码:</label>
        <!-- <input type="text" placeholder="请输入验证码" v-model="code">
        <span class="error-msg">错误提示信息</span> -->
        <input 
           type="text"
           placeholder="请输入验证码"
           v-model="code"
           name="code"
           v-validate="{ required: true, regex: /^\d{6}$/ }"
           :class="{ invalid: errors.has('code') }"
        />
        <span class="error-msg">{{errors.first("code")}}</span>
        <button @click="sendCode" class="codeStyle">获取验证码</button>
        
      </div>
      <div class="content">
        <label>登录密码:</label>
        <!-- <input type="text" placeholder="请输入你的登录密码" v-model="password1">
        <span class="error-msg">错误提示信息</span> -->
        <input 
           type="text"
           placeholder="请输入你的登录密码"
           v-model="password"
           name="password"
           v-validate="{ required: true, regex: /^\w{6,20}$/ }"
           :class="{ invalid: errors.has('password') }"
        />
        <span class="error-msg">{{errors.first("password")}}</span>

      </div>
      <div class="content">
        <label>确认密码:</label>
        <!-- <input type="text" placeholder="请输入确认密码" v-model="password2">
        <span class="error-msg">错误提示信息</span> -->
        <input 
           type="text"
           placeholder="请输入确认密码"
           v-model="password2"
           name="password2"
           v-validate="{ required: true, is: password }"
           :class="{ invalid: errors.has('password2') }"
        />
        <span class="error-msg">{{errors.first("password2")}}</span>
      </div>
      <div class="controls">
        <!-- <input name="m1" type="checkbox" v-model="isSelected"> -->
        <!-- <span class="error-msg">错误提示信息</span> -->

        <!-- <input 
           type="checkbox"
           placeholder="请输入验证码"
           v-model="isSelected"
           name="isCheckRead"
           v-validate="{ required: true, 'agree':true }"
           :class="{ invalid: errors.has('isCheckRead') }"
        /> -->
        <!-- <span class="error-msg">{{errors.first("isCheckRead")}}</span> -->
        <input type="checkbox" v-model="isSelected" name="协议" v-validate="'agree'"/>
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg">{{errors.first("协议")}}</span>
        
      </div>
      <div class="btn">
        <button @click.prevent="register">完成注册</button>
      </div>
    </div>
    
    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Register',
    data(){
      return {
        phone:"",
        code:"",
        password:"",
        password2:"",
        isSelected:true,
      }
    },
    methods:{
      // 发送验证码
      sendCode(){
        let { phone } = this;
        if(phone){
          this.$store.dispatch("sendCode",phone);
        }
      },
      // 单击注册按钮
      async register(){
        const success = await this.$validator.validateAll();//全部表单验证
        if(!success){
          //表单不通过
          return;
        }
        let { phone, code, password, password2 ,isSelected } = this;
        //判断是否输入完整
        if( phone && code && password && password2 && password === password2 && isSelected ){
          try {
              await this.$store.dispatch("sendRegisterInfo",{
                phone,
                code,
                password
              });
              this.$message.success("注册成功!");
              // alert("注册成功!");
              //跳转到登录界面
              this.$router.push("/login");
              // this.phone="";
              // this.code="";
              // this.password="";
              // this.password2="";
          } catch (error) {
            //注册失败提示
            this.$message.error(error.message);
            // alert(error.message);
          }
        }else{
          alert("请输入完整的信息!或者检查是否已经勾选协议条款!");
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .register-container {
    .register {
      width: 1200px;
      height: 445px;
      border: 1px solid rgb(223, 223, 223);
      margin: 0 auto;

      h3 {
        background: #ececec;
        margin: 0;
        padding: 6px 15px;
        color: #333;
        border-bottom: 1px solid #dfdfdf;
        font-size: 20.04px;
        line-height: 30.06px;

        span {
          font-size: 14px;
          float: right;

          a {
            color: #e1251b;
          }
        }
      }

      div:nth-of-type(1) {
        margin-top: 40px;
      }

      .content {
        padding-left: 390px;
        margin-bottom: 18px;
        position: relative;
        //验证码按钮
        .codeStyle{
          height: 36px;
        }
        label {
          font-size: 14px;
          width: 96px;
          text-align: right;
          display: inline-block;
        }

        input {
          width: 270px;
          height: 38px;
          padding-left: 8px;
          box-sizing: border-box;
          margin-left: 5px;
          outline: none;
          border: 1px solid #999;
        }

        img {
          vertical-align: sub;
        }

        .error-msg {
          position: absolute;
          top: 100%;
          left: 495px;
          color: red;
        }
      }

      .controls {
        text-align: center;
        position: relative;

        input {
          vertical-align: middle;
        }

        .error-msg {
          position: absolute;
          top: 100%;
          left: 495px;
          color: red;
        }
      }

      .btn {
        text-align: center;
        line-height: 36px;
        margin: 17px 0 0 55px;

        button {
          outline: none;
          width: 270px;
          height: 36px;
          background: #e1251b;
          color: #fff !important;
          display: inline-block;
          font-size: 16px;
        }
      }
    }

    .copyright {
      width: 1200px;
      margin: 0 auto;
      text-align: center;
      line-height: 24px;

      ul {
        li {
          display: inline-block;
          border-right: 1px solid #e4e4e4;
          padding: 0 20px;
          margin: 15px 0;
        }
      }
    }
  }
</style>