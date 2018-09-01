import React from "react"
import { Route, Redirect } from "react-router-dom"
import { shallow } from "enzyme"
import { findDataTest } from "app/utils/tests"
import PrivateRoute from "./index"

let mockLoggedIn

jest.mock("app/common/AuthContext", () => ({
  AuthConsumer: ({ children }) => children({ loggedIn: mockLoggedIn })
}))

describe("PrivateRoute", () => {
  beforeEach(() => {
    mockLoggedIn = true
  })

  it("passes the route props to the Route component", () => {
    const wrapper = shallow(
      <PrivateRoute
        someProp="someProp"
        someOtherProp="someOtherProp"
        component="someComponent"
      />
    )

    const route = wrapper.find(Route)

    expect(route).toHaveProp("render")
    expect(route).toHaveProp("someProp", "someProp")
    expect(route).toHaveProp("someOtherProp", "someOtherProp")
    expect(route).not.toHaveProp("component", "someComponent")
  })

  it("redirects to login if the user is logged out", () => {
    mockLoggedIn = false
    const wrapper = shallow(
      shallow(<PrivateRoute />).prop("render")({ location: "some location" })
    )

    expect(wrapper.type()).toBe(Redirect)

    expect(wrapper).toHaveProp("to", {
      pathname: "/login",
      state: { from: "some location" }
    })
  })

  it("renders the desired if the user is logged in", () => {
    const SomeComponent = () => null

    const wrapper = shallow(
      shallow(<PrivateRoute component={SomeComponent} />).prop("render")({
        someProp: "someProp"
      })
    )

    const component = findDataTest(wrapper, "component")

    expect(component.type()).toBe(SomeComponent)
    expect(component).toHaveProp("someProp", "someProp")
  })
})
