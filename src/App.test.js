import React from "react"
import { shallow } from "enzyme"
import { findDataTest } from "app/utils/tests"
import App from "./App"

jest.mock("app/utils/createApolloClient")

jest.mock("app/common/IndependentReactTree", () => ({
  withIndependentReactTree: f => f
}))

/*
 * The routes file uses require.context
 * and we can't mock that on the jest
 * environment
 */
jest.mock("./routes", () => ({
  default: () => null
}))

describe("App", () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it("gets the stored token", () => {
    window.localStorage.setItem("token", JSON.stringify("SOME TOKEN"))
    const wrapper = shallow(<App />)
    expect(wrapper).toHaveState("token", "SOME TOKEN")
  })

  it("setToken stores the token on localStorage", () => {
    shallow(<App />)
      .instance()
      .setToken("SOME TOKEN")

    expect(window.localStorage.getItem("token")).toBe(
      JSON.stringify("SOME TOKEN")
    )
  })

  it("renders AuthProvider with the right props", () => {
    const wrapper = shallow(<App />)
    const setToken = wrapper.instance().setToken
    const loggedOutAuthProvider = findDataTest(wrapper, "auth-provider")

    expect(loggedOutAuthProvider).toHaveProp("setToken", setToken)
    expect(loggedOutAuthProvider).toHaveProp("loggedIn", false)

    setToken({ token: "SOME TOKEN" })
    wrapper.update()

    const loggedInAuthProvider = findDataTest(wrapper, "auth-provider")

    expect(loggedInAuthProvider).toHaveProp("setToken", setToken)
    expect(loggedInAuthProvider).toHaveProp("loggedIn", true)
  })
})
