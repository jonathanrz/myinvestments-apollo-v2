import React from "react"
import { shallow } from "enzyme"
import { AuthProvider } from "./index"

describe("AuthProvider", () => {
  it("renders the context Provider with the right values", () => {
    const wrapper = shallow(
      <AuthProvider loggedIn="some logged in" setToken="some set token" />
    )

    expect(wrapper).toHaveProp("value", {
      loggedIn: "some logged in",
      setToken: "some set token"
    })
  })
})
