<template>
  <nav-bar class="prof-nav">
    <template v-slot:center>
      <div>我的档案</div>
    </template>
  </nav-bar>


</template>

<script>
  import NavBar from "components/common/navbar/NavBar";

  export default {
    name: "ProfileNavBar",
    components: {
      NavBar,
    }
  }
</script>

<style scoped>
  .prof-nav{
    background: var(--color-tint);
    color: #fff;
  }
</style>