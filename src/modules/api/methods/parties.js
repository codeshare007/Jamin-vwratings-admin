export default axios => ({
  fetch(page = 1, filter = {}) {
    return axios.get('parties', {
      params: {page: page, ...filter}
    });
  },
  get(id) {
    return axios.get(`parties/${id}`)
  },
  create(payload) {
    return axios.post('parties', payload)
  },
  update(id, payload) {
    return axios.put(`parties/${id}`, payload)
  },
  delete(id) {
    return axios.delete(`parties/${id}`)
  },
  bulkDelete(ids) {
    return axios.post('parties/bulk-delete', {ids: ids})
  }
});
