export default axios => ({
  fetch(page = 1, filter = {}) {
    return axios.get('notifications', {
      params: {page: page, ...filter}
    });
  },
  get(id) {
    return axios.get(`notifications/${id}`)
  },
  create(payload) {
    return axios.post('notifications', payload)
  },
  update(id, payload) {
    return axios.put(`notifications/${id}`, payload)
  },
  delete(id) {
    return axios.delete(`notifications/${id}`)
  },
  bulkDelete(ids) {
    return axios.post('notifications/bulk-delete', {ids: ids})
  }
});
