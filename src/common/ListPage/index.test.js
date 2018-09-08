import gql from "graphql-tag"
import React from "react"
import { shallow } from "enzyme"
import { findDataTest } from "app/utils/tests"
import ListPage from "./index"
import { Link } from "react-router-dom"

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
  let buildUpdateHref = jest.fn(it => it)

  beforeEach(() => {
    wrapper = shallow(
      <ListPage
        title="SOME TITLE"
        query={someQuery}
        columns={["SOME COLUMNS"]}
        createHref="SOME CREATE HREF"
        buildUpdateHref={buildUpdateHref}
      />
    )
  })

  describe("ListPage", () => {
    it("renders the PageHeader", () => {
      const pageHeader = findDataTest(wrapper, "page-header")
      const createButton = pageHeader.prop("buttons")
      expect(pageHeader).toHaveProp("title", "SOME TITLE")
      expect(createButton.props.to).toBe("SOME CREATE HREF")
    })

    it("renders the Edit column at the end of columns", () => {
      const columns = findDataTest(wrapper, "base-list-page").props().columns
      const lastColumn = columns[columns.length - 1]
      expect(lastColumn.header).toEqual("")

      const editComponent = shallow(
        lastColumn.component({ value: "column fake value" })
      )
      const updateLink = findDataTest(editComponent, "update-link")
      expect(updateLink).toHaveProp({
        component: Link
      })
    })
  })
})
