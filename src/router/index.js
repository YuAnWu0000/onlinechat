import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Message from '../views/Message.vue';
import store from '../store';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/message',
    name: 'Message',
    component: Message,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/Message.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  // 確認當前頁面的的menu有active
  let activeMenuIndex = '1';
  if (to.name === 'Message') {
    activeMenuIndex = '2';
  }
  store.dispatch('navbar/setActiveMenu', activeMenuIndex);
  next();
});

export default router
