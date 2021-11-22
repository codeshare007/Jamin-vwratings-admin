export default axios => ({
  fetch(page = 1, filter = {}) {
    return axios.get('avis-ratings', {
      params: {page: page, ...filter}
    });
  },
  get(id) {
    return axios.get(`avis-ratings/${id}`)
  },
  create(payload) {
    return axios.post('avis-ratings', payload)
  },
  update(id, payload) {
    return axios.put(`avis-ratings/${id}`, payload)
  },
  delete(id) {
    return axios.delete(`avis-ratings/${id}`)
  },
  bulkDelete(ids) {
    return axios.post('avis-ratings/bulk-delete', {ids: ids})
  }
});
