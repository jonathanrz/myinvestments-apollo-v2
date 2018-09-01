import { t } from "i18next"
import { trim, isEmpty, pipe } from "lodash/fp"

export function required(i18nextKey = "common.validations.required") {
  return value =>
    pipe(
      trim,
      isEmpty
    )(value)
      ? t(i18nextKey)
      : undefined
}

export function isEmail(i18nextKey = "common.validations.isEmail") {
  return value =>
    value &&
    !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      value
    )
      ? t(i18nextKey)
      : undefined
}

export function minLength(length, i18nextKey = "common.validations.minLength") {
  return value =>
    value && value.length < length ? t(i18nextKey, { length }) : undefined
}

export function color(i18nextKey = "common.validations.color") {
  return value =>
    value && /^#[0-9A-F]{6}$/i.test(value) ? undefined : t(i18nextKey)
}

export function composeValidators(...validators) {
  return (value, values) =>
    validators.reduce(
      (error, validator) =>
        error || (validator ? validator(value, values) : error),
      undefined
    )
}
