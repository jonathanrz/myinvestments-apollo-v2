import React, { Component } from "react"
import { ApolloProvider } from "react-apollo"
import { HashRouter as Router } from "react-router-dom"
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
    token: localStorage.get("token")
  }

  constructor() {
    super()

    this.apolloClient = createApolloClient({
      getToken: this.getToken,
      onUnauthorized: this.onUnauthorized
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
                <Router>
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
