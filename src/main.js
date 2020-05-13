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
    connection: SocketIO(process.env.VUE_APP_API_BASE_URL),
    // vuex: {
    //     store,
    //     actionPrefix: 'SOCKET_',
    //     mutationPrefix: 'SOCKET_'
    // },
}));

Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')
