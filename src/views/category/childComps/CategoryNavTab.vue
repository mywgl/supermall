<template>
  <nav-bar class="cat-nav">
    <template v-slot:center>
      <span>商品分类</span>
    </template>
  </nav-bar>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  export default {
    name: "CategoryNavTab",
    components: {
      NavBar
    }
  }
</script>

<style scoped>
  .cat-nav{
    background: var(--color-tint);
  }
</style>