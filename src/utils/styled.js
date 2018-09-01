import React from "react"
import cx from "classnames"
import { withStyles } from "@material-ui/core/styles"

function callIfFunction(arg, ...args) {
  if (typeof arg === "function") {
    return arg(...args)
  }

  return arg
}

export default function styled(
  Component,
  styles,
  defaultProps,
  classNameProp = "className"
) {
  return withStyles(theme => ({
    root: callIfFunction(styles, theme)
  }))(({ classes, className, ...props }) => (
    <Component
      {...{
        ...callIfFunction(defaultProps || {}, props),
        ...props,
        [classNameProp]: cx(classes.root, className)
      }}
    />
  ))
}
