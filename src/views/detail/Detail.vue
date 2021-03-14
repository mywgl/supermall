<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imagesLoad"/>
      <detail-param-info :param-info="paramInfo" ref="params" />
      <detail-comment-info :comment-info="commentInfo" ref="comment"/>
      <goods-list :goods="recommend" ref="recommend"/>
    </scroll>

    <back-top @click="backClick" v-show="isBackTop"/>
    <detail-bottom-bar @addCart="addToCart"/>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import DetailBottomBar from "./childComps/DetailBottomBar";

  import Scroll from "components/common/scroll/Scroll";
  import GoodsList from "components/context/goods/GoodsList";

  import {getDetails, Goods, Shop, GoodsParams, getRecommend} from "network/details";
  import {backTopMixin} from 'common/mixin'

  import {mapActions} from 'vuex'
  import Toast from "../../components/common/toast/Toast";
  export default {
    name: "Detail",
    mixins: [backTopMixin],
    components: {
      Toast,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,

      Scroll,
      GoodsList,

    },
    data() {
      return {
        iid: null,
        topImages: [], // 顶部轮播图
        goods: {}, //商品信息
        shop: {}, //信息店铺
        detailInfo: {}, //商品详细介紹
        paramInfo: {},
        commentInfo: {},
        recommend: [],
        //由于网络请求图片慢 初始值随便设几个 等图片加载好了会自动清空里面的数组值并重新加上正确的值
        themeTopYs: [0, 6000, 8000, 8200],
        currentIndex: 0,
      }
    },
    created() {
      this.iid = this.$route.query.iid
      //请求网络数据
      getDetails(this.iid).then(res => {
        //读取数据
        let data =  res.result
        // console.log(data)
        // 获取顶部轮播图片
        this.topImages = data.itemInfo && data.itemInfo.topImages
        // console.log(res)
        // 获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        // 创建商品店铺基本信息
        this.shop = new Shop(data.shopInfo)

        this.detailInfo = data.detailInfo
        //获取参数信息
        this.paramInfo = new GoodsParams(data.itemParams.info, data.itemParams.rule)

        //获取评论信息 先判断是否有评论
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
      })

      //请求推荐数据
      getRecommend().then(res => {
        // console.log(res.data)
        this.recommend = res.data.list
      })
    },
    mounted() {
    },
    methods: {
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 500)
      },
      imagesLoad() {
        this.themeTopYs = []
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        this.themeTopYs.push(Number.MAX_VALUE); //优化方法二使用的
      },
      // 记录当前滚动的y坐标传值给 detail-nav-bar
      contentScroll(position) {
        let pos = -position.y;
        let arr = this.themeTopYs;
        for (let i = 0; i < arr.length - 1; i++) {
          // 方法一 过于复杂 currentIndex 是为了不频繁调用if里面方法而设置的
          /* if (this.currentIndex !== i && ((i < arr.length - 1 && pos >= arr[i] && pos < arr[i + 1])
               || (i === arr.length - 1 && pos >= arr[i]))
           ) {
             this.currentIndex = i;
             console.log(i)
             this.$refs.nav.currentIndex = this.currentIndex
           }*/
          // 方法二 只需要在数组的最后加上一个最大值 TODO 循环时不循最后一个元素
          if (this.currentIndex !== i && (pos >= arr[i] && pos < arr[i + 1])) {
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex && this.currentIndex
          }
        }
        // 是否显示返回顶部 此处调的是混入里面的方法
        this.listenShowBarTop(pos)
      },
      ...mapActions(['addCart']),
      addToCart() {
        const product = {};
        //获取购物车需要的详情信息
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid
        //通过异步修改将商品添加到vuex中公共对象中
        /*        this.$store
                    .dispatch('addCart', product)
                    .then(message => {
                      console.log(message)
                    })*/
        //使用映射方式

        this.addCart(product).then(message => {
          //调用自定义的插件方式实现模态框的使用
          this.$toast.show(message);
        })
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 10;
    background: #fff;
    height: 100vh;
    overflow: hidden;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background: #fff;
  }

  .content {
    height: calc(100% - 44px - 49px);
  }
</style>