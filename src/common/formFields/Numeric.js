import React from "react"
import TextField from "app/common/formFields/Text"

function Numeric(props) {
  return (
    <TextField
      {...props}
      parse={value => value && value.replace(/[^\d]/g, "")}
    />
  )
}

export default Numeric
