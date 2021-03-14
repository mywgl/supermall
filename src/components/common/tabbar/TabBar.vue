<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "TabBar"
  }
</script>

<style>
  #tab-bar {
    display: flex;
    background: #f6f6f6;
    left: 0;
    right: 0;
    bottom: 0;
    position: fixed;
    box-shadow: 0px -3px 1px rgba(255, 255, 255, 0.1);
  }
</style>