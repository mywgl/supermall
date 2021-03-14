<template>
    <div>
      <main-tab-bar/>
      <!--<keep-alive>-->
      <!--  <router-view/>-->
      <!--</keep-alive>-->

      <router-view v-slot="{ Component }">
        <keep-alive exclude="Detail">
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
</template>

<script>
  import MainTabBar from "components/context/minTabbar/MainTabBar";
  export default {
    name: 'App',
    components: {
      MainTabBar
    }
  }
</script>

<style>
  @import "assets/css/base.css";
  div{
    touch-action: none
  }
</style>