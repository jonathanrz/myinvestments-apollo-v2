import { t } from "i18next"
import React, { Fragment } from "react"
import DateField from "app/common/formFields/Date"
import TextField from "app/common/formFields/Text"
import * as validations from "app/utils/validations"

const textFields = ["name", "type", "incomeType", "holder", "objective"]

function Form() {
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
      <DateField name="dueDate" label={t("investments.fields.dueDate")} />
    </Fragment>
  )
}

export default Form
