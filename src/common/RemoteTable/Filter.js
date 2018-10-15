import React, { Component, Fragment } from "react"
import { t } from "i18next"
import { withStyles } from "@material-ui/core/styles"
import FormControl from "@material-ui/core/FormControl"
import InputLabel from "@material-ui/core/InputLabel"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    margin: theme.spacing.unit
  },
  formControl: {
    flexGrow: 1,
    margin: theme.spacing.unit,
    minWidth: 120
  }
})

class Filter extends Component {
  state = {}

  extractFilterOptions = filter => {
    return [
      { label: t("common.none"), value: "" },
      ...this.props.result
        .map(r => r[filter.key])
        .filter((value, index, self) => self.indexOf(value) === index)
        .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
        .map(v => ({ label: v, value: v }))
    ]
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  filterElement = element => {
    const { filters } = this.props
    return filters.reduce(
      (acc, filter) =>
        acc && this.state[filter.key]
          ? element[filter.key] === this.state[filter.key]
          : acc,
      true
    )
  }

  render() {
    const { classes, filters, result, children } = this.props

    return (
      <Fragment>
        <form className={classes.root} autoComplete="off">
          {filters.map((filter, index) => (
            <FormControl key={index} className={classes.formControl}>
              <InputLabel htmlFor={`${filter.key}-simple`}>
                {filter.name}
              </InputLabel>
              <Select
                value={this.state[filter.key] || ""}
                onChange={this.handleChange}
                inputProps={{
                  name: filter.key,
                  id: `${filter.key}-simple`
                }}
              >
                {this.extractFilterOptions(filter).map(
                  (option, optionIndex) => (
                    <MenuItem
                      key={`${index}-${optionIndex}`}
                      value={option.value}
                    >
                      {option.label}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
          ))}
        </form>
        {children(result.filter(this.filterElement))}
      </Fragment>
    )
  }
}

export default withStyles(styles)(Filter)
