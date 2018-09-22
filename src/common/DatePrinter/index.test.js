import React from "react"
import { shallow } from "enzyme"
import DatePrinter from "./index"

describe("DatePrinter", () => {
  it("renders a formated date", () => {
    const wrapper = shallow(
      <DatePrinter value={1531435371} format="dd/MM/YYYY" />
    )
    expect(wrapper).toHaveText("12/07/2018")
  })

  it("renders a default value without date", () => {
    const wrapper = shallow(<DatePrinter value={null} format="dd/MM/YYYY" />)
    expect(wrapper).toHaveText("-")
  })
})
