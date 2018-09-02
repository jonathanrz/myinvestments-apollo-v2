import React from "react"
import { shallow } from "enzyme"
import SearchInput from "./index"
import { findDataTest, expectDataTest } from "app/utils/tests"

describe("SearchInput", () => {
  it("renders an input with the received value", () => {
    const wrapper = shallow(
      <SearchInput defaultValue="initial value" onChange={null} />
    ).dive()
    expectDataTest(wrapper, "input").toHaveProp("defaultValue", "initial value")
  })

  it("calls the onChange prop", () => {
    const onChange = jest.fn()
    const wrapper = shallow(
      <SearchInput defaultValue="initial value" onChange={onChange} />
    ).dive()
    const input = findDataTest(wrapper, "input")
    input.simulate("change", { target: { value: "actual value" } })
    expect(onChange).toHaveBeenCalledWith("actual value")
  })
})
