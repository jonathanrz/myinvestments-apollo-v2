import React from "react"
import { shallow } from "enzyme"
import { findDataTest } from "app/utils/tests"
import TableFooter from "./TableFooter"

describe("TableFooter", () => {
  it("renders TablePagination with the right props", () => {
    const wrapper = shallow(
      <TableFooter
        totalCount="SOME TOTAL COUNT"
        pageSize="SOME PAGE SIZE"
        page="SOME PAGE"
        onChangePage="SOME ON CHANGE PAGE"
        onChangeRowsPerPage="SOME ON CHANGE ROWS PER PAGE"
      />
    )

    const pagination = findDataTest(wrapper, "pagination")

    expect(pagination).toHaveProp({
      count: "SOME TOTAL COUNT",
      rowsPerPage: "SOME PAGE SIZE",
      page: "SOME PAGE",
      onChangePage: "SOME ON CHANGE PAGE",
      onChangeRowsPerPage: "SOME ON CHANGE ROWS PER PAGE"
    })
  })
})
