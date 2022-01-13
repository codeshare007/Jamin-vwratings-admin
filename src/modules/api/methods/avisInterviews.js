export default axios => ({
  fetch(page = 1, filter = {}) {
    return axios.get('avis-interviews', {
      params: {page: page, ...filter}
    });
  },
  get(id) {
    return axios.get(`avis-interviews/${id}`)
  },
  create(payload) {
    return axios.post('avis-interviews', payload)
  },
  update(id, payload) {
    return axios.put(`avis-interviews/${id}`, payload)
  },
  delete(id) {
    return axios.delete(`avis-interviews/${id}`)
  },
  bulkDelete(ids) {
    return axios.post('avis-interviews/bulk-delete', {ids: ids})
  }
});
