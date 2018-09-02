import { t } from "i18next"
import React, { Fragment } from "react"
import { Link } from "react-router-dom"
import AddIcon from "@material-ui/icons/Add"
import ButtonWithIcon from "app/common/ButtonWithIcon"
import PageHeader from "app/common/PageHeader"
import RemoteTable from "app/common/RemoteTable"
import SearchableRemoteTable from "app/common/SearchableRemoteTable"
import IconButton from "@material-ui/core/IconButton"
import EditIcon from "@material-ui/icons/Edit"

function ListPage({
  title,
  query,
  variables,
  columns,
  cellStyle,
  createHref,
  buildUpdateHref,
  hasSearch = false
}) {
  const TableComponent = hasSearch ? SearchableRemoteTable : RemoteTable

  return (
    <Fragment>
      <PageHeader
        data-test="page-header"
        title={title}
        buttons={
          <ButtonWithIcon
            component={Link}
            to={createHref}
            icon={AddIcon}
            text={t("listPage.createButtonLabel")}
          />
        }
      />
      <TableComponent
        data-test="base-list-page"
        query={query}
        variables={variables}
        cellStyle={cellStyle}
        columns={[
          ...columns,
          {
            columnProps: { numeric: true },
            header: "",
            component: ({ value }) => (
              <IconButton
                component={Link}
                to={buildUpdateHref(value)}
                data-test="update-link"
              >
                <EditIcon />
              </IconButton>
            )
          }
        ]}
      />
    </Fragment>
  )
}

export default ListPage
