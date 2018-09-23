import { t } from "i18next"
import React, { Fragment } from "react"
import DateField from "app/common/formFields/Date"
import NumericField from "app/common/formFields/Numeric"
import * as validations from "app/utils/validations"

const requiredFields = ["quantity", "value"]
const fields = ["bought", "sold", "gross", "ir", "fee"]

function Form({ create }) {
  return (
    <Fragment>
      <DateField
        name="date"
        label={t("incomes.fields.date")}
        validate={validations.required()}
      />
      {requiredFields.map((field, index) => (
        <NumericField
          key={`required-${index}`}
          name={field}
          label={t(`incomes.fields.${field}`)}
          validate={validations.required()}
        />
      ))}
      {fields.map((field, index) => (
        <NumericField
          key={`field-${index}`}
          name={field}
          label={t(`incomes.fields.${field}`)}
        />
      ))}
    </Fragment>
  )
}

export default Form
