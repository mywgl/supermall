<template>
  <div class="top-data">
    <div v-for="(item,index) in topData" :key="item" class="list-item">
      <div class="item-img">
        <img :src="itemImg(item)" alt="" @load="imageLoad">
      </div>
      <div class="item-font">{{item.title}}</div>
    </div>
  </div>
</template>

<script>

  export default {
    name: "CategoryTopContent",
    props: {
      topData: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        counter: 0,
        imgLength: 0
      }
    },
    methods: {
      imageLoad() {
        if (++this.counter === this.topData.length) {
          this.$emit('imageLoad')
          this.counter = 0
        }
      },
    },
    computed: {
      itemImg() {
        return (item) => item.image
      }
    },
  }
</script>

<style scoped>
  .top-data {
    display: flex;
    flex-flow: wrap;
  }

  .list-item {
    flex: 1;
    width: 100px;
    /*border: 1px solid blue;*/
    /*height: 100px;*/

    text-align: center;
    /*margin: 10px 5px;*/
    padding: 10px;
    justify-content: center;
    font-size: 14px;
    box-sizing: border-box;
  }

  .item-img img{
    width: 80px;
  }

  .item-font {
    margin: 5px auto;
  }
</style>