import Vue from 'vue';
import Vuex from 'vuex';
import common from './modules/common';
import navbar from './modules/navbar';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    common,
    navbar,
  },
  // 只有mutation可以更改state, 否則拋出錯誤
  strict: process.env.NODE_ENV !== 'production',
})