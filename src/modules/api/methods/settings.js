export default axios => ({
  fetch() {
    return axios.get('settings');
  }
});
