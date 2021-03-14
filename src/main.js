import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import mitt from "mitt";
import store from './store'
import toast from 'components/common/toast'
import FastClick from 'fastclick'
import {Lazyload} from 'vant';
const app = createApp(App)
app.use(router)
    .config
    .globalProperties.$bus= new mitt()  //挂载全局事件总线

//使用自定义插件
app.use(toast)

app.use(store)
//解决移动端300ms延迟
FastClick.attach(document.body)

//使用图片懒加载
app.use(Lazyload,{
  loading: require('./assets/img/common/placeholder2.gif'),//加载中显示的图片
})

app.mount('#app')