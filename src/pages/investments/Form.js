import { t } from "i18next"
import React, { Fragment } from "react"
import TextField from "app/common/formFields/Text"
import * as validations from "app/utils/validations"

function Form({ create }) {
  return (
    <Fragment>
      <TextField
        name="name"
        label={t("investments.fields.name")}
        type="name"
        validate={validations.composeValidators(validations.required())}
      />
    </Fragment>
  )
}

export default Form
