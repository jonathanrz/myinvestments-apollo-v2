import React, { Component, createContext } from "react"
import queryString from "query-string"
import { reduce } from "lodash"
import { withRouter } from "react-router-dom"

const { Provider, Consumer: URLSearch } = createContext()

export class BaseURLSearchProvider extends Component {
  get search() {
    const { search } = this.props.history.location

    if (search) {
      return queryString.parse(search, { arrayFormat: "index" }) || {}
    }

    return {}
  }

  setSearch = values => {
    const { history } = this.props

    const search = queryString.stringify(
      reduce(
        {
          ...this.search,
          ...values
        },
        (acc, value, key) =>
          value === null || typeof value === "undefined"
            ? acc
            : {
                ...acc,
                [key]: value
              },
        {}
      ),
      { arrayFormat: "index" }
    )

    history.push({ search })
  }

  render() {
    return (
      <Provider
        value={{
          search: this.search,
          setSearch: this.setSearch
        }}
      >
        {this.props.children}
      </Provider>
    )
  }
}

export default URLSearch

export function withURLSearch(WrappedComponent) {
  return function(props) {
    return (
      <URLSearch>
        {urlSearchState => <WrappedComponent {...props} {...urlSearchState} />}
      </URLSearch>
    )
  }
}

export const URLSearchProvider = withRouter(BaseURLSearchProvider)
