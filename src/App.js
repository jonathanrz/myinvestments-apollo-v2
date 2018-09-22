import React, { Component } from "react"
import { ApolloProvider } from "react-apollo"
import { Router } from "react-router-dom"
import createBrowserHistory from "history/createBrowserHistory"
import DateFnsUtils from "material-ui-pickers/utils/date-fns-utils"
import MuiPickersUtilsProvider from "material-ui-pickers/utils/MuiPickersUtilsProvider"
import ptDateFnLocale from "date-fns/locale/pt-BR"
import { AuthProvider } from "app/common/AuthContext"
import Layout from "app/common/Layout"
import { SnackbarProvider } from "app/common/Snackbar"
import { LoadingIndicatorProvider } from "app/common/LoadingIndicator"
import { URLSearchProvider } from "app/common/URLSearch"
import localStorage from "app/utils/localStorage"
import createApolloClient from "app/utils/createApolloClient"
import routes from "./routes"

class App extends Component {
  state = {
    token: localStorage.get("token"),
    error: false
  }

  constructor() {
    super()

    this.history = createBrowserHistory()

    this.apolloClient = createApolloClient({
      getToken: this.getToken,
      onUnauthorized: this.onUnauthorized
    })
  }

  componentDidCatch() {
    if (process.env.NODE_ENV !== "production") {
      return null
    }
    /*
     * We need to set the error state to true
     * to stop the rendering of the broken
     * tree, after that we can redirect the user
     * to the internal error page and then resume
     * the rendering
     */
    this.setState({ error: true }, () => {
      this.history.push("/internalError")
      this.setState({ error: false })
    })
  }

  getToken = () => {
    return this.state.token
  }

  setToken = token => {
    localStorage.set("token", token)
    this.setState({ token })
  }

  onUnauthorized = () => {
    this.setToken(null)
  }

  render() {
    if (this.state.error) {
      return null
    }

    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptDateFnLocale}>
        <LoadingIndicatorProvider>
          <ApolloProvider client={this.apolloClient}>
            <AuthProvider
              data-test="auth-provider"
              loggedIn={Boolean(this.state.token)}
              setToken={this.setToken}
            >
              <SnackbarProvider>
                <Router history={this.history}>
                  <URLSearchProvider>
                    <Layout>{routes}</Layout>
                  </URLSearchProvider>
                </Router>
              </SnackbarProvider>
            </AuthProvider>
          </ApolloProvider>
        </LoadingIndicatorProvider>
      </MuiPickersUtilsProvider>
    )
  }
}

export default App
