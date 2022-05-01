<template>
  <div class="order-right">
    <div class="order-content">
      <div class="title">
        <h3>我的订单</h3>
      </div>
      <div class="chosetype">
        <table>
          <thead>
            <tr>
              <th width="29%">商品</th>
              <th width="31%">订单详情</th>
              <th width="13%">收货人</th>
              <th>金额</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="orders">
        <table class="order-item" v-for="shopInfo in records" :key="shopInfo.id">
          <!-- 订单头部 -->
          <thead>
            <tr>
              <th colspan="5">
                <span class="ordertitle"
                  >{{shopInfo.createTime}}　订单编号：{{shopInfo.outTradeNo}}
                  <span class="pull-right delete"
                    ><img src="./images/delete.png" /></span
                ></span>
              </th>
            </tr>
          </thead>
          
          <!-- 订单详细信息 -->
          <tbody>
            <tr v-for="(shopDetailInfo,index) in shopInfo.orderDetailList" :key="shopDetailInfo.id">
              <td width="60%">
                <div class="typographic">
                  <img :src="shopDetailInfo.imgUrl" style="height:100px;height:80px" />
                  <a href="#" class="block-text">
                    包邮 {{shopDetailInfo.skuName}}
                  </a>
                  <span>x{{shopDetailInfo.skuNum}}</span>
                  <a href="#" class="service">售后申请</a>
                </div>
              </td>
              <template v-if="index ==0 ">
              <td :rowspan="shopInfo.orderDetailList.length" width="8%" class="center">{{shopInfo.consignee}}</td>
              <td :rowspan="shopInfo.orderDetailList.length" width="13%" class="center">
                <ul class="unstyled">
                  <li>总金额¥{{shopInfo.totalAmount}}</li>
                  <li>{{shopInfo.paymentWay == "ONLINE" ? "在线支付":"货到付款"}}</li>
                </ul>
              </td>
              <td :rowspan="shopInfo.orderDetailList.length" width="8%" class="center">
                <a href="#" class="btn">{{shopInfo.orderStatusName}} </a>
              </td>
              <td :rowspan="shopInfo.orderDetailList.length" width="13%" class="center">
                <ul class="unstyled">
                  <li>
                    <a href="mycomment.html" target="_blank">评价|晒单</a>
                  </li>
                </ul>
              </td>
              </template>
            </tr>
       
          </tbody>
        </table>

      </div>
      <!-- 分页器 -->
      <div class="choose-order">
        <!-- element-ui分页器 -->
        <!-- total 数据总数 -->
        <!-- current-page 当前页 可以通过@current-change来获取用户单击的页码数 -->
        <!-- layout 布局方式 -->
        <!-- pager-count	连续页码数(每页的按钮数) -->
        <!-- page-size 每一页的显示的数据数量是多少个  要在page-sizes当中找到对应值才可以设置成功! -->
        <!-- page-sizes 下拉列表框选择每一个显示的数据量的值,要通过回调函数 @size-change来获取选择的size-->
       <el-pagination
        :total="total"
        :current-page="page"
        layout="prev,pager,next,jumper,->,sizes,total"
        :page-size="limit"
        :page-sizes="[3,6,9,12]"
        :pager-count="7"
        @current-change="getMyOrderInfo"
        @size-change="changeLimitSize"
       ></el-pagination>

        <!-- 自定义分页器 -->
        <!-- <MyPagination
          :currentPage="page"
          :total="total"
          :showPageNo="5"
          :pageSize="limit"
          @currentPage="getMyOrderInfo"
        /> -->
      </div>
    </div>
    <!--猜你喜欢-->
    <div class="like">
      <h4 class="kt">猜你喜欢</h4>
      <ul class="like-list">
        <li class="likeItem">
          <div class="p-img">
            <img src="./images/itemlike01.png" />
          </div>
          <div class="attr">
            <em>DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</em>
          </div>
          <div class="price">
            <em>¥</em>
            <i>3699.00</i>
          </div>
          <div class="commit">已有6人评价</div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="./images/itemlike02.png" />
          </div>
          <div class="attr">Apple苹果iPhone 6s/6s Plus 16G 64G 128G</div>
          <div class="price">
            <em>¥</em>
            <i>4388.00</i>
          </div>
          <div class="commit">已有700人评价</div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="./images/itemlike03.png" />
          </div>
          <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</div>
          <div class="price">
            <em>¥</em>
            <i>4088.00</i>
          </div>
          <div class="commit">已有700人评价</div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="./images/itemlike04.png" />
          </div>
          <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</div>
          <div class="price">
            <em>¥</em>
            <i>4088.00</i>
          </div>
          <div class="commit">已有700人评价</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyOrder",
  data(){
    return {
      page:1,
      limit:3,
      records:[],
      total:0
    }
  }, 
  mounted(){
    this.getMyOrderInfo();  
  },
  methods:{
    // 改变每一页显示的数据
    changeLimitSize(size){
      this.limit = size;
      // this.getMyOrderInfo(this.page);
      this.getMyOrderInfo();
    },
    // 获取我的订单信息
    async getMyOrderInfo(page=1){
      this.page=page;
      let result = await this.$API.reqMyOrderInfo(this.page,this.limit)
      if(result.code == 200){
        this.records = result.data.records;
        this.total = result.data.total;
      }else{
        this.$message.warning(result.message);
        // alert(result.message);
        this.$router.push("/login");
      }
    }
  }
};
</script>

