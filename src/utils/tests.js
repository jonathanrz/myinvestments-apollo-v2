import React, { Fragment } from "react"
import { shallow as enzymeShallow } from "enzyme"

function makeMethodInvoker(name) {
  return (...args) => wrapper => wrapper[name](...args)
}

export const shallow = enzymeShallow
export const at = makeMethodInvoker("at")
export const childAt = makeMethodInvoker("childAt")
export const children = makeMethodInvoker("children")
export const closest = makeMethodInvoker("closest")
export const contains = makeMethodInvoker("contains")
export const containsAllMatchingElements = makeMethodInvoker(
  "containsAllMatchingElements"
)
export const containsAnyMatchingElements = makeMethodInvoker(
  "containsAnyMatchingElements"
)
export const containsMatchingElement = makeMethodInvoker(
  "containsMatchingElement"
)
export const context = makeMethodInvoker("context")
export const debug = makeMethodInvoker("debug")
export const dive = makeMethodInvoker("dive")
export const equals = makeMethodInvoker("equals")
export const every = makeMethodInvoker("every")
export const everyWhere = makeMethodInvoker("everyWhere")
export const exists = makeMethodInvoker("exists")
export const filter = makeMethodInvoker("filter")
export const filterWhere = makeMethodInvoker("filterWhere")
export const find = makeMethodInvoker("find")
export const findWhere = makeMethodInvoker("findWhere")
export const first = makeMethodInvoker("first")
export const forEach = makeMethodInvoker("forEach")
export const get = makeMethodInvoker("get")
export const hasClass = makeMethodInvoker("hasClass")
export const hostNodes = makeMethodInvoker("hostNodes")
export const html = makeMethodInvoker("html")
export const instance = makeMethodInvoker("instance")
export const is = makeMethodInvoker("is")
export const isEmpty = makeMethodInvoker("isEmpty")
export const key = makeMethodInvoker("key")
export const last = makeMethodInvoker("last")
export const map = makeMethodInvoker("map")
export const matchesElement = makeMethodInvoker("matchesElement")
export const name = makeMethodInvoker("name")
export const not = makeMethodInvoker("not")
export const parent = makeMethodInvoker("parent")
export const parents = makeMethodInvoker("parents")
export const prop = makeMethodInvoker("prop")
export const props = makeMethodInvoker("props")
export const reduce = makeMethodInvoker("reduce")
export const reduceRight = makeMethodInvoker("reduceRight")
export const render = makeMethodInvoker("render")
export const setContext = makeMethodInvoker("setContext")
export const setProps = makeMethodInvoker("setProps")
export const setState = makeMethodInvoker("setState")
export const simulate = makeMethodInvoker("simulate")
export const simulateError = makeMethodInvoker("simulateError")
export const slice = makeMethodInvoker("slice")
export const some = makeMethodInvoker("some")
export const someWhere = makeMethodInvoker("someWhere")
export const state = makeMethodInvoker("state")
export const tap = makeMethodInvoker("tap")
export const text = makeMethodInvoker("text")
export const type = makeMethodInvoker("type")
export const unmount = makeMethodInvoker("unmount")
export const update = makeMethodInvoker("update")

export function callProp(prop, ...args) {
  return wrapper => {
    return wrapper.prop(prop)(...args)
  }
}

export function renderProp(prop, ...args) {
  return wrapper => {
    const element = wrapper.prop(prop)(...args)

    if (!element) {
      return null
    }

    if (element && element.type === Fragment) {
      return shallow(<div>{element}</div>)
    }

    return shallow(element)
  }
}

export function byTestId(id) {
  return wrapper => wrapper.prop("data-test") === id
}

export function until(matcher) {
  return wrapper =>
    matcher(wrapper) ? wrapper : until(matcher)(wrapper.dive())
}

/*
 * Deprecated
 */
export function findDataTest(wrapper, id) {
  return findWhere(byTestId(id))(wrapper)
}

export const findDataTests = findDataTest

export function expectDataTest(...args) {
  return expect(findDataTest(...args))
}

export function diveUntil(wrapper, matcher) {
  return until(matcher)(wrapper)
}

export function diveUntilDataTest(wrapper, id) {
  return until(byTestId(id))(wrapper)
}
