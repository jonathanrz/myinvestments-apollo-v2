import { t } from "i18next"
import React from "react"
import * as entities from "app/entities"
import ListPage from "app/common/ListPage"
import CreatePage from "app/common/CreatePage"
import UpdatePage from "app/common/UpdatePage"

function createCRUD({
  entity: entityName,
  cellStyle,
  pathPreffix,
  i18nKey,
  listColumns,
  upsertForm: UpsertForm,
  create,
  update,
  upsert,
  hasSearch
}) {
  const path = path => `/${pathPreffix}${path || ""}`

  const {
    getQuery,
    listQuery,
    createMutation,
    updateMutation,
    destroyMutation
  } = entities[entityName]

  const listPageProps = {
    title: t(`${i18nKey}.listPage.title`),
    query: listQuery,
    createHref: path("/create"),
    buildUpdateHref: node => `/${pathPreffix}/${node.uuid}/update`,
    columns: listColumns,
    cellStyle,
    hasSearch
  }

  const createPageProps = {
    title: t(`${i18nKey}.upsertPages.createTitle`),
    mutation: createMutation,
    ...create
  }

  const updatePageProps = {
    title: t(`${i18nKey}.upsertPages.updateTitle`),
    query: getQuery,
    updateMutation: updateMutation,
    destroyMutation: destroyMutation,
    ...update
  }

  const upsertPageProps = {
    returnHref: () => path(),
    errorMessage: t(`${i18nKey}.upsertPages.genericErrorMessage`),
    ...upsert
  }

  function GeneratedListPage(props) {
    return <ListPage {...listPageProps} {...props} />
  }

  function GeneratedCreatePage(props) {
    return (
      <CreatePage {...upsertPageProps} {...createPageProps} {...props}>
        <UpsertForm {...props} create />
      </CreatePage>
    )
  }

  function GeneratedUpdatePage(props) {
    const { uuid } = props.match.params

    return (
      <UpdatePage
        uuid={uuid}
        {...upsertPageProps}
        {...updatePageProps}
        {...props}
      >
        <UpsertForm {...props} update />
      </UpdatePage>
    )
  }

  GeneratedListPage.displayName = `${entityName}List
  `
  GeneratedCreatePage.displayName = `${entityName}Update`

  GeneratedUpdatePage.displayName = `${entityName}Update`

  return {
    ListPage: GeneratedListPage,
    CreatePage: GeneratedCreatePage,
    UpdatePage: GeneratedUpdatePage
  }
}

export default createCRUD
