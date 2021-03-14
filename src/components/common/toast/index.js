import {createVNode, render, createApp} from 'vue';
import Toast from "./Toast";

export default {

  //vue2.x的挂载方式
  //使用vue的extend注册一个对象 返回注册对象的构造器
  // const toastConstructor = Vue.extend(Toast)
  // // 创建对象
  // const toast = new toastConstructor();
  // //将创建的对象挂载到创建出来的div元素上
  // toast.$mount(document.createElement('div'))
  //
  // //再把toast的 $el($el就是一个组件的所有div元素) 挂载到body中
  // document.body.appendChild(toast.$el)
  // //在vue中挂载全局对象 就可以通过 this.$toast 这样的方式来使用组件
  // Vue.prototype.$toast = toast

  //vue3.x的挂载插件方式
  install: function (app,opts) {
    //创建一个元素容器
    const container = document.createElement('div')
    //把元素容器挂载到body中
    document.body.appendChild(container);
    //创建组件实例
    const toast = createApp(Toast, {
      ...opts, modelValue: true,
      remove() {
        app.unmount(container)
        document.body.removeChild(container)
      }
    })
    //将创建好的组件挂载上自身div元素 在挂到vue的全局变量中
    app.config.globalProperties.$toast = toast.mount(container);
  }
}