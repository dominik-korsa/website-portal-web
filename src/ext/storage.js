export default {
  get(key) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      console.warn(e);
    }
  },
  set(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
      console.warn(e);
    }
  },
  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn(e);
    }
  },
  clear() {
    try {
      localStorage.clear();
    } catch (e) {
      console.warn(e);
    }
  },
};
