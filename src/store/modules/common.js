const state = {
  userName: localStorage.getItem('userName'),
};

const mutations = {
  setUserName(state, userName) {
    localStorage.setItem('userName', userName);
    state.userName = userName;
  },
  clearUserName(state) {
    localStorage.removeItem('userName');
    state.userName = null;
  }
};

const actions = {
  setUserName({ commit }, userName) {
    commit('setUserName', userName);
  },
  clearUserName({ commit }) {
    commit('clearUserName');
  },
};

const getters = {
  userName: (state) => state.userName,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};