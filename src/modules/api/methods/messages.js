export default axios => ({
  fetch(page = 1, filter = {}) {
    return axios.get('messages', {
      params: {page: page, ...filter}
    });
  },
  delete(id) {
    return axios.delete(`messages/${id}`)
  },
  bulkDelete(ids) {
    return axios.post('messages/bulk-delete', {ids: ids})
  },
});
