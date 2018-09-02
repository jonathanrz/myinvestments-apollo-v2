export function findDataTest(wrapper, uuid) {
  return wrapper.find(`[data-test="${uuid}"]`)
}

export function findDataTests(wrapper, uuid) {
  return wrapper.findWhere(item => item.prop("data-test") === uuid)
}

export function expectDataTest(...args) {
  return expect(findDataTest(...args))
}
