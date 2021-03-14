<template>
  <div>
    <nav-bar>
      <template v-slot:left>
        <div class="back" @click="backClick">
          <img src="~assets/img/common/back.svg" alt="">
        </div>
      </template>

      <template v-slot:center>
        <div class="title">
          <div v-for="(item,index) in titles"
               class="title-item"
               :class="{active: currentIndex===index}"
               @click="titleClick(index)">
            {{item}}
          </div>
        </div>
      </template>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  export default {
    name: "DetailNavBar",
    components: {
      NavBar
    },
    data() {
      return {
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0
      }
    },
    methods: {
      backClick() {
        this.$router.go(-1)
      },
      titleClick(index) {
        this.currentIndex = index
        this.$emit('titleClick',index)
      },

    }
  }
</script>

<style scoped>
  .title {
    display: flex;
    font-size: 12px;
  }

  .title-item {
    flex: 1
  }

  .active {
    color: var(--color-high-text);;
  }
  .back {
    box-sizing: border-box;
    height: 44px;
  }
  .back img {
    margin-top: 10px;
  }
</style>