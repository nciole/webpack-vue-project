<template>
  <div class="user">
    <div class="title">个人信息</div>
    <div class="info clearfix">
      <img :src="user" />
      <div class="name">
        <a href="https ://www.baidu.com" target="_blank">个人主页</a>
        <a href="https://www.google.com" target="_blank">项目地址</a>
      </div>
    </div>
    <div class="order-list">
      <p>已购买清单</p>
      <div class="remind" v-if="orderList.length===0">
        当前没有订单
        <div class="toShop" @click="toShop">
          <span>去逛逛</span>
          <icon name="chevron-right"></icon>
        </div>
      </div>
      <ul class="list">
        <li
          class="list-item"
          v-for="(item,index) in orderList"
          :key="index"
          @click="checkOrder(index)"
        >
          <span>订单{{index+1}}</span>
          <span class="checkOrder">
            <icon :name="orderIndex===index?'angle-down':'angle-right'"></icon>
          </span>
          <ul class="order-detail" v-if="orderIndex===index">
            <li
              v-for="(val,inx) in item"
              :key="inx"
            >商品名称:{{val.name}} 价格:¥{{val.price}}*{{val.num}}=¥{{val.price*val.num}}</li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import user from "../assets/img/user_png.png";
export default {
  name: "user",
  data() {
    return {
      user,
      orderIndex: null
    };
  },
  computed: {
    orderList() {
      return this.$store.state.shop.orderList;
    }
  },
  methods: {
    toShop() {
      this.$router.push("/");
    },
    checkOrder(index) {
      if (this.orderIndex === index) {
        this.orderIndex = null;
        return;
      }
      this.orderIndex = index;
    }
  }
};
</script>
<style lang="scss">
.user {
  position: fixed;
  top: 0;
  bottom: 60px;
  width: 100%;
  overflow-y: auto;
  .title {
    font-size: 14px;
    line-height: 40px;
    text-align: center;
    color: #fff;
    background-color: #1296db;
  }
  .info {
    img {
      float: left;
      margin: 10px;
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
    .name {
      margin-left: 100px;
      padding-top: 20px;
      padding-left: 40px;
      height: 100px;
      a {
        display: block;
        font-size: 16px;
        line-height: 30px;
        color: #000;
      }
    }
  }
  .order-list {
    padding-top: 10px;
    p {
      padding-left: 20px;
      font-size: 14px;
      line-height: 40px;
      background-color: #fff;
      border-top: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
    }
    .remind {
      padding-left: 20px;
      font-size: 14px;
      line-height: 40px;
      background-color: #fff;
      border-bottom: 1px solid #ddd;
      .toShop {
        margin-right: 20px;
        float: right;
        font-weight: bold;
        color: #e8380d;
        .fa-icon {
          float: right;
          margin-left: 6px;
          margin-top: 12px;
        }
      }
    }
    .list {
      .list-item {
        padding-left: 20px;
        font-size: 14px;
        font-weight: bold;
        line-height: 36px;
        color: #2f2f2f;
        border-bottom: 1px solid #ddd;
        .checkOrder {
          float: right;
          .fa-icon {
            float: right;
            margin-right: 10px;
            margin-top: 12px;
          }
        }
        .order-detail {
          li {
            font-weight: normal;
            line-height: 20px;
            color: #1296db;
          }
        }
      }
    }
  }
}
</style>