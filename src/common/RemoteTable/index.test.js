import gql from "graphql-tag"
import React from "react"
import { shallow } from "enzyme"
import { findDataTest, expectDataTest } from "app/utils/tests"
import RemoteTable from "./index"

const someQuery = gql`
  {
    items {
      uuid
      name
    }
  }
`

describe("ListPage", () => {
  let wrapper
  const headerComponent = () => <div>Header</div>

  beforeEach(() => {
    wrapper = shallow(
      <RemoteTable
        query={someQuery}
        columns="SOME COLUMNS"
        headerComponent={headerComponent}
      />
    )
  })

  it("onChangePage method sets the page", () => {
    const page = Math.random()
    wrapper.instance().onChangePage(new Event("some event"), page)
    expect(wrapper).toHaveState("page", page)
  })

  it("onChangeRowsPerPage method sets the number of rows per page", () => {
    const pageSize = Math.random()
    wrapper.instance().onChangeRowsPerPage({ target: { value: pageSize } })
    expect(wrapper).toHaveState("pageSize", pageSize)
  })

  it("passes the right props to the Query component", () => {
    wrapper.setState({ page: 0, pageSize: "SOME PAGE SIZE" })

    expectDataTest(wrapper, "query").toHaveProp({
      query: someQuery,
      variables: { page: 1, pageSize: "SOME PAGE SIZE" }
    })
  })

  describe("Query component", () => {
    function renderInner(
      queryState = {
        data: {
          items: {
            totalCount: "SOME TOTAL COUNT",
            edges: "SOME EDGES"
          }
        }
      }
    ) {
      const query = findDataTest(wrapper, "query")

      return shallow(<div>{query.prop("children")(queryState)}</div>)
    }

    it("renders nothing if the query is loading", () => {
      expect(renderInner({ loading: true })).toHaveProp("children", null)
    })

    it("passes the right props to TableHead component", () => {
      expectDataTest(renderInner(), "table-head").toHaveProp(
        "columns",
        "SOME COLUMNS"
      )
    })

    it("passes the right props to TableBody component", () => {
      expectDataTest(renderInner(), "table-body").toHaveProp({
        edges: "SOME EDGES",
        columns: "SOME COLUMNS"
      })
    })

    it("passes the right props to TableFooter component", () => {
      wrapper.setState({ page: "SOME PAGE", pageSize: "SOME PAGE SIZE" })

      expectDataTest(renderInner(), "table-footer").toHaveProp({
        page: "SOME PAGE",
        pageSize: "SOME PAGE SIZE",
        totalCount: "SOME TOTAL COUNT",
        onChangePage: wrapper.instance().onChangePage,
        onChangeRowsPerPage: wrapper.instance().onChangeRowsPerPage
      })
    })
  })
})
