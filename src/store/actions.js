import {ADD_COUNTER,ADD_TO_CART} from './mutation-type'

export default {
  addCart(context, payload){
   return  new Promise((resolve,reject)=>{
      //判断原来的商品是否存在
      let oldProduct = context.state.cartList.find(item=>item.iid === payload.iid);
      //存在直接返回该对象 并在对应的字段上加一
      if (oldProduct){
        context.commit(ADD_COUNTER,oldProduct)
        resolve("商品数量加1")
      }else {
        //不存在说明是一个新商品增加一个字段 数值为一 并添加到购物车中
        payload.count =1;
        //在购物车中默认是选中状态
        payload.checked = true;
        context.commit(ADD_TO_CART,payload)
        resolve("成功添加商品到购物车!")
      }
    })
  }
}