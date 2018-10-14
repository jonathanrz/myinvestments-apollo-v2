import React from "react"
import { shallow } from "enzyme"
import { findDataTest } from "app/utils/tests"
import Menu, { menuItems } from "./Menu"

function build() {
  return shallow(<Menu />)
}

describe("Menu", () => {
  it("render divider items", () => {
    const wrapper = build().dive()
    const dividerItems = menuItems.filter(item => item.divider)
    const dividers = findDataTest(wrapper, "divider")
    expect(dividers).toHaveLength(dividerItems.length)
  })
})
