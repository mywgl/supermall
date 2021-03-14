// export const imageLoad = {
//   data() {
//     return {
//       imageLength: 0,
//       count: 0,
//     }
//   },
//   methods: {
//     imageLoad() {
//       // 判断是否加载完成一次请求的所有图片
//       // 每加载一次图片counter就会先自增在和imageLength的进行一次判断
//       // 加载完成只掉用一次里面的方法
//       if (++this.counter === this.imagesLength) {
//         this.$emit("imageLoad"); //调用一次父组件的方法
//       }
//     }
//   }
// }

import BackTop from "components/context/backTop/BackTop";

export const backTopMixin = {
  components: {
    BackTop,
  },
  data() {
    return {
      isBackTop: false,
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0)
    },
    listenShowBarTop(pos) {
      this.isBackTop = pos > 2000
    }
  }
}

export const tabControlMixin = {
  data() {
    return {
      isTabFixed: false,
      saveY: 0,
      tabOffsetTop: 0
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0 :
          this.clickType = 'new';
          break
        case 1 :
          this.clickType = 'pop';
          break
        case 2 :
          this.clickType = 'sell';
          break
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    imageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },

    contextScroll(position) {
      let posY = -(position.y);
      // console.log(posY)
      //调用混入 是否显示回到顶部
     this.listenShowBarTop && this.listenShowBarTop(posY);
      // 判断当前滚动的position 是否达到指定的位置 来决定 tabControl 是否吸顶
      this.isTabFixed = posY > this.tabOffsetTop
    }
  },
  activated() {
    this.$refs.scroll.refresh()
    //重新进入组件时跳到离开前的位置  延迟不能为 0 设置成其他的任意值就可以回到当前的状态
    this.$refs.scroll.scrollTo(0,this.saveY,1)
  },
  deactivated() {
    //记录组件离开时的滚动位置
    this.saveY = this.$refs.scroll.getScrollY()
  },
}