import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";

export const menuItems = [
  /*
   * Content related pages
   */
  { to: "/", text: "Dashboard" },
  { divider: true }
];

const styles = theme => ({
  drawerPaper: {
    width: 310
  },
  listItemText: {
    fontSize: 14
  }
});

class Menu extends Component {
  renderMenuLink = ({ to, text, divider }, index) => {
    if (divider) {
      return <Divider key={index} data-test="divider" />;
    }

    return (
      <ListItem key={index} button component={Link} to={to} data-test="link">
        <ListItemText
          primary={text}
          classes={{ primary: this.props.classes.listItemText }}
          data-test="link-text"
        />
      </ListItem>
    );
  };

  render() {
    const { classes, open, onClose } = this.props;

    return (
      <Drawer
        open={open}
        onClose={onClose}
        classes={{ paper: classes.drawerPaper }}
      >
        <List>{menuItems.map(this.renderMenuLink)}</List>
      </Drawer>
    );
  }
}

export default withStyles(styles)(Menu);
