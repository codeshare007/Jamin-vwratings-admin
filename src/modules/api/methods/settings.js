export default axios => ({
  fetch() {
    return axios.get('settings');
  },
  get(id) {
    return axios.get(`settings/${id}`)
  },
  update(id, payload) {
    return axios.put(`settings/${id}`, payload)
  },

  getAnnouncement() {
    return axios.get('settings/announcement')
  },
  setAnnouncement(payload) {
    return axios.post('settings/announcement', {announcement_html: payload})
  }
});
