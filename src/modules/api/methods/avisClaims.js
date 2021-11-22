export default axios => ({
  fetch(page = 1, filter = {}) {
    return axios.get('avis-claims', {
      params: {page: page, ...filter}
    });
  },
  get(id) {
    return axios.get(`avis-claims/${id}`)
  },
  create(payload) {
    return axios.post('avis-claims', payload)
  },
  update(id, payload) {
    return axios.put(`avis-claims/${id}`, payload)
  },
  delete(id) {
    return axios.delete(`avis-claims/${id}`)
  },
  bulkDelete(ids) {
    return axios.post('avis-claims/bulk-delete', {ids: ids})
  }
});