<style lang="less" scoped>
//右边
.order-right {
  float: right;
  width: 83.33%;

  //订单部分
  .order-content {
    margin: 0 20px;
    color: #666;

    //标题
    .title {
      margin-bottom: 22px;
      border: 1px solid #ddd;

      h3 {
        padding: 12px 10px;
        font-size: 15px;
        background-color: #f1f1f1;
      }
    }

    //表头
    .chosetype {
      margin-bottom: 15px;
      color: #666;

      table {
        border: 1px solid #e6e6e6;
        border-collapse: separate;
        border-radius: 2px;
        width: 100%;
        max-width: 100%;
        border-spacing: 0;

        th {
          padding: 6px 8px;
          color: #666;
          font-weight: 700;
          vertical-align: bottom;
          background-color: #f4f4f4;
          line-height: 18px;
          border-bottom: 1px solid #e6e6e6;
          font-size: 12px;
          text-align: left;
        }
      }
    }

    // 表单内容
    .orders {
      font-size: 12px;

      a {
        &:hover {
          color: #4cb9fc;
        }
      }

      table {
        border: 1px solid #e6e6e6;
        border-collapse: collapse;
        border-radius: 2px;
        width: 100%;
        margin-bottom: 18px;
        max-width: 100%;

        th {
          padding: 6px 8px;
          line-height: 18px;
          text-align: left;
          vertical-align: bottom;
          background-color: #f4f4f4;
          font-size: 12px;
          color: #666;

          .pull-right {
            float: right;
            cursor: pointer;

            img {
              margin-right: 10px;
              vertical-align: middle;
            }
          }
        }

        td {
          font-size: 12px;
          color: #666;
          padding: 6px 8px;
          line-height: 18px;
          text-align: left;
          vertical-align: middle;
          border: 1px solid #e6e6e6;

          &.center {
            text-align: center;
          }

          .typographic {
            img {
              float: left;
              margin-right: 10px;
            }

            a {
              float: left;
              min-width: 80px;
              max-width: 250px;
              color: #e1251b;

              &.service {
                color: #666;
              }
            }

            span {
              float: left;
              min-width: 80px;
              max-width: 250px;
              text-align: center;
            }
          }
        }
      }
    }

    // 分页
    .choose-order {
      .pagination {
        margin: 38px 0;

        ul {
          font-size: 0;
          display: inline-block;

          li {
            display: inline-block;
            padding: 4px 9px;
            font-size: 14px;
            border: 1px solid #e0e9ee;

            &.prev,
            &.next {
              background-color: #fafafa;
            }

            &.prev {
              border-right-color: #28a3ef;
            }

            &.page {
              border-color: #28a3ef;
              border-left: 0;

              &.actived {
                background-color: #28a3ef;

                a {
                  color: #fff;
                }
              }
            }
          }
        }

        div {
          display: inline-block;
          font-size: 14px;
          color: #333;
        }
      }
    }
  }

  // 猜你喜欢
  .like {
    border: 1px solid #ddd;
    margin: 15px 20px;

    .kt {
      border-bottom: 1px solid #ddd;
      background: #f1f1f1;
      color: #666;
      margin: 0;
      padding: 12px;
      font-size: 15px;
    }

    .like-list {
      padding: 15px 11px;
      overflow: hidden;

      .likeItem {
        width: 25%;
        float: left;

        .p-img {
          text-align: left;

          img {
            width: 167px;
            height: 123px;
          }
        }

        .attr {
          padding: 0 15px;
        }

        .price {
          padding: 0 15px;
          font-size: 16px;
          color: #c81623;
          margin-bottom: 20px;
        }

        .commit {
          padding: 0 15px;
        }
      }
    }
  }
}
</style>
