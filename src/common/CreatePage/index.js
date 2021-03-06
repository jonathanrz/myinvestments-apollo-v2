import { t } from "i18next"
import { identity } from "lodash/fp"
import React from "react"
import SaveIcon from "@material-ui/icons/Save"
import ButtonWithIcon from "app/common/ButtonWithIcon"
import FormPage from "app/common/FormPage"

function CreatePage({
  parseOutput = identity,
  parseVariables = () => {},
  successMessage = t("createPage.defaultSuccessMessage"),
  errorMessage = t("createPage.defaultErrorMessage"),
  ...props
}) {
  return (
    <FormPage
      {...props}
      parseVariables={values => ({
        data: parseOutput(values),
        ...parseVariables(props)
      })}
      successMessage={successMessage}
      errorMessage={errorMessage}
      buttons={
        <ButtonWithIcon
          type="submit"
          text={t("createPage.createButtonLabel")}
          icon={SaveIcon}
        />
      }
    />
  )
}

export default CreatePage
