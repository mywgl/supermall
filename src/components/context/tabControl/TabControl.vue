<template>
  <div class="tab-control">
    <div v-for="(item,index) in title" class="title-item"
         :class="{active : index === currentIndex}"
         @click="itemClick(index)"
         :key="index">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    props: {
      title: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index
        //传递事件给父组件
        this.$emit('tabClick',index)
      }
    }
  }
</script>

<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    font-size: 14px;
    height: 40px;
    line-height: 40px;
  }

  .title-item {
    flex: 1;

  }

  .title-item span{
    padding: 5px;
  }

  .active{
    color: var(--color-high-text);
  }

  .active span{
    border-bottom: 3px solid var(--color-tint);
  }
</style>