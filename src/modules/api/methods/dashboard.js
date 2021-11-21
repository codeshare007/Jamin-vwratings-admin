export default axios => ({
  information() {
    return axios.get('dashboard')
  },
  hits() {
    return axios.get('dashboard/hits')
  },
  changeHits(value) {
    return axios.post('dashboard/hits', {value: value})
  }
});
