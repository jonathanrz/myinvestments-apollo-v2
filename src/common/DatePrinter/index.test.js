import React from "react"
import { shallow } from "enzyme"
import DatePrinter from "./index"

describe("DatePrinter", () => {
  it("renders a formated date", () => {
    const wrapper = shallow(
      <DatePrinter value="1991-09-21" format="dd/MM/YYYY" />
    )
    expect(wrapper).toHaveText("21/09/1991")
  })

  it("renders a default value without date", () => {
    const wrapper = shallow(<DatePrinter value={null} format="dd/MM/YYYY" />)
    expect(wrapper).toHaveText("-")
  })
})
