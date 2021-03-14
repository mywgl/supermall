<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: "toast",
    data(){
      return {
        message: '默认消息....',
        isShow: false
      }
    },
    methods: {
      show(message,duration=2000){
        this.message = message;
        this.isShow = true
        setTimeout(()=>{
          this.isShow = false
        },duration)
      }
    }
  }
</script>

<style scoped>
  .toast{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background: rgba(0,0,0,0.6);
    color: #fff;
    z-index: 99;
  }
</style>