import { times, get } from "lodash/fp"
import React from "react"
import { shallow } from "enzyme"
import { findDataTests, findDataTest } from "app/utils/tests"
import TableBody from "./TableBody"

describe("TableBody", () => {
  let wrapper

  const buildUpdateHref = ({ prop6 }) => `update-link-${prop6}`

  const edges = times(10, i => ({
    uuid: i,
    prop1: `prop1-${i}`,
    prop2: `prop2-${i}`,
    prop3: `prop3-${i}`,
    prop4: `prop4-${i}`,
    prop5: `prop5-${i}`,
    prop6: `prop6-${i}`,
    some: { deep: { prop: `some.deep.prop-${i}` } }
  }))

  const columns = [
    { path: "prop1" },
    { path: "prop2" },
    { path: "prop3" },
    { path: "prop4" },
    { path: "prop5" },
    { path: "some.deep.prop" }
  ]

  beforeEach(() => {
    wrapper = shallow(
      <TableBody
        columns={columns}
        edges={edges}
        buildUpdateHref={buildUpdateHref}
      />
    )
  })

  it("renders the table body", () => {
    const rows = findDataTests(wrapper, "row")

    rows.forEach((row, rowIndex) => {
      const cells = findDataTests(row, "cell")
      const node = edges[rowIndex]

      columns.forEach((column, cellIndex) => {
        expect(cells.at(cellIndex)).toHaveProp(
          "children",
          get(column.path, node)
        )
      })
    })
  })

  it("renders the edit link", () => {
    const rows = findDataTests(wrapper, "row")

    rows.forEach((row, rowIndex) => {
      const updateLink = findDataTests(row, "update-link")
      const node = edges[rowIndex]

      expect(updateLink).toHaveProp("to", `update-link-${node.prop6}`)
    })
  })

  it("accepts a custom component", () => {
    const CustomComponent = () => null

    wrapper = shallow(
      <TableBody
        columns={[{ path: "name", component: CustomComponent }]}
        edges={[{ uuid: 1, name: "Some Name" }]}
        buildUpdateHref={() => null}
      />
    )

    const cell = findDataTest(wrapper, "cell")

    expect(cell.prop("children").type).toBe(CustomComponent)
    expect(cell.prop("children").props.value).toBe("Some Name")
  })
})
