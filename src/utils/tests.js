export function findDataTest(wrapper, id) {
  return wrapper.find(`[data-test="${id}"]`)
}

export function findDataTests(wrapper, id) {
  return wrapper.findWhere(item => item.prop("data-test") === id)
}

export function expectDataTest(...args) {
  return expect(findDataTest(...args))
}
