<template>
  <tab-control :title="['综合', '新品', '销量']"
               @tabClick="tabClick"
               v-show="isTabFixed"
               ref="tabControl1"
               class="tab-control2"/>
  <scroll class="cat-detail-scroll" ref="scroll" @scroll="contextScroll" :data="newDetailData">
    <div class="cat-detail-context">
      <!--顶部分类商品展示-->
      <category-top-content :top-data="getTopData" @imageLoad="imageLoad"/>
      <!--分栏-->
      <tab-control :title="['综合', '新品', '销量']"
                   @tabClick="tabClick"
                   ref="tabControl2" v-show="!isTabFixed"/>
      <!--分栏下面的商品-->
      <goods-list :goods="getGoods" class="cat-goods"/>
    </div>
  </scroll>

</template>

<script>
  import Scroll from "components/common/scroll/Scroll";

  import CategoryTopContent from "./CategoryTopContent";
  import GoodsList from "components/context/goods/GoodsList";
  import TabControl from "components/context/tabControl/TabControl";
  import {tabControlMixin} from 'common/mixin'

  export default {
    name: "CategoryDetail",
    mixins: [tabControlMixin],
    components: {
      Scroll,
      CategoryTopContent,
      GoodsList,
      TabControl
    },
    props: {
      categoryDetails: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        clickType: 'new',
        list: [],
        newDetailData: {
          new: [],
          pop: [],
          sell: []
        },
      }
    },
    computed: {
      getTopData() {
        return this.list
      },
      getGoods() {
        return this.newDetailData[this.clickType]
      }
    },
    watch: {
      categoryDetails: {
        handler() {
          this.list = this.categoryDetails.subcategories
          this.newDetailData = this.categoryDetails.categoryDetail
        },
        // immediate: true,
        deep: true  //深度监听
      },

    }
  }
</script>

<style scoped>
  .cat-detail-scroll {
    float: right;
    width: calc(100% - 100px);
    height: calc(100vh - 44px - 49px);
    overflow: hidden;
    box-sizing: border-box;
  }

  .tab-control2 {
    position: relative;
    z-index: 9;
    background: #fff;
  }
</style>