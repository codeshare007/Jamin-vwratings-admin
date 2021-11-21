export default axios => ({
  fetch(page = 1, filter = {}) {
    return axios.get('ratings', {
      params: {page: page, ...filter}
    });
  },
});
