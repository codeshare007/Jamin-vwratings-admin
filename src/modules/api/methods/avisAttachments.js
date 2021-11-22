export default axios => ({
  fetch(page = 1, filter = {}) {
    return axios.get('avis-attachments', {
      params: {page: page, ...filter}
    });
  },
  get(id) {
    return axios.get(`avis-attachments/${id}`)
  },
  create(payload) {
    return axios.post('avis-attachments', payload)
  },
  update(id, payload) {
    return axios.put(`avis-attachments/${id}`, payload)
  },
  delete(id) {
    return axios.delete(`avis-attachments/${id}`)
  },
  bulkDelete(ids) {
    return axios.post('avis-attachments/bulk-delete', {ids: ids})
  }
});
