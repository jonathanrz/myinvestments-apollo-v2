import React from "react"
import { shallow } from "enzyme"
import App from "./App"

describe("App", () => {
  it("render a Hello, world message", () => {
    const wrapper = shallow(<App />)
    expect(wrapper).toHaveText("Hello, world!")
  })
})
