<template>
  <div class="addressmodel-wrap" v-show="isShow">
    <div class="addressmodel" >
        收货人:<input type="text" v-model="addressInfo.consignee"/><br /><br />
        联系电话:<input type="text"  v-model="addressInfo.phoneNum" /><br /><br />
        所在地区:
        <!-- 区域选择框 -->
        <select v-model="addressInfo.regionId">
            <option :value="region.id"  v-for="region in regions" :key="region.id">
                {{region.regionName}}
            </option>
        </select>
        <!-- 省份选择框 -->
        <select class="form-control" v-model="addressInfo.provinceId">
            <option
                v-for="province in provinces"
                :value="province.id"
                :key="province.id"
            >{{province.name}}</option>
        </select>
        <br /><br />
        详细地址:<input type="text"  v-model="addressInfo.userAddress" /><br />
        <!-- 是否默认地址:<input type="checkbox" v-model="addressInfo.isDefault" @click="get"/><br /> -->
        是否默认地址:<input type="checkbox" :checked="addressInfo.isDefault*1"  @click="setDefault"/><br />
        <div class="btnStyle">
            <button style="margin-right:40px" @click="btnConfirm">确认</button>
            <button @click="btnCancel">取消</button>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddressInfoModel",
  data() {
    return {
     addressInfo:{
        //收货人
        consignee: "",
        //联系电话
        phoneNum: "",
        isDefault: "",
        //区域id
        regionId: 1,
        //省份
        provinceId: "",
        //详细地址
        userAddress: "",
     },
    //   //显示隐藏
    //   isShow:false,
      //存储请求获取的区域代码
      regions: [],
      //存储请求获取的省份代码
      provinces: []
    };
  },
  props:{
      //获取从父类传递过来的v-model当中的值
      value:{},
  },
  computed:{
      changAddressInfo(){
          return this.$store.state.trade.changAddress;
      },
      regionId(){
          return this.addressInfo.regionId;
      },
      isShow(){
        return this.value;
      }
  },
  mounted(){
      //获取区域地址
      this.getAddressInfo();
      //获取区域地址对应省份地址信息
      this.reqAddressBaseProvinceByRegionId(this.regionId);
  },
  
  methods:{
      //取消按钮
      btnCancel(){
          //按下取消按钮,触发父类绑定的$on事件
          this.$emit("cancelAddress");
      },    
      //确认按钮
      async btnConfirm(){
          //存在,说明是修改信息
          if(this.$store.state.trade.changAddress.id){
              console.log("修改地址");
              let sendInfo = {
                  ...this.addressInfo,
                  userId:this.$store.state.trade.changAddress.userId,
                  id:this.$store.state.trade.changAddress.id
              }
              let result = await this.$API.reqUpdateUserAddress(sendInfo);
              if(result.code == 200){
                //alert("修改地址信息成功!");
                this.$message.success("修改地址信息成功!");
              }else{
                  console.log("失败"+result.data);
                  
              }
          }else{
            console.log("添加地址");
            this.addressInfo.isDefault = this.addressInfo.isDefault?"1":"0";
            console.log(this.addressInfo.isDefault);
            //判断是否含有空
            try{
                Object.keys(this.addressInfo).forEach((key)=>{
                    if(!this.addressInfo[key]){
                        //含有空值,中断循环
                        throw new Error("有空值");
                    }
                })
                //完整输入
                let result = await this.$API.reqSaveUserAddress(this.addressInfo);
                if(result.code == 200){
                    // alert("添加地址信息成功!");
                    this.$message.success("添加地址信息成功!");
                }else{
                    console.log("失败",result.message);
                }
            }catch(error){
                this.$message.warning("请填写完整的值!")
                //alert("请填写完整的值!");
                return
            }
          }

        //告诉父亲我操作了,//按下确认按钮,触发父类绑定的$on事件
        this.$emit("confirmAddress");
      },
      setDefault(e){
          this.addressInfo.isDefault = e.target.checked ? "1" : "0";
      },
      //获取区域地址对应省份信息
      async reqAddressBaseProvinceByRegionId(regionId){
          let result = await this.$API.reqAddressBaseProvinceByRegionId(regionId);
          if(result.code == 200){
              this.provinces = result.data;
          }else{
            //  alert("获取地址省份信息失败,",result.message)
            this.$message.error("获取地址省份信息失败");
          }
      },
      //获取区域地址
      async getAddressInfo(){
          let result = await this.$API.reqAddressBaseRegion();
          if(result.code == 200){
              this.regions = result.data;
          }else{
              this.$message.error("获取地址区域信息失败!"+result.message);
            //   alert("获取地址区域信息失败,",result.message)
          }
      }
  },
  watch:{
      //监视是否改变
      changAddressInfo:{
          handler(){
           let {consignee,phoneNum,isDefault,regionId,provinceId,userAddress} = this.changAddressInfo;
            this.addressInfo = {
                consignee,
                phoneNum,
                isDefault,
                regionId,
                provinceId,
                userAddress
            }
          },
          deep:true,
      },
      //区域改变
      regionId(){
          if(!this.regionId) return;//防止没有加载完成
          //清空省份地址信息
          this.provinces = [];
          //重新发送获取省份地址的
          this.reqAddressBaseProvinceByRegionId(this.regionId);
      }
  }
};
</script>

<style lang="less" scoped>
.addressmodel-wrap{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    .addressmodel{
        font-size: 15px;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        width: 500px;
        height: 200px;
        padding: 50px 0;
        margin: auto;
        background-color: white;
    }
}



</style>
