<template>
  <div class="cart">

    <nav-bar class="nav-bar">
      <template v-slot:center>
        购物车({{length}})
      </template>
    </nav-bar>

    <!--商品列表-->
    <cart-list/>

    <!-- 底部汇总-->
    <cart-bottom-bar/>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import CartList from "./childComps/CartList";
  import CartBottomBar from "./childComps/CartBottomBar";

  import {mapGetters} from 'vuex';

  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      CartBottomBar,

    },
    computed: {
      //两种使用方式 使用数组是导入需要使用计算函数
      //...mapGetters(['cartLength'])

      // 使用对象方式将要导入的函数改个别名
      ...mapGetters({
        length: 'cartLength'
      })

    }
  }
</script>

<style scoped>
  .cart{
    height: 100vh;
  }
  .nav-bar {
    background: var(--color-tint);
    color: #fff;
    font-weight: 600;
  }
</style>