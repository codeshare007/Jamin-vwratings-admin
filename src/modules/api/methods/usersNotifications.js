export default axios => ({
  fetch(page = 1, filter = {}) {
    return axios.get('users-notifications', {
      params: {page: page, ...filter}
    });
  },
  get(id) {
    return axios.get(`users-notifications/${id}`)
  },
  create(payload) {
    return axios.post('users-notifications', payload)
  },
  update(id, payload) {
    return axios.put(`users-notifications/${id}`, payload)
  },
  delete(id) {
    return axios.delete(`users-notifications/${id}`)
  },
  bulkDelete(ids) {
    return axios.post('users-notifications/bulk-delete', {ids: ids})
  }
});
