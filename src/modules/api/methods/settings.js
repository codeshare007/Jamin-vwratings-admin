export default axios => ({
  fetch() {
    return axios.get('settings');
  },
  get(id) {
    return axios.get(`settings/${id}`)
  },
  update(id, payload) {
    return axios.put(`settings/${id}`, payload)
  }
});
