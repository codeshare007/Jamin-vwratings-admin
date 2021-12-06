const initial = {
  id: null,
  status: 'hidden',
  entities: null,
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
    create({commit}, entities) {
      return new Promise((resolve, reject) => {
        commit('set', {
          status: 'create',
          id: null,
          entities: entities,
          resolve,
          reject
        });
      });
    },
    edit({commit}, entities, id) {
      return new Promise((resolve, reject) => {
        commit('set', {
          status: 'edit',
          id: id,
          entities: entities,
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
    set(state, {status, id, entities, resolve, reject}) {
      state.status = status;
      state.id = id;
      state.entities = entities;
      state.resolve = resolve;
      state.reject = reject;
    },
  },
};