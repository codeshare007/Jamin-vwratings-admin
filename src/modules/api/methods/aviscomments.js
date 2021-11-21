export default axios => ({
  fetch(page = 1, filter = {}) {
    return axios.get('comments', {
      params: {page: page, ...filter}
    });
  },
  get(id) {
    return axios.get(`comments/${id}`)
  },
  create(payload) {
    return axios.post('comments', payload)
  },
  update(id, payload) {
    return axios.put(`comments/${id}`, payload)
  },
  delete(id) {
    return axios.delete(`comments/${id}`)
  },
  bulkDelete(ids) {
    return axios.post('comments/bulk-delete', {ids: ids})
  },
  bulkOpinion(ids, opinion) {
    return axios.post('comments/bulk-opinion', {ids: ids, opinion: opinion})
  }
});
