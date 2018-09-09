import gql from "graphql-tag"
import React from "react"
import { shallow } from "enzyme"
import { findDataTest, expectDataTest } from "app/utils/tests"
import RemoteTable from "./index"

const someQuery = gql`
  {
    items {
      id
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

  describe("Query component", () => {
    function renderInner(
      queryState = {
        data: {
          items: "SOME DATA"
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
        edges: "SOME DATA",
        columns: "SOME COLUMNS"
      })
    })
  })
})
