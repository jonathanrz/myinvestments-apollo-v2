import { t } from "i18next"
import React, { Fragment } from "react"
import Button from "@material-ui/core/Button"
import { withStyles } from "@material-ui/core/styles"
import Mutation from "app/common/Mutation"
import NumericField from "app/common/formFields/Numeric"
import Snackbar from "app/common/Snackbar"
import FinalForm from "app/common/Form"
import { formatDateForApi } from "app/utils/date"
import mutation from "./mutation"
import query from "./query"

const styles = {
  input: {
    flexGrow: 1,
    marginRight: 16
  },
  submit: {
    height: "100%"
  }
}

const formStyle = {
  alignItems: "flex-end",
  display: "flex",
  marginTop: "16px"
}

function Form({ classes, investment }) {
  return (
    <Mutation
      refetchQueries={[{ query }]}
      redirectOnError={false}
      mutation={mutation}
      data-test="mutation"
    >
      {(mutate, { data } = {}) => (
        <FinalForm
          data-test="form"
          initialValues={{
            quantity: investment.lastIncome.quantity,
            value: investment.lastIncome.value
          }}
          style={formStyle}
          onSubmit={values =>
            mutate({
              variables: {
                data: {
                  ...values,
                  date: formatDateForApi(new Date())
                },
                investmentUuid: investment.uuid
              }
            })
              .then(() => null)
              .catch(error => error)
          }
        >
          {({ submitting, submitErrors, submitSucceeded }) => (
            <Fragment>
              {!submitting &&
                submitErrors && (
                  <Snackbar data-test="error-message" message={submitErrors} />
                )}
              <NumericField
                className={classes.input}
                name="quantity"
                label={t(`incomes.fields.quantity`)}
              />
              <NumericField
                className={classes.input}
                name="value"
                label={t(`incomes.fields.value`)}
              />
              <Button
                className={classes.submit}
                type="submit"
                variant="contained"
                color="primary"
                disabled={submitting}
              >
                {t("incomes.actions.save")}
              </Button>
            </Fragment>
          )}
        </FinalForm>
      )}
    </Mutation>
  )
}

export default withStyles(styles)(Form)
