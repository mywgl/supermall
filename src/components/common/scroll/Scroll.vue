<template>
  <!--使用ref 获取唯一的指定名称的组件对象 这里放到div中也能实现一样的效果获得唯一的div对象-->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  // 使用滚动插件适应移动端的使用
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      data: {
        type: Object,
        default(){
          return {}
        }
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    updated() {

    },
    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        observeDOM: true, // 等所有数据都加载完毕 才开始创建scroll对象
        observeImage: true,  // 里面自带防抖函数 自动刷新并重新计算图片的宽高 TODO 前提是图片没有使用css限制高度
        probeType: this.probeType, //外部传入是否监听滚动
        pullUpLoad: true
      })

      this.scroll.on('scroll', position => {
        this.$emit('scroll', position)
      })
      // 传出上拉加载事件
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    },
    methods: {
      // scrollTo(0,0,500)  x,y 坐标轴  500 毫秒内返回
      scrollTo(x, y, time = 500) {
        //this.scroll  && 判断此是否创建出来 this.scroll为null 就不会往下调用
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },
      getScrollY() {
        return  this.scroll ? this.scroll.y : 0
      }
    },
    watch: {
      data(){
        setTimeout(this.refresh(),20)
      }
    }
  }
</script>

<style scoped>
</style>