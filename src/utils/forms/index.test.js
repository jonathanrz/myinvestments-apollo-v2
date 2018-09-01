import React from "react"
import { shallow } from "enzyme"
import BaseField from "app/common/formFields/Base"
import { makeField, normalizeObject } from "./index"

describe("makeField", () => {
  it("returns a BaseField that is rendered with the right props", () => {
    const render = "SOME RENDERER"
    const Field = makeField(render)
    const wrapper = shallow(<Field prop1="prop1" prop2="prop2" />)

    expect(wrapper.type()).toBe(BaseField)
    expect(wrapper).toHaveProp("prop1", "prop1")
    expect(wrapper).toHaveProp("prop2", "prop2")
    expect(wrapper).toHaveProp("render", "SOME RENDERER")
  })

  it("returns a component with the informed displayName", () => {
    const Field = makeField(null, "SomeDisplayName")
    expect(Field.displayName).toBe("SomeDisplayName")
  })
})

describe("normalizeObject", () => {
  it("returns a function that will clone an object and map old properties to new ones", () => {
    const result = normalizeObject({
      uppercasedProp1: ({ prop1 }) => prop1.toUpperCase(),
      uppercasedProp2: ({ prop2 }) => prop2.toUpperCase()
    })({
      prop1: "prop1",
      prop2: "prop2"
    })

    expect(result).toEqual({
      prop1: "prop1",
      prop2: "prop2",
      uppercasedProp1: "PROP1",
      uppercasedProp2: "PROP2"
    })
  })
})
