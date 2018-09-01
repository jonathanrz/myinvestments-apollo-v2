import React, { Component } from "react"
import { compose } from "lodash/fp"
import { withRouter } from "react-router-dom"
import { withStyles } from "@material-ui/core/styles"
import Header from "./Header"
import Menu from "./Menu"

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflowX: "hidden",
    position: "relative",
    display: "flex",
    flexDirection: "column"
  },
  content: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0 // So the Typography noWrap works.
  }
})

export class PrivateLayout extends Component {
  state = {
    menuOpen: false
  }

  componentDidMount() {
    this.unlisten = this.props.history.listen(this.closeMenu)
  }

  componentWillUnmount() {
    this.unlisten()
  }

  openMenu = () => {
    this.setState({ menuOpen: true })
  }

  closeMenu = () => {
    this.setState({ menuOpen: false })
  }

  render() {
    const { classes, children } = this.props
    const { menuOpen } = this.state

    return (
      <div data-test="root" className={classes.root}>
        <Header openMenu={this.openMenu} />
        <Menu data-test="menu" open={menuOpen} onClose={this.closeMenu} />
        <main data-test="content" className={classes.content}>
          {children}
        </main>
      </div>
    )
  }
}

export default compose(
  withStyles(styles),
  withRouter
)(PrivateLayout)
