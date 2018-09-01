import { compact } from "lodash/fp"
import React, { Fragment } from "react"
import { Redirect } from "react-router-dom"
import { withStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Mutation from "app/common/Mutation"
import Snackbar from "app/common/Snackbar"
import Form from "app/common/Form"
import PageHeader from "app/common/PageHeader"

const styles = theme => ({
  panel: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16
  })
})

function renderButtons(buttons, submitting) {
  if (Array.isArray(buttons)) {
    return compact(buttons).map((button, index) => (
      <button.type key={index} disabled={submitting} {...button.props} />
    ))
  }

  return <buttons.type {...buttons.props} disabled={submitting} />
}

function FormPage({
  classes,
  title,
  mutation,
  children,
  initialValues,
  returnHref,
  parseVariables,
  successMessage,
  errorMessage,
  paperWrapper,
  buttons
}) {
  return (
    <Mutation redirectOnError={false} mutation={mutation} data-test="mutation">
      {(mutate, { data } = {}) => (
        <Form
          data-test="form"
          initialValues={initialValues}
          onSubmit={values =>
            mutate({
              variables: parseVariables(values)
            })
              .then(() => null)
              .catch(error => error)
          }
        >
          {({ submitting, submitErrors, submitSucceeded }) =>
            submitSucceeded ? (
              <Fragment>
                <Snackbar
                  data-test="success-message"
                  message={successMessage}
                />
                <Redirect data-test="redirect" push to={returnHref(data)} />
              </Fragment>
            ) : (
              <Fragment>
                {!submitting &&
                  submitErrors && (
                    <Snackbar
                      data-test="error-message"
                      message={
                        typeof errorMessage === "function"
                          ? errorMessage(submitErrors)
                          : errorMessage
                      }
                    />
                  )}
                <PageHeader
                  data-test="page-header"
                  title={title}
                  buttons={buttons && renderButtons(buttons, submitting)}
                />
                <Paper className={classes.panel}>{children}</Paper>
              </Fragment>
            )
          }
        </Form>
      )}
    </Mutation>
  )
}

export default withStyles(styles)(FormPage)
