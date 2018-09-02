import { t } from "i18next"
import { invoke } from "lodash/fp"
import React, { Fragment, Component } from "react"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"

class ConfirmationDialog extends Component {
  state = {
    open: false
  }

  openDialog = () => {
    this.setState({ open: true })
  }

  closeDialog = () => {
    this.setState({ open: false })
  }

  confirm = event => {
    if (event) {
      event.stopPropagation()
    }
    this.closeDialog()
    invoke("onConfirm", this.props)
  }

  cancel = () => {
    this.closeDialog()
    invoke("onCancel", this.props)
  }

  render() {
    const { children, message } = this.props

    return (
      <Fragment>
        {children(this.openDialog)}
        <Dialog open={this.state.open} onClose={this.cancel} data-test="dialog">
          <DialogContent>
            <DialogContentText>{message}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.cancel}
              data-test="cancel-button"
              color="primary"
            >
              {t("common.cancel")}
            </Button>
            <Button
              onClick={this.confirm}
              data-test="confirm-button"
              color="primary"
            >
              {t("common.ok")}
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    )
  }
}

export default ConfirmationDialog
