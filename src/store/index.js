import { createStore } from 'vuex'
import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";
export default new createStore({
  state:{
    cartList: []  //购物车对象
  },
  mutations,
  actions,
  getters
})