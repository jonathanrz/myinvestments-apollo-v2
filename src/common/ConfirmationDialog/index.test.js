import React from "react"
import { shallow } from "enzyme"
import { findDataTest } from "app/utils/tests"
import ConfirmationDialog from "./index"

describe("ConfirmationDialog", () => {
  function build({ children = () => null, onConfirm, onCancel } = {}) {
    return shallow(
      <ConfirmationDialog onConfirm={onConfirm} onCancel={onCancel}>
        {children}
      </ConfirmationDialog>
    )
  }

  function isDialogOpen(wrapper) {
    return findDataTest(wrapper, "dialog").prop("open") === true
  }

  it("children can open the dialog", () => {
    let confirm

    const wrapper = build({
      children: _confirm => {
        confirm = _confirm
      }
    })

    expect(isDialogOpen(wrapper)).toBe(false)

    confirm()
    wrapper.update()

    expect(isDialogOpen(wrapper)).toBe(true)
  })

  it("dialog's onClose handler calls onCancel callback and closes the dialog", () => {
    let confirm
    const onCancel = jest.fn()
    const wrapper = build({
      onCancel,
      children: _confirm => {
        confirm = _confirm
      }
    })

    confirm()
    wrapper.update()

    expect(isDialogOpen(wrapper)).toBe(true)

    findDataTest(wrapper, "dialog").prop("onClose")()

    wrapper.update()

    expect(isDialogOpen(wrapper)).toBe(false)
    expect(onCancel).toHaveBeenCalledWith()
  })

  it("cancel button calls onCancel callback and closes the dialog", () => {
    let confirm
    const onCancel = jest.fn()
    const wrapper = build({
      onCancel,
      children: _confirm => {
        confirm = _confirm
      }
    })

    confirm()
    wrapper.update()

    expect(isDialogOpen(wrapper)).toBe(true)

    findDataTest(wrapper, "cancel-button").prop("onClick")()

    wrapper.update()

    expect(isDialogOpen(wrapper)).toBe(false)
    expect(onCancel).toHaveBeenCalledWith()
  })

  it("confirm button calls onCancel callback and closes the dialog", () => {
    let confirm
    const onConfirm = jest.fn()
    const wrapper = build({
      onConfirm,
      children: _confirm => {
        confirm = _confirm
      }
    })

    confirm()
    wrapper.update()

    expect(isDialogOpen(wrapper)).toBe(true)

    findDataTest(wrapper, "confirm-button").prop("onClick")()

    wrapper.update()

    expect(isDialogOpen(wrapper)).toBe(false)
    expect(onConfirm).toHaveBeenCalledWith()
  })
})
