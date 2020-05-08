import Vue from 'vue';
import Vuex from 'vuex';
import common from './modules/common';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    common,
  },
  // 只有mutation可以更改state, 否則拋出錯誤
  strict: process.env.NODE_ENV !== 'production',
})