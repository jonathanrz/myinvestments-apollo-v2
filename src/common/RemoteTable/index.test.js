import gql from "graphql-tag"
import React from "react"
import { shallow } from "enzyme"
import { findDataTest } from "app/utils/tests"
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
  })
})
