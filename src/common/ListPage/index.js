import { t } from "i18next"
import React, { Fragment } from "react"
import { Link } from "react-router-dom"
import AddIcon from "@material-ui/icons/Add"
import ButtonWithIcon from "app/common/ButtonWithIcon"
import PageHeader from "app/common/PageHeader"
import RemoteTable from "app/common/RemoteTable"

function ListPage({
  title,
  query,
  variables,
  columns,
  cellStyle,
  createHref,
  buildUpdateHref,
  listCard
}) {
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
      <RemoteTable
        data-test="base-list-page"
        query={query}
        variables={variables}
        cellStyle={cellStyle}
        buildUpdateHref={buildUpdateHref}
        listCard={listCard}
      />
    </Fragment>
  )
}

export default ListPage
