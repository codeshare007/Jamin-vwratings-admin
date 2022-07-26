const initial = {
  id: null,
  type: 1,
  status: 'hidden',
  resolve: null,
  reject: null,
};

export default {
  namespaced: true,
  state: {
    ...initial
  },
  actions: {
    clear({commit}) {
      commit('clear');
    },
    create({commit}, type) {
      return new Promise((resolve, reject) => {
        commit('set', {
          status: 'create',
          id: null,
          type: type,
          resolve,
          reject
        });
      });
    },
    edit({commit}, id) {
      return new Promise((resolve, reject) => {
        commit('set', {
          status: 'edit',
          id: id,
          resolve,
          reject
        });
      });
    },
  },
  mutations: {
    clear(state) {
      state.status = initial.status;
      state.id = initial.id;
      state.type = initial.type;
      state.resolve = initial.resolve;
      state.reject = initial.reject;
    },
    set(state, {status, id, type, resolve, reject}) {
      state.status = status;
      state.id = id;
      state.type = type;
      state.resolve = resolve;
      state.reject = reject;
    },
  },
};
