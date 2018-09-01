import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import PrivateRoute from "app/common/PrivateRoute"

/*
 * This will tell webpack to include on the final
 * bundle all the files ending with `.page.js` on
 * the pages folder, this way we can cache them
 * and the folder name to get them, without needing
 * to require each one with the full path
 */
const context = require.context("../pages", true, /\.page\.js$/)

const files = context.keys().reduce((acc, key) => {
  let name = key.substr(2).slice(0, -8)

  if (name.substr(-6) === "/index") {
    name = name.slice(0, -6)
  }

  return { ...acc, [name]: context(key) }
}, {})

/*
 * We use the same key on every route so
 * react updates the same tree when the route changes
 * this way the layout will be reused and we can
 * have persistent elements and avoid re-renders
 */
const routeBuilder = {
  routes: [],

  get() {
    return <Switch>{this.routes}</Switch>
  },

  private(path, file, namedExport = "default") {
    this.routes.push(
      <PrivateRoute
        key="1"
        exact
        path={path}
        component={files[file][namedExport]}
      />
    )

    return this
  },

  public(path, file, namedExport = "default") {
    this.routes.push(
      <Route key="1" exact path={path} component={files[file][namedExport]} />
    )

    return this
  },

  redirect(from, to) {
    this.routes.push(<Redirect key="1" exact from={from} to={to} />)

    return this
  },

  crud(preffix, file) {
    this.private(preffix, file, "ListPage")
    this.private(`${preffix}/create`, file, "CreatePage")
    this.private(`${preffix}/:id/update`, file, "UpdatePage")

    return this
  }
}

export default routeBuilder
