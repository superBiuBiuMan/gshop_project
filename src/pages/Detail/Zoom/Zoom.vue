<template>
  <div class="spec-preview">
    <img :src="defaultImage.imgUrl" />
    <div class="event" @mousemove="mouseMove" ref="small"></div>
    <!-- 大图展示 -->
    <div class="big">
      <img :src="defaultImage.imgUrl" ref="bigimg" />
    </div>
    <!-- 遮罩层 -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
//节流阀
import throttle from "lodash/throttle";
export default {
  name: "Zoom",
  //为了避免接收到假报错,应该对接收到的数据进行再一次处理
  props: ["skuImageList"],
  data() {
    return {
      //默认图片索引
      defaultIndex: 0,
    };
  },
  computed: {
    //DOM元素
    bigImg() {
      return this.$refs.bigimg;
    },
    //遮罩层
    mask() {
      return this.$refs.mask;
    },
    //小图div
    small() {
      return this.$refs.small;
    },
    //为了避免接收到假报错,应该对接收到的数据进行再一次处理
    defaultImage() {
      //因为skuImageList[defaultIndex]可能还处于未拿到数据的状态
      return this.skuImageList[this.defaultIndex] || {};
    },
  },
  mounted() {
    //轮播图当中的图片显示被改变了,放大镜也改变
    this.$bus.$on("changeDefaultIndex", this.changeDefaultIndex);
  },
  methods: {
    //移动索引事件
    mouseMove: throttle(function (event) {
      let { bigImg, mask, small } = this;
      let maskX = event.offsetX - mask.clientWidth / 2;
      let maskY = event.offsetY - mask.clientHeight / 2;
      if (maskX <= 0) {
        maskX = 0;
      }
      //大于可移动的空白距离
      else if (maskX >= small.clientWidth - mask.clientWidth) {
        maskX = small.clientWidth - mask.clientWidth;
      }
      if (maskY <= 0) {
        maskY = 0;
      }
      //大于可移动的空白距离
      else if (maskY >= small.clientWidth - mask.clientWidth) {
        maskY = small.clientWidth - mask.clientWidth;
      }
      mask.style.left = maskX + "px";
      mask.style.top = maskY + "px";
      //移动大图位置
      bigImg.style.left = -1 * maskX * 2 + "px";
      bigImg.style.top = -1 * maskY * 2 + "px";
    }, 1000 / 75),
    //改变图片索引
    changeDefaultIndex(newIndex) {
      this.defaultIndex = newIndex;
    },
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>