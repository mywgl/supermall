<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>
        <span>购物街</span>
      </template>
    </nav-bar>

    <tab-control
        :title="['流行','新款','精选']"
        @tabClick="tabClick"
        ref="tabControl1"
        class="tab-control" v-show="isTabFixed"/>

    <scroll class="content" ref="scroll"
            :probe-type="3"
            @scroll="contextScroll"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="imageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control
          :title="['流行','新款','精选']"
          @tabClick="tabClick"
          ref="tabControl2"/>

      <goods-list :goods="showGoods"/>
    </scroll>
    <back-top @click="backClick" v-show="isBackTop"/>
  </div>
</template>

<script>

  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/context/tabControl/TabControl";
  import GoodsList from "components/context/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";


  import {getHomeMultidata, getHomeGoods} from 'network/home';

  import {backTopMixin,tabControlMixin} from 'common/mixin'
  export default {
    name: "Home",
    mixins: [backTopMixin,tabControlMixin],
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,

      NavBar,
      TabControl,
      GoodsList,
      Scroll,
    },
    data() {
      return {
        banners: [],
        recommends: {},
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        isBackTop: false,
      }
    },
    created() {
      this.getHomeMultidata()
      //请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    methods: {
      /**
       * 监听事件
       */
      // swiperImageLoad() {
      //   // $el 是每个组件都有的对象 里面是每个组件dom元素 使用元素选择器并不能获取到全局唯一的dom对象有风险
      //   this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      // },
      loadMore() {
        this.getHomeGoods(this.currentType)
      },
      /**
       * 网络请求
       */
      getHomeMultidata() {
        getHomeMultidata().then(resp => {
          this.banners = resp.data.banner.list
          this.recommends = resp.data.recommend.list
        })
      },

      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(resp => {
          this.goods[type].list.push(...resp.data.list)

          this.goods[type].page += 1
          //完成上拉加载的调用
          this.$refs.scroll.finishPullUp()
        })
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    }
  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background: var(--color-tint);
    color: #fff;
/*    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;*/
  }

  .tab-control{
    position: relative;
    z-index: 9;
    background: #fff;
  }

  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
