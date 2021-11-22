export default axios => ({
  fetch(page = 1, filter = {}) {
    return axios.get('parties-ratings', {
      params: {page: page, ...filter}
    });
  },
  get(id) {
    return axios.get(`parties-ratings/${id}`)
  },
  create(payload) {
    return axios.post('parties-ratings', payload)
  },
  update(id, payload) {
    return axios.put(`parties-ratings/${id}`, payload)
  },
  delete(id) {
    return axios.delete(`parties-ratings/${id}`)
  },
  bulkDelete(ids) {
    return axios.post('parties-ratings/bulk-delete', {ids: ids})
  }
});
