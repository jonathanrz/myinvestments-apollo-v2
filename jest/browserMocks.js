const localStorageMock = (function() {
  var store = {}

  return {
    getItem: function(key) {
      return store[key] || null
    },
    setItem: function(key, value) {
      store[key] = value.toString()
    },
    clear: function() {
      store = {}
    }
  }
})()

const URL = {
  createObjectURL: jest.fn(file => `${file} object url` || undefined),
  revokeObjectURL: jest.fn(() => null)
}

Object.defineProperty(window, "localStorage", {
  value: localStorageMock
})

Object.defineProperty(window, "URL", {
  value: URL
})
