<template>
  <div class="cart-list">
    <scroll class="contents" ref="scroll">
      <cart-list-item v-for="(item,index) in cartList"
                      :itemInfo="item"
                      :key="index"/>
    </scroll>
  </div>
</template>

<script>
  import Scroll from "components/common/scroll/Scroll";
  import CartListItem from "./CartListItem";

  import {mapGetters} from 'vuex';
  export default {
    name: "CartList",
    components: {
      Scroll,
      CartListItem,

    },
    computed: {
      ...mapGetters(['cartList'])
    },
    activated() {
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  .cart-list{
    height: calc(100% - 44px - 49px - 40px);
  }
  .contents{
    height:  100%;
    overflow: hidden;
  }
</style>