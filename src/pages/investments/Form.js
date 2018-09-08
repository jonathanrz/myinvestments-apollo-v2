import { t } from "i18next"
import React, { Fragment } from "react"
import TextField from "app/common/formFields/Text"
import * as validations from "app/utils/validations"

const textFields = ["name", "type", "holder", "objective"]

function Form({ create }) {
  return (
    <Fragment>
      {textFields.map((field, index) => (
        <TextField
          key={index}
          name={field}
          label={t(`investments.fields.${field}`)}
          validate={validations.composeValidators(validations.required())}
        />
      ))}
    </Fragment>
  )
}

export default Form
