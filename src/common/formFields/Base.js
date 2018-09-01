import { identity, pipe } from "lodash/fp"
import React from "react"
import { Field } from "react-final-form"

function nullifyEmptyStringOrUndefined(value) {
  return value === "" || typeof value === "undefined" ? null : value
}

function BaseField({ parse = identity, nullify = true, ...props }) {
  return (
    <Field
      {...props}
      parse={
        nullify
          ? pipe(
              parse,
              nullifyEmptyStringOrUndefined
            )
          : undefined
      }
    />
  )
}

export default BaseField
