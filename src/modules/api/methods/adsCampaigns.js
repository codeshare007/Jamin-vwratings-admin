export default axios => ({
  fetch(page = 1, filter = {}) {
    return axios.get('campaigns', {
      params: {page: page, ...filter}
    });
  },
  get(id) {
    return axios.get(`campaigns/${id}`)
  },
  create(payload) {
    return axios.post('campaigns', payload)
  },
  update(id, payload) {
    return axios.put(`campaigns/${id}`, payload)
  },
  delete(id) {
    return axios.delete(`campaigns/${id}`)
  },
  bulkDelete(ids) {
    return axios.post('campaigns/bulk-delete', {ids: ids})
  }
});
