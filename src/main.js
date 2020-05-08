import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueSocketIO from 'vue-socket.io';
import SocketIO from "socket.io-client";
import store from './store'

// var options = { path: "/" };
Vue.use(new VueSocketIO({
    debug: true,
    connection: SocketIO('http://localhost:3000'),
    // vuex: {
    //     store,
    //     actionPrefix: 'SOCKET_',
    //     mutationPrefix: 'SOCKET_'
    // },
}));

Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  // sockets: {
  //   //查看socket是否渲染成功
  //   connect() {
  //     console.log("链接成功");
  //   },
  //   getMessage(data) {
  //     console.log(data);
  //   }
  // },
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')
