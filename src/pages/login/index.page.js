import { t } from "i18next"
import { compose } from "lodash/fp"
import React, { Fragment } from "react"
import { graphql } from "react-apollo"
import { Redirect } from "react-router-dom"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import { withStyles } from "@material-ui/core/styles"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import { withAuthConsumer } from "app/common/AuthContext"
import Form from "app/common/Form"
import TextField from "app/common/formFields/Text"
import * as validations from "app/utils/validations"
import { CurrentUser } from "app/entities"

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  panel: {
    width: "80%",
    maxWidth: 340
  },
  toolbar: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
  form: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16
  }),
  actionRow: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: 32
  },
  submitError: {
    marginBottom: 16
  }
})

export function submit(login, setToken) {
  return async ({ email, password }) => {
    try {
      const response = await login({
        variables: { email, password }
      })

      if (response.data.login) {
        await setToken(response.data.login)
        return null
      }

      return "invalid login"
    } catch (error) {
      return error
    }
  }
}

function Login({ classes, mutate: login, loggedIn, setToken }) {
  return loggedIn ? (
    <Redirect to="/dashboard" />
  ) : (
    <Grid
      container
      alignItems="center"
      justify="center"
      className={classes.root}
    >
      <Paper className={classes.panel}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="title" color="inherit">
            {t("common.siteTitle")}
          </Typography>
        </Toolbar>
        <Form onSubmit={submit(login, setToken)} className={classes.form}>
          {({ submitting, submitErrors }) => (
            <Fragment>
              {submitErrors && (
                <Typography color="error" className={classes.submitError}>
                  {t("login.loginError")}
                </Typography>
              )}
              <TextField
                name="email"
                label={t("login.form.email")}
                type="email"
                validate={validations.composeValidators(
                  validations.required(),
                  validations.isEmail()
                )}
              />
              <TextField
                name="password"
                label={t("login.form.password")}
                type="password"
                validate={validations.required()}
              />
              <div className={classes.actionRow}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={submitting}
                >
                  {t("login.form.login")}
                </Button>
              </div>
            </Fragment>
          )}
        </Form>
      </Paper>
    </Grid>
  )
}

export default compose(
  withStyles(styles),
  withAuthConsumer,
  graphql(CurrentUser.loginMutation)
)(Login)
