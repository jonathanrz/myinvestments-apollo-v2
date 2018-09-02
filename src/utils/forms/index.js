import React from "react"
import BaseField from "app/common/formFields/Base"

export function makeField(render, displayName) {
  const Field = props => {
    return <BaseField {...props} render={render} />
  }

  Field.displayName = displayName

  return Field
}

export function withField(field, { prop, validate } = {}) {
  return Component => props => {
    const fieldName = typeof field === "function" ? field(props) : field

    return (
      <BaseField name={fieldName} validate={validate}>
        {({ input: { value, onChange }, meta }) => (
          <Component
            {...{
              ...props,
              [prop || fieldName]: {
                meta,
                value,
                setValue: onChange
              }
            }}
          />
        )}
      </BaseField>
    )
  }
}

export function normalizeObject(config) {
  return values => {
    const normalizedValues = { ...values }

    for (let key in config) {
      normalizedValues[key] = config[key](values)
    }

    return normalizedValues
  }
}
