import React from "react"
import { formatCurrency } from "app/utils/currency"
import TextField from "app/common/TextField"

function CurrencyField({ label, value }) {
  return <TextField label={label} value={formatCurrency(value)} />
}

export default CurrencyField
