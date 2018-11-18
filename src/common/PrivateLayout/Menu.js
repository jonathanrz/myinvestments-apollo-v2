import { t } from "i18next"
import React, { Component, Fragment } from "react"
import { Link } from "react-router-dom"
import { withStyles } from "@material-ui/core/styles"
import Drawer from "@material-ui/core/Drawer"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import Divider from "@material-ui/core/Divider"
import ListItemText from "@material-ui/core/ListItemText"
import Collapse from "@material-ui/core/Collapse"
import ExpandLess from "@material-ui/icons/ExpandLess"
import ExpandMore from "@material-ui/icons/ExpandMore"

export const menuItems = [
  {
    group: true,
    text: t("common.menu.dashboard"),
    controlKey: "dashboardExpanded",
    items: [
      { to: "/", text: t("common.menu.dashboard") },
      { to: "/dashboardMonth", text: t("common.menu.dashboardMonthYield") },
      {
        to: "/dashboardInvestmentValue",
        text: t("common.menu.dashboardInvestmentValue")
      },
      {
        to: "/dashboardDueDate",
        text: t("common.menu.dashboardDueDate")
      },
      {
        to: "/dashboardActiveInvestments",
        text: t("common.menu.dashboardActiveInvestments")
      },
      {
        to: "/dashboardSoldInvestments",
        text: t("common.menu.dashboardSoldInvestments")
      }
    ]
  },
  {
    group: true,
    text: t("common.menu.investments"),
    controlKey: "investmentsExpanded",
    items: [
      { to: "/investments", text: t("common.menu.investmentsActual") },
      { to: "/investmentsSold", text: t("common.menu.investmentsSold") },
      { to: "/investmentsOfMonth", text: t("common.menu.investmentsOfMonth") }
    ]
  },
  { divider: true }
]

const styles = theme => ({
  drawerPaper: {
    width: 310
  },
  listItemText: {
    fontSize: 14
  },
  listSubItemText: {
    fontSize: 14,
    marginLeft: 20
  }
})

class Menu extends Component {
  state = {
    dashboardExpanded: true,
    investmentsExpanded: true
  }

  renderDivider = (_, index) => {
    return <Divider key={index} data-test="divider" />
  }

  renderGroupItem = ({ to, text, controlKey, items }, index) => {
    return (
      <Fragment key={index}>
        <ListItem
          key={index}
          button
          data-test="group"
          onClick={() =>
            this.setState({ [controlKey]: !this.state[controlKey] })
          }
        >
          <ListItemText
            primary={text}
            classes={{ primary: this.props.classes.listItemText }}
            data-test="link-text"
          />
          {this.state[controlKey] ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state[controlKey]} timeout="auto" unmountOnExit>
          <List component="div">
            {items.map((item, itemIndex) => (
              <ListItem
                key={`${index}-${itemIndex}`}
                button
                component={Link}
                to={item.to}
                data-test="link"
              >
                <ListItemText
                  primary={item.text}
                  classes={{ primary: this.props.classes.listSubItemText }}
                  data-test="link-text"
                />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </Fragment>
    )
  }

  renderMenuLink = ({ to, text }, index) => {
    return (
      <ListItem key={index} button component={Link} to={to} data-test="link">
        <ListItemText
          primary={text}
          classes={{ primary: this.props.classes.listItemText }}
          data-test="link-text"
        />
      </ListItem>
    )
  }

  render() {
    const { classes, open, onClose } = this.props

    return (
      <Drawer
        open={open}
        onClose={onClose}
        classes={{ paper: classes.drawerPaper }}
      >
        <List>
          {menuItems.map(
            (item, index) =>
              item.divider
                ? this.renderDivider(item, index)
                : item.group
                  ? this.renderGroupItem(item, index)
                  : this.renderMenuLink(item, index)
          )}
        </List>
      </Drawer>
    )
  }
}

export default withStyles(styles)(Menu)
