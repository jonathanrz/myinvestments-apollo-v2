import { compose } from "lodash/fp"
import React, { Component } from "react"
import { ApolloProvider, withApollo } from "react-apollo"
import { Router, withRouter } from "react-router-dom"
import { render, unmountComponentAtNode } from "react-dom"

class IndependentReactTree extends Component {
  componentDidMount() {
    this.node = document.createElement("div")
    document.body.appendChild(this.node)
    this.renderIndependentTree()
  }

  componentDidUpdate() {
    this.renderIndependentTree()
  }

  componentWillUnmount() {
    unmountComponentAtNode(this.node)
    document.body.removeChild(this.node)
  }

  renderIndependentTree() {
    const { children, client, history, ...props } = this.props

    render(
      <ApolloProvider client={client}>
        <Router history={history}>{children(props)}</Router>
      </ApolloProvider>,
      this.node
    )
  }

  render() {
    return null
  }
}

const EnhancedIndependentReactTree = compose(
  withRouter,
  withApollo
)(IndependentReactTree)

export function withIndependentReactTree(WrappedComponent) {
  return props => (
    <EnhancedIndependentReactTree {...props}>
      {props => <WrappedComponent {...props} />}
    </EnhancedIndependentReactTree>
  )
}

export default EnhancedIndependentReactTree
