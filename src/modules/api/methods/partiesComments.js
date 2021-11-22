export default axios => ({
  fetch(page = 1, filter = {}) {
    return axios.get('parties-comments', {
      params: {page: page, ...filter}
    });
  },
  get(id) {
    return axios.get(`parties-comments/${id}`)
  },
  create(payload) {
    return axios.post('parties-comments', payload)
  },
  update(id, payload) {
    return axios.put(`parties-comments/${id}`, payload)
  },
  delete(id) {
    return axios.delete(`parties-comments/${id}`)
  },
  bulkDelete(ids) {
    return axios.post('parties-comments/bulk-delete', {ids: ids})
  }
});
