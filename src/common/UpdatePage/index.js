import { t } from "i18next"
import { omit, identity } from "lodash/fp"
import React from "react"
import Query from "app/common/Query"
import FormPage from "app/common/FormPage"
import { getQueryKey } from "app/utils/graphql"
import Buttons from "./Buttons"

function UpdatePage({
  query,
  uuid,
  updateMutation,
  destroyMutation,
  parseInput = identity,
  parseOutput = identity,
  successMessage = t("updatePage.defaultSuccessMessage"),
  errorMessage = t("updatePage.defaultErrorMessage"),
  returnHref,
  ...props
}) {
  const queryKey = getQueryKey(query)

  return (
    <Query query={query} variables={{ uuid }}>
      {({ data, loading }) => {
        if (loading) {
          return null
        }

        const record = parseInput(data[queryKey])

        if (!record) {
          throw new Error("Record not found")
        }

        return (
          <FormPage
            {...props}
            mutation={updateMutation}
            parseVariables={values => ({ uuid, input: parseOutput(values) })}
            initialValues={omit(["uuid", "__typename"], record)}
            successMessage={successMessage}
            errorMessage={errorMessage}
            returnHref={returnHref}
            buttons={
              <Buttons
                data={data[queryKey]}
                destroyMutation={destroyMutation}
                returnHref={returnHref}
              />
            }
          />
        )
      }}
    </Query>
  )
}

export default UpdatePage
