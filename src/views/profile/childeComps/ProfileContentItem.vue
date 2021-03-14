<template>
  <div class="item-style">
      <slot></slot>
    </div>
</template>

<script>
  export default {
    name: "ProfileContentItem"
  }
</script>

<style scoped>
   .item-style{
     border-top: 14px solid #f4f2f2;
     padding: 0 15px;
   }
</style>