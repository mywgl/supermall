<template>
    <tab-bar class="main-tab">
      <tab-bar-item path="/home" :active-color="color">
        <template v-slot:item-icon-active>
          <!-- '~' 这是配置在build的webpack.base.config中配置了别名
           作用: 当代些代码复制到其他地方不需要重新修改src的资源路径
          -->
          <img src="~assets/img/tabbar/home_active.svg" alt="">
        </template>
        <template v-slot:item-icon>
          <img src="~assets/img/tabbar/home.svg" alt="">
        </template>
        <template v-slot:item-text>
          <div>首页</div>
        </template>
      </tab-bar-item>

      <tab-bar-item path="/category" :active-color="color">
        <template v-slot:item-icon-active>
          <img src="~assets/img/tabbar/category_active.svg" alt="">
        </template>
        <template v-slot:item-icon>
          <img src="~assets/img/tabbar/category.svg" alt="">
        </template>
        <template v-slot:item-text>
          <div>分类</div>
        </template>
      </tab-bar-item>

      <tab-bar-item path="/cart" :active-color="color">
        <template v-slot:item-icon-active>
          <img src="~assets/img/tabbar/shopcart_active.svg" alt="">
        </template>
        <template v-slot:item-icon>
          <img src="~assets/img/tabbar/shopcart.svg" alt="">
        </template>
        <template v-slot:item-text>
          <div>购物车</div>
        </template>
      </tab-bar-item>

      <tab-bar-item path="/profile" :active-color="color">
        <template v-slot:item-icon-active>
          <img src="~assets/img/tabbar/profile_active.svg" alt="">
        </template>
        <template v-slot:item-icon>
          <img src="~assets/img/tabbar/profile.svg" alt="">
        </template>
        <template v-slot:item-text>
          <div>我的</div>
        </template>
      </tab-bar-item>

    </tab-bar>

</template>

<script>
  import TabBar from "components/common/tabbar/TabBar";
  import TabBarItem from "components/common/tabbar/TabBarItem";
  export default {
    name: "MainTabBar",
    components: {
      TabBar,
      TabBarItem
    },
    data() {
      return{
        color: 'red'
      }
    }
  }
</script>

<style >
  .main-tab{
    z-index: 9;
  }
</style>