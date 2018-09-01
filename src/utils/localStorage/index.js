export default {
  get(name) {
    try {
      return JSON.parse(window.localStorage.getItem(name))
    } catch (_) {
      return null
    }
  },
  set(name, value) {
    window.localStorage.setItem(name, JSON.stringify(value))
  }
}
