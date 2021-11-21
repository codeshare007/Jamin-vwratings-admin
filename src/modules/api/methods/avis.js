export default axios => ({
  fetch(page = 1, filter = {}) {
    return axios.get('avis', {
      params: {page: page, ...filter}
    });
  },
  get(id) {
    return axios.get(`avis/${id}`)
  },
  create(payload) {
    return axios.post('avis', payload)
  },
  update(id, payload) {
    return axios.put(`avis/${id}`, payload)
  },
  delete(id) {
    return axios.delete(`avis/${id}`)
  },
  bulkDelete(ids) {
    return axios.post('avis/bulk-delete', {ids: ids})
  }
});
