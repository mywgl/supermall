<template>
  <div class="side-scroll">
    <scroll class="cat-scroll">
      <div class="side-bar">
        <div v-for="(item,index) in sideTitle"
             :key="index"
             :class="{active : sideIndex === index}"
             @click="titleClick(index)"
             class="side-item">
          <span>{{item.title}}</span>
        </div>
      </div>

    </scroll>
  </div>

</template>

<script>
  import Scroll from "components/common/scroll/Scroll";

  export default {
    name: "CategorySideBar",
    components: {
      Scroll
    },
    props: {
      sideTitle: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        sideIndex: 0,
        isActive: true
      }
    },
    methods: {
      titleClick(index) {
        this.sideIndex = index
        this.$emit('selectItem', index)
      }
    }
  }
</script>

<style scoped>
  .side-scroll {
    float: left;
    width: 100px;
    height: calc(100vh - 44px - 49px);
  }

  .cat-scroll {
    height: 100%;
    overflow: hidden;
    box-sizing: border-box;
  }

  .side-bar {
    width: 100px;
    background: #f6f6f6;
  }

  .side-item {
    height: 40px;
    text-align: center;
    line-height: 40px;
  }

  .active {
    border-left: 5px solid var(--color-high-text);
    background: #fff;
    font-weight: 700;
  }
</style>