import React, { Component, Fragment } from "react"
import { throttle } from "lodash/fp"
import { withURLSearch } from "app/common/URLSearch"
import SearchInput from "app/common/SearchInput"
import RemoteTable from "app/common/RemoteTable"

class SearchableRemoteTable extends Component {
  onSearchChange = throttle(500, value => {
    this.props.setSearch({ search: value || null })
  })

  render() {
    const {
      search: { search: value },
      setSearch,
      ...restProps
    } = this.props

    return (
      <Fragment>
        <SearchInput
          defaultValue={value}
          onChange={this.onSearchChange}
          placeholder="Digite aqui para pesquisar"
        />
        <RemoteTable {...restProps} variables={{ search: value }} />
      </Fragment>
    )
  }
}

export default withURLSearch(SearchableRemoteTable)
