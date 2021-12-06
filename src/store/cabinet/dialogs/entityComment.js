const initial = {
  id: null,
  status: 'hidden',
  method: null,
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
    create({commit}, method) {
      return new Promise((resolve, reject) => {
        commit('set', {
          status: 'create',
          id: null,
          method  : method,
          resolve,
          reject
        });
      });
    },
    edit({commit}, data) {

      console.log(data);

      return new Promise((resolve, reject) => {
        commit('set', {
          status: 'edit',
          id: data.id,
          method: data.method,
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
      state.resolve = initial.resolve;
      state.reject = initial.reject;
    },
    set(state, {status, id, method, resolve, reject}) {
      state.status = status;
      state.id = id;
      state.method = method;
      state.resolve = resolve;
      state.reject = reject;
    },
  },
};
