<template>
  <div class="home">
    <Search></Search>
    <Banner :imgList="imgList"></Banner>
    <goodsDetail @cartHandle="cartHandle"></goodsDetail>
    <addCart :cartDetail="cartDetail"></addCart>
    <div class="type">
      <ul class="type-list clearfix">
        <li v-for="(item,index) in typeList" :key="index">
          <a :href="item.link">
            <i class="type-img" :style="{background:'url('+item.url+')',backgroundSize:'cover'}"></i>
            <span class="type-name">{{item.name}}</span>
          </a>
        </li>
      </ul>
    </div>
    <div class="goods">
      <div class="goods-item" v-for="(item,index) in goodsList" :key="index">
        <h4>
          {{item.goods.type}}
          <span style="float:right">P{{index+1}}</span>
        </h4>
        <ul class="clearfix">
          <li v-for="(val,inx) in item.goods.list" :key="inx" @click="goodsDetail(val)">
            <img :src="val.img[0]" />
            <span class="price">¥{{val.price}}</span>
            <span class="name">{{val.name}}</span>
            <span class="shop-cart" @click.stop="addCart(val)">
              <icon name="shopping-cart" scale="1.2"></icon>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>


<script>
import Search from "../components/search";
import Banner from "../components/banner";
import goodsDetail from "../components/goodsDetail";
import addCart from "../components/addCart";

export default {
  name: "home",
  components: {
    Search,
    Banner,
    goodsDetail,
    addCart
  },
  data() {
    return {
      imgList: [
        {
          name: "banner_1",
          url:
            "http://flightsnation.com/wp-content/uploads/2015/11/helloworld-logo-horizontal1.jpg"
        },
        {
          name: "banner_2",
          url:
            "https://miro.medium.com/max/2048/0*4ty0Adbdg4dsVBo3.png"
        },
        {
          name: "banner_3",
          url:
            "https://helloworld.com/themes/hellotheme/images/helloworld-logo-desktop.svg"
        },
        {
          name: "banner_4",
          url:
            "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_160x56dp.png"
        }
      ],
      typeList: [],
      goodsList: [],
      cartDetail: {}
    };
  },
  mounted() {
    this.$axios
      .get("./static/data.json")
      .then(res => {
        this.typeList = res.data.typeList;
        this.goodsList = res.data.goodsList;
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    goodsDetail(val) {
      this.$store.dispatch("set_goodsDetail", val);
      this.$store.commit("changeGoodsStatus");
    },
    addCart(val) {
      this.cartDetail = val;
      this.$store.commit("changeCartStatus");
    },
    cartHandle(val) {
      this.cartDetail = val;
      this.$store.commit("changeCartStatus");
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  position: absolute;
  top: 0;
  bottom: 60px;
  width: 100%;
  overflow-y: auto;
  .type {
    background-color: #f3f3f3;
    .type-list {
      li {
        float: left;
        padding: 6px 0;
        width: 20%;
        text-align: center;
        font-size: 0;
        a {
          display: flex;
          flex-direction: column;
          align-items: center;
          .type-img {
            display: inline-block;
            width: 40px;
            height: 40px;
          }
          .type-name {
            font-size: 12px;
            color: #555;
          }
        }
      }
    }
  }
  .goods {
    background-color: #f6f6f6;
    .goods-item {
      h4 {
        padding: 0 10px;
        line-height: 36px;
        font-size: 14px;
        background-color: #fff;
        &:before {
          content: "";
          display: inline-block;
          margin-right: 6px;
          width: 4px;
          height: 12px;
          background-color: #e8380d;
        }
      }
      ul {
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        li {
          position: relative;
          float: left;
          padding: 6px 0;
          display: flex;
          flex-direction: column;
          width: 50%;
          &:not(:last-child) {
            border-right: 1px solid #ddd;
          }
          img {
            margin: 10px 0;
            width: 100%;
            height: 100px;
          }
          .price {
            padding-left: 10px;
            font-size: 14px;
            color: #e8380d;
          }
          .name {
            padding-left: 10px;
          }
          .shop-cart {
            position: absolute;
            right: 10px;
            bottom: 4px;
            color: #1296db;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>