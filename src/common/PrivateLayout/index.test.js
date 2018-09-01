import React from "react"
import { shallow } from "enzyme"
import { expectDataTest } from "app/utils/tests"
import { PrivateLayout } from "./index"

function build() {
  const history = {
    listen: jest.fn()
  }
  return shallow(<PrivateLayout classes={{}} history={history} />)
}

describe("PrivateLayout", () => {
  it("changes menu state when opening and closing menu", () => {
    const wrapper = build({})
    expectDataTest(wrapper, "menu").toHaveProp({ open: false })
    wrapper.instance().openMenu()
    expectDataTest(wrapper.update(), "menu").toHaveProp({ open: true })
    wrapper.instance().closeMenu()
    expectDataTest(wrapper.update(), "menu").toHaveProp({ open: false })
  })
})
