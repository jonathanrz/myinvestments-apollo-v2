import { t } from "i18next"
import React, { Fragment } from "react"
import { Redirect } from "react-router"
import SaveIcon from "@material-ui/icons/Save"
import DeleteIcon from "@material-ui/icons/Delete"
import ButtonWithIcon from "app/common/ButtonWithIcon"
import Mutation from "app/common/Mutation"
import Snackbar from "app/common/Snackbar"
import ConfirmationDialog from "app/common/ConfirmationDialog"

function SaveButton({ disabled }) {
  return (
    <ButtonWithIcon
      type="submit"
      text={t("updatePage.saveButtonLabel")}
      icon={SaveIcon}
      disabled={disabled}
    />
  )
}

function DestroyButton({ disabled, onClick }) {
  return (
    <ButtonWithIcon
      text={t("updatePage.destroyButtonLabel")}
      icon={DeleteIcon}
      disabled={disabled}
      onClick={onClick}
    />
  )
}

function Buttons({
  data,
  destroyMutation,
  disabled,
  history,
  returnHref,
  ...props
}) {
  if (destroyMutation) {
    return (
      <Mutation redirectOnError={false} mutation={destroyMutation}>
        {(destroy, { loading, error, called }) => {
          const hasError = Boolean(error)
          const mutationErrored = called && !loading && hasError
          const mutationSucceded = called && !loading && !hasError

          return (
            <Fragment>
              {mutationErrored && (
                <Snackbar message={t("updatePage.destroyErrorMessage")} />
              )}
              {mutationSucceded && (
                <Fragment>
                  <Snackbar message={t("updatePage.destroySuccessMessage")} />
                  <Redirect to={returnHref(data)} />
                </Fragment>
              )}
              <ConfirmationDialog
                onConfirm={() => destroy({ variables: { id: data.id } })}
                message={t("updatePage.destroyConfirmMessage")}
              >
                {confirm => (
                  <DestroyButton
                    onClick={confirm}
                    disabled={disabled || loading}
                  />
                )}
              </ConfirmationDialog>
              <SaveButton disabled={disabled || loading} />
            </Fragment>
          )
        }}
      </Mutation>
    )
  }

  return <SaveButton disabled={disabled} />
}

export default Buttons
