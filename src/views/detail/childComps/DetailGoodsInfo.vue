<template>
  <!--如果detailInfo的长度不等于0，才渲染这个div里的内容-->
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start">
      </div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
    <div class="info-list">
      <img v-for="(item, index) in detailInfo.detailImage[0].list"
           :key="index"
           :src="item"
           @load="imageLoad">
    </div>
  </div>
</template>

<script>
  import {ref,watch, onUnmounted} from 'vue'

  export default {
    name: "DetailGoodsInfo",
    props: {
      detailInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    setup(props,context) {
      let counter = ref(0);
      let imagesLength = ref(0);
      let flag  = ref(true)
      const imageLoad = ()=>{
        //这里设置一个标记的目的 : 当用户点击进详情页时图片会自动监听,
        //TODO 但是进去不到一秒的时间就退出了,图片的监听并没有停止还是会最终向父组件发送一个方法出去,调用了父组件的方法引发bug
        //离开组件时改变标记值不在进行判断发送事件
        if(flag){
          if (++counter.value === imagesLength.value) {
            context.emit("imageLoad")
          }
        }
      };
      onUnmounted(() => {
        flag=false
      });
      watch(props,()=>{
        imagesLength.value =props.detailInfo.detailImage[0].list.length
        // imagesLength.value = newValue.values
      });
      return {
        imagesLength,
        flag,
        imageLoad
      }
    },
    //2.x使用方式
    // watch: {
    //   detailInfo() {
    //     this.imagesLength = this.detailInfo.detailImage[0].list.length;
    //   }
    // },
  }
</script>

<style scoped>
  .goods-info {
    padding: 20px 0;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-desc {
    padding: 0 15px;
  }

  .info-desc .start, .info-desc .end {
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;
    position: relative;
  }

  .info-desc .start {
    float: left;
  }

  .info-desc .end {
    float: right;
  }

  .info-desc .start::before, .info-desc .end::after {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: #333;
    bottom: 0;
  }

  .info-desc .end::after {
    right: 0;
  }

  .info-desc .desc {
    padding: 15px 0;
    font-size: 14px;
  }

  .info-key {
    margin: 10px 0 10px 15px;
    color: #333;
    font-size: 15px;
  }

  .info-list img {
    width: 100%;
  }
</style>