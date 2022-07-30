<template>

  <div class="addressmodel-wrap" v-show="controlAddressShow">
    <el-dialog
      :title="changAddressInfo.id?'请修改您的地址信息':'请添写您的收货地址'"
      :visible.sync="controlAddressShow"
      center
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close	= "false"
      :modal="false"
      @open="handleOpen"
    >
      <!-- :model="form" -->
      <el-form>
        <el-form-item label="收货人:" :label-width="formLabelWidth">
          <el-input
            autocomplete="off"
            v-model="addressInfo.consignee"
            class="input-item"
          ></el-input>
        </el-form-item>

        <el-form-item label="联系电话:" :label-width="formLabelWidth">
          <el-input
            autocomplete="off"
            v-model="addressInfo.phoneNum"
            class="input-item"
          ></el-input>
        </el-form-item>

        <el-form-item label="所在地区:" :label-width="formLabelWidth">
          <!-- 华北,华中等 -->
          <el-select
            placeholder="请选择所在区域"
            v-model="addressInfo.regionId"
          >
            <el-option
              :label="area.regionName"
              :value="area.id"
              v-for="area in regions"
              :key="area.id"
            ></el-option>
          </el-select>
          <!-- 所属省份 -->
          <el-select placeholder="请选择省份" v-model="addressInfo.provinceId">
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="item in provinces"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="详细地址:" :label-width="formLabelWidth">
          <el-input
            autocomplete="off"
            v-model="addressInfo.userAddress"
            class="input-item special"
          ></el-input>
        </el-form-item>

        <el-form-item label="是否设为默认地址:" :label-width="formLabelWidth">
          <el-checkbox v-model="addressInfo.isDefault"></el-checkbox>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- @click="dialogFormVisible = false" -->
        <el-button @click="btnConfirm" type="primary">确 定</el-button>
        <el-button @click="btnCancel">取 消</el-button>
        <!-- @click="dialogFormVisible = false" -->
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "AddressInfoModel",
  data() {
    return {
      addressInfo: {
        //收货人
        consignee: "",
        //联系电话
        phoneNum: "",
        // 是否设置默认地址
        isDefault: false,
        //区域id
        regionId: "",
        //省份
        provinceId: "",
        //详细地址
        userAddress: "",
      },
      //文本提示的长度
      formLabelWidth: "130px",
      //存储请求获取的区域代码
      regions: [],
      //存储请求获取的省份代码
      provinces: [],
    };
  },
  props: {
    controlAddressShow: Boolean,
    clickConfirm: Function,
  },
  computed: {
    // 如果是修改地址,则该项会有值
    ...mapState({
      changAddressInfo: (state) => state.trade.changAddress,
    }),
    // 区域id
    regionId() {
      return this.addressInfo.regionId;
    },
  },
  mounted() {
    //初始化获取区域地址
    this.getAddressInfo();
  },
  methods: {
    //阻止默认行为-滚动条的
    preventDefault(e){
      e.preventDefault();
    },
    //阻止默认行为-滚动条的
    preventDefaultForScrollKeys(e) {
      const keys = { 37: 1, 38: 1, 39: 1, 40: 1 };
      if (keys[e.keyCode]) {
        this.preventDefault(e);
        return false;
      }
    },
    //禁用滚动条
    forbiddenScroll(){
      let supportsPassive = false;
        try {
          window.addEventListener("test", null, Object.defineProperty({}, "passive", {
              get: function () {
                supportsPassive = true;
              },
            })
          );
        } catch (e) {}
        let wheelOpt = supportsPassive ? { passive: false } : false;
        let wheelEvent = "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";
        window.addEventListener("DOMMouseScroll", this.preventDefault, false); // older FF
        window.addEventListener(wheelEvent, this.preventDefault, wheelOpt); // modern desktop
        window.addEventListener("touchmove", this.preventDefault, wheelOpt); // mobile
        window.addEventListener("keydown", this.preventDefaultForScrollKeys, false);
    },
    //启用滚动条
    enableScroll(){
        let supportsPassive = false;
        try {
          window.addEventListener("test", null, Object.defineProperty({}, "passive", {
              get: function () {
                supportsPassive = true;
              },
            })
          );
        } catch (e) {}
        let wheelOpt = supportsPassive ? { passive: false } : false;
        let wheelEvent = "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";
        // call this to Enable
        window.removeEventListener("DOMMouseScroll", this.preventDefault, false);
        window.removeEventListener(wheelEvent, this.preventDefault, wheelOpt);
        window.removeEventListener("touchmove", this.preventDefault, wheelOpt);
        window.removeEventListener("keydown", this.preventDefaultForScrollKeys, false);
    },
    //处理dialog打开
    handleOpen(){
      //禁用滚动条
      this.forbiddenScroll();
    },
    //取消按钮
    btnCancel() {
      //启用滚动条
      this.enableScroll();
      //按下取消按钮,触发父类绑定的$on事件
      this.$emit("update:controlAddressShow", false);
    },
    //确认按钮
    async btnConfirm() {
      if (this.changAddressInfo.id) {
        //存在,说明是修改地址信息
        this.updateAddress();
      } else {
        //说明是添加地址
        this.addAddress();
      }
      //启动滚动条
      this.enableScroll();
      //告诉父亲我操作了
      this.$emit("confirmAddress");
    },
    //添加地址
    async addAddress() {
      this.addressInfo.isDefault = this.addressInfo.isDefault ? "1" : "0"; //是否勾选默认地址,勾选了则为1,没有则为0;
      //判断是否含有空
      try {
        //完整输入
        let result = await this.$API.reqSaveUserAddress(this.addressInfo);
        if (result.code == 200) {
          this.$message.success("添加地址信息成功!");
        } else {
          this.$message.warning("添加地址失败");
          console.log(result);
        }
      } catch (error) {
        this.$message.warning("请填写完整的值!");
      }
    },
    //修改地址
    async updateAddress() {
      this.addressInfo.isDefault = this.addressInfo.isDefault ? "1" : "0"; //是否勾选默认地址,勾选了则为1,没有则为0;
      let sendInfo = {
        ...this.addressInfo,
        userId: this.changAddressInfo.userId,
        id: this.changAddressInfo.id,
      };
      let result = await this.$API.reqUpdateUserAddress(sendInfo);
      if (result.code == 200) {
        this.$message.success("修改地址信息成功!");
      } else {
        this.$message.success("修改失败!");
        console.log(result);
      }
    },
    //获取区域地址对应省份信息
    async reqAddressBaseProvinceByRegionId(regionId) {
      let result = await this.$API.reqAddressBaseProvinceByRegionId(regionId);
      if (result.code == 200) {
        this.provinces = result.data;
      } else {
        //  alert("获取地址省份信息失败,",result.message)
        this.$message.error("获取地址省份信息失败");
      }
    },
    //获取区域地址
    async getAddressInfo() {
      let result = await this.$API.reqAddressBaseRegion();
      if (result.code == 200) {
        this.regions = result.data;
      } else {
        this.$message.error("获取地址区域信息失败!" + result.message);
        //   alert("获取地址区域信息失败,",result.message)
      }
    },
  },
  watch: {
    //当为修改地址的时候,为执行到这里
    changAddressInfo: {
      handler() {
        let {
          consignee,
          phoneNum,
          isDefault,
          regionId,
          provinceId,
          userAddress,
        } = this.changAddressInfo;
        this.addressInfo = {
          consignee,
          phoneNum,
          isDefault: isDefault === "1",
          regionId,
          provinceId,
          userAddress,
        };
      },
      deep: true,
    },
    //区域改变
    regionId() {
      if (!this.regionId) return; //防止没有加载完成
      //清空省份地址信息
      this.provinces = [];
      //清除选择的省份
      // this.addressInfo.provinceId = "";
      //重新发送获取省份地址的
      this.reqAddressBaseProvinceByRegionId(this.regionId);
    },
  },
};
</script>

<style lang="less" scoped>
.addressmodel-wrap {
  // 模态框,element-ui的在这里有点bug
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.3);
  .el-dialog__wrapper{
    width: 100%;
    height: 100%;
  }
  .input-item {
    width: 300px;
    height: 20px;
    &.special {
      width: 400px;
    }
  }
}
</style>
