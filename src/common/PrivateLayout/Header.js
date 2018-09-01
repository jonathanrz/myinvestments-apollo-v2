import { t } from "i18next"
import React from "react"
import { withStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import { AuthConsumer } from "app/common/AuthContext"
import { LoadingIndicator } from "app/common/LoadingIndicator"
import AppBar from "app/common/AppBar"

const styles = theme => ({
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  loadingIndicator: {
    color: theme.palette.common.white,
    marginLeft: theme.spacing.unit * 2
  }
})

function Header({ classes, openMenu }) {
  return (
    <AppBar
      title={t("common.siteTitle")}
      data-test="root"
      beforeTitle={
        <IconButton
          color="inherit"
          onClick={openMenu}
          className={classes.menuButton}
          data-test="menu-button"
        >
          <MenuIcon />
        </IconButton>
      }
      afterTitle={
        <LoadingIndicator
          color="inherit"
          size={30}
          className={classes.loadingIndicator}
          data-test="loading-indicator"
        />
      }
      rightArea={
        <AuthConsumer>
          {({ setToken }) => (
            <Button color="inherit" onClick={() => setToken(null)}>
              {t("common.logout")}
            </Button>
          )}
        </AuthConsumer>
      }
    />
  )
}

export default withStyles(styles)(Header)
