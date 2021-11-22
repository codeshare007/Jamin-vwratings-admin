export default axios => ({
  fetch(page = 1, filter = {}) {
    return axios.get('parties-claims', {
      params: {page: page, ...filter}
    });
  },
  get(id) {
    return axios.get(`parties-claims/${id}`)
  },
  create(payload) {
    return axios.post('parties-claims', payload)
  },
  update(id, payload) {
    return axios.put(`parties-claims/${id}`, payload)
  },
  delete(id) {
    return axios.delete(`parties-claims/${id}`)
  },
  bulkDelete(ids) {
    return axios.post('parties-claims/bulk-delete', {ids: ids})
  }
});
