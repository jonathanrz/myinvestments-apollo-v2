import React from "react"
import { shallow } from "enzyme"
import { findDataTests } from "app/utils/tests"
import TableHead from "./TableHead"

describe("TableHead", () => {
  it("renders the table head cells", () => {
    const columns = [
      { header: "column 1" },
      { header: "column 2" },
      { header: "column 3" },
      { header: "column 4" },
      { header: "column 5" },
      { header: "column 6" }
    ]

    const wrapper = shallow(<TableHead columns={columns} />)

    const cells = findDataTests(wrapper, "cell")

    columns.forEach((column, index) => {
      const cellText = shallow(cells.at(index).prop("children")).text()
      expect(cellText).toBe(column.header)
    })
  })

  it("accepts a custom component", () => {
    const CustomHeader = () => null

    const columns = [
      { header: "column 1", headerComponent: CustomHeader },
      { header: "column 2" }
    ]

    const wrapper = shallow(<TableHead columns={columns} />)

    const cells = findDataTests(wrapper, "cell")

    expect(cells.at(0).prop("children").type).toBe(CustomHeader)
    expect(cells.at(0).prop("children").props.header).toBe(columns[0].header)
  })
})
