const state = {
  activeMenu: '1',
};

const mutations = {
  setActiveMenu(state, activeMenu) {
    state.activeMenu = activeMenu;
  },
};

const actions = {
  setActiveMenu({ commit }, activeMenu) {
    commit('setActiveMenu', activeMenu);
  },
};

const getters = {
  activeMenu: (state) => state.activeMenu,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};