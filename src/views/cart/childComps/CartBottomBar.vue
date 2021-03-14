<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
          :is-checked="isSelectAll"
          @click="checkClick"
          class="check-button"/>
      <span>全选</span>
    </div>

    <div class="price">
      合计: {{totalPrice}}
    </div>

    <div class="calculator" @click="calcClick">
      去计算 ({{checkedLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from "components/context/checkButton/CheckButton";
  import {mapGetters} from "vuex"

  export default {
    name: "CartBottomBar",
    components: {
      CheckButton,
    },
    computed: {
      ...mapGetters(['cartList']),

      totalPrice() {
        return '¥' + this.cartList
            .filter(item => item.checked)
            .reduce((preVale, item) => {
              return preVale + item.price * item.count
            }, 0).toFixed(2)
      },

      checkedLength() {
        return this.cartList.filter(item => item.checked).length
      },

      isSelectAll() {
        //方法一
        // !(this.cartList.filter(item=>!item.checked).length)
        //方法二
        // !(this.cartList.find(item=> !item.checked)
        return this.cartList.length !== 0 ? !(this.cartList.find(item => !item.checked)) : false
      }
    },
    methods: {
      checkClick() {
        //严谨版本
        // if (this.isSelectAll)
        //   this.cartList.forEach(item => item.checked = false)
        // else
        //   this.cartList.forEach(item => item.checked = true)

        //简化版
        let select = this.isSelectAll
        this.cartList.forEach(item => item.checked = !select)
      },
      calcClick(){
        if(!this.isSelectAll){
          this.$toast.show("请选择购买商品")
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    position: relative;
    display: flex;

    height: 40px;
    line-height: 40px;

    background: #eee;
    font-size: 14px;
  }

  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
  }

  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }

  .price {
    margin-left: 30px;
    flex: 1;
  }

  .calculator {
    width: 90px;
    background: orangered;
    color: #fff;
    text-align: center;
  }
</style>