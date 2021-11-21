export default axios => ({
  fetch(page = 1, filter = {}) {
    return axios.get('users', {
      params: {page: page, ...filter}
    });
  },
  get(id) {
    return axios.get(`users/${id}`)
  },
  create(payload) {
    return axios.post('users', payload)
  },
  update(id, payload) {
    return axios.put(`users/${id}`, payload)
  },
  delete(id) {
    return axios.delete(`users/${id}`)
  },
  bulkDelete(ids) {
    return axios.post('users/bulk-delete', {ids: ids})
  }
});
