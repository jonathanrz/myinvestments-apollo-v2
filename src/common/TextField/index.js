import React from "react"
import MUITextField from "@material-ui/core/TextField"

function TextField({ label, value }) {
  return <MUITextField label={label} value={value} disabled />
}

export default TextField
