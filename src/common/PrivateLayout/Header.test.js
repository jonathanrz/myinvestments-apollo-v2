import React from "react"
import { shallow } from "enzyme"
import { findDataTest, expectDataTest } from "app/utils/tests"
import Header from "./Header"

function build(openMenu = jest.fn()) {
  return shallow(<Header classes={{}} openMenu={openMenu} />).dive()
}

function buildBeforeTitle(wrapper) {
  return shallow(<div>{wrapper.prop("beforeTitle")}</div>)
}

function buildAfterTitle(wrapper) {
  return shallow(<div>{wrapper.prop("afterTitle")}</div>)
}

describe("Header", () => {
  it("calls onClick function when menu button clicked", () => {
    const onClick = jest.fn()
    const beforeTitle = buildBeforeTitle(build(onClick))
    expect(onClick).not.toHaveBeenCalled()
    findDataTest(beforeTitle, "menu-button").simulate("click")
    expect(onClick).toHaveBeenCalled()
  })
  it("render afterTitle component", () => {
    const afterTitle = buildAfterTitle(build())
    expectDataTest(afterTitle, "loading-indicator").toHaveLength(1)
  })
})
