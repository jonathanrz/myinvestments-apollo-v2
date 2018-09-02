import React from "react"
import Paper from "@material-ui/core/Paper"
import Input from "@material-ui/core/Input"
import { withStyles } from "@material-ui/core/styles"
import SearchIcon from "@material-ui/icons/Search"

function SearchInput({ defaultValue = "", onChange, classes, placeholder }) {
  function onInputChange(event) {
    onChange(event.target.value)
  }

  return (
    <Paper className={classes.container}>
      <Input
        data-test="input"
        className={classes.input}
        defaultValue={defaultValue}
        onChange={onInputChange}
        startAdornment={
          <div className={classes.iconWrapper}>
            <SearchIcon />
          </div>
        }
        disableUnderline
        placeholder={placeholder}
      />
    </Paper>
  )
}

const styles = theme => ({
  container: {
    marginBottom: 20
  },
  input: {
    width: "100%",
    fontSize: 18
  },
  iconWrapper: {
    display: "flex",
    alignItems: "center"
  }
})

export default withStyles(styles)(SearchInput)
