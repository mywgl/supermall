<template>
  <div class="tar-bar-item" @click="itemClick">

    <div v-if="isActive" :style="styleActive">
      <!--使用具名插槽-->
      <slot name="item-icon-active"></slot>

    </div>
    <div v-else>
      <slot name="item-icon"></slot>
    </div>

    <div :style="styleActive">
      <slot name="item-text"></slot>
    </div>

  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props: {
      path: String,
      activeColor: {
        type: String,
        default: 'blue'
      }
    },
    computed: {
      isActive() {
        // return this.$route.path.indexOf(this.path) !== -1
        return this.$route.path === this.path
      },
      styleActive() {
        return this.isActive ? {color: this.activeColor} : {}
      }
    },
    methods: {
      itemClick() {
        this.$router.push(this.path).catch(error=>error)
      }
    },

  }
</script>

<style>
  .tar-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }

  .tar-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
  }
</style>