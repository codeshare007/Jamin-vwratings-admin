export default axios => ({
  fetch(page = 1, filter = {}) {
    return axios.get('avis-comments', {
      params: {page: page, ...filter}
    });
  },
  get(id) {
    return axios.get(`avis-comments/${id}`)
  },
  create(payload) {
    return axios.post('avis-comments', payload)
  },
  update(id, payload) {
    return axios.put(`avis-comments/${id}`, payload)
  },
  delete(id) {
    return axios.delete(`avis-comments/${id}`)
  },
  bulkDelete(ids) {
    return axios.post('avis-comments/bulk-delete', {ids: ids})
  },
  bulkOpinion(ids, opinion) {
    return axios.post('avis-comments/bulk-opinion', {ids: ids, opinion: opinion})
  }
});
