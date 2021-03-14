<template>
  <div class="prof-content">
    <div class="content-top">
      <div class="top-left">
        <div>
          <img src="~assets/img/profile/avatar.svg" alt="">
        </div>

      </div>
      <div class="top-center">
        <div class="center-context">
          <div class="login">
            <span>登录/注册</span>
          </div>
          <div class="content-icon">
            <img src="~assets/img/profile/phone.svg" alt="">
            <span>暂无绑定手机号</span>
          </div>
        </div>

      </div>

      <div class="top-right">
        <div class="right-logo">
          <img src="~assets/img/common/arrow-left.svg" alt="">
        </div>
      </div>
    </div>
    <div class="content-next">
      <div class="next-container">
        <div class="next-item">
          <div class="item-number">
            <b>0.0</b>
            <span>元</span>
          </div>
          <div class="item-two">
            <span>我的余额</span>
          </div>

        </div>

        <div class="next-item">
          <div class="item-number">`
            <b>0.0</b><span>个</span>
          </div>
          <div class="item-two">
            <span>我的优惠</span>
          </div>
        </div>

        <div class="next-item">
          <div class="item-number">
            <b>0</b><span>分</span>
          </div>
          <div class="item-two">
            <span>我的积分</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ProfileContentItem>
     <div class="item-info">
       <img src="~assets/img/profile/message.svg" alt="">
       <div class="item-font"><span>我的消息</span></div>
     </div>
    <div class="item-info">
       <img src="~assets/img/profile/pointer.svg" alt="">
       <div class="item-font"><span>积分商城</span></div>
     </div>
    <div class="item-info">
       <img src="~assets/img/profile/vip.svg" alt="">
       <div class="item-font"><span>会员卡</span></div>
     </div>
  </ProfileContentItem>
  <ProfileContentItem>
     <div class="item-info">
       <img src="~assets/img/profile/cart.svg" alt="">
       <div class="item-font"><span>我的购物车</span></div>
     </div>
    <div class="item-info">
       <img src="~assets/img/profile/shopping.svg" alt="">
       <div class="item-font"><span>下载购物App</span></div>
     </div>
  </ProfileContentItem>
</template>

<script>
  import ProfileContentItem from "./ProfileContentItem";
  export default {
    name: "ProfileContent",
    components:{
      ProfileContentItem
    }
  }
</script>

<style scoped>
  .prof-content {
    height: 160px;
    /*background: #1fa8b4;*/
    width: 100%
  }

  .content-top {
    background: var(--color-tint);
    height: 80px;
    display: flex;
  }

  .top-left {
    width: 80px;
    height: 80px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .top-left img {
    width: 60px;
    height: 60px;
    align-items: center;
  }

  .top-center{
    flex: 2;
    color: #fff;
  }
  .center-context .login{
    padding-left: 4px;
  }
  .center-context{
    height: 80px;
    display: table-cell;
    vertical-align: middle;
  }

  .top-right{
    flex: 1;
    padding-right: 10px;
  }
  .right-logo {
    display: flex;
    align-items: center;
    height: 80px;
  }
  .content-icon{
    vertical-align:middle;
    display: flex;
    align-items: center;
  }
  .content-icon img {
    width: 20px;
    height: 20px;
    display: inline-block;
  }

  .right-logo img {
    width: 20px;
    height: 20px;
    margin-left: auto;
  }
  .next-container{
    display: flex;
  }
  .next-item{
    height: 80px;
    flex-basis: 0;
    flex-grow: 1;
    text-align: center;
    border-right: 1px solid #ededed;
    padding-top: 20px;
    font-size: 13px;
  }
  .next-item .item-number b{
    color: #f39652;
    font-size: 25px;
  }
  .item-info{
    display: flex;
    align-items: center;
    height: 40px;

  }
  .item-info img{
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }
  .item-font{
    line-height: 40px;
    width: 100%;
    border-bottom: 1px solid #eeeeee;
    font-size: 14px;
  }
</style>