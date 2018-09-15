import React, { Fragment } from "react"
import { shallow } from "enzyme"
import * as T from "./tests"

describe("byTestId", () => {
  it("returns true if the data-test prop matches the id", () => {
    const wrapper = shallow(<div data-test="some id" />)
    expect(T.byTestId("some id")(wrapper)).toBe(true)
  })

  it("returns false if the data-test prop does not matches the id", () => {
    const wrapper = shallow(<div data-test="some id" />)
    expect(T.byTestId("some other id")(wrapper)).toBe(false)
  })
})

describe("callProp", () => {
  it("calls a prop on the shallow wrapper", () => {
    const onClick = jest.fn()
    const wrapper = shallow(<button onClick={onClick}>some button</button>)

    T.callProp("onClick", "arg1", "arg2")(wrapper)

    expect(onClick).toHaveBeenCalledWith("arg1", "arg2")
  })

  it("returns the result of the function call", () => {
    const onClick = () => "some result"
    const wrapper = shallow(<button onClick={onClick}>some button</button>)
    const result = T.callProp("onClick", "arg1", "arg2")(wrapper)

    expect(result).toBe("some result")
  })
})

describe("renderProp", () => {
  it("shallow renders the return of the render prop of a shallow wrapper", () => {
    const wrapper = shallow(
      <select>
        {(value, label) => <option value={value}>{label}</option>}
      </select>
    )

    const child = T.renderProp("children", "some value", "some label")(wrapper)

    expect(child).toHaveProp({
      value: "some value",
      children: "some label"
    })
  })

  it("wraps Fragments into divs", () => {
    const wrapper = shallow(
      <div>
        {() => (
          <Fragment>
            <span />
            <span />
            <span />
          </Fragment>
        )}
      </div>
    )

    const child = T.renderProp("children")(wrapper)

    expect(child.type()).toBe("div")
    expect(child.children()).toHaveLength(3)
  })

  it("returns null if the render prop returns null", () => {
    const wrapper = shallow(<div>{() => null}</div>)
    const child = T.renderProp("children")(wrapper)
    expect(child).toBe(null)
  })
})

describe("until", () => {
  it("dives into the shallow wrapper until the matcher is statisfied", () => {
    const Comp1 = () => <Comp2 />
    const Comp2 = () => <Comp3 />
    const Comp3 = () => <Comp4 />
    const Comp4 = () => <Comp5 />
    const Comp5 = () => <div>done!</div>

    const wrapper = T.until(e => e.type() === "div")(shallow(<Comp1 />))

    expect(wrapper).toHaveText("done!")
  })
})

describe("findDataTest", () => {
  it("returns all elements inside a shallow wrapper that have the test id", () => {
    const wrapper = shallow(
      <div>
        <span data-test="some id">span 1</span>
        <span data-test="some id">span 2</span>
      </div>
    )

    expect(T.findDataTest(wrapper, "some id")).toHaveLength(2)
  })
})

describe("findDataTests", () => {
  it("is an alias to findDataTest", () => {
    expect(T.findDataTests).toBe(T.findDataTest)
  })
})

describe("expectDataTest", () => {
  it("is a shortcut to expect somthing from a shallow wrapper found by a test id", () => {
    const wrapper = shallow(
      <div>
        <span data-test="some id">span 1</span>
        <span data-test="some id">span 2</span>
      </div>
    )

    T.expectDataTest(wrapper, "some id").toHaveLength(2)
  })
})

describe("diveUntil", () => {
  it("dives into the shallow wrapper until the matcher is statisfied", () => {
    const Comp1 = () => <Comp2 />
    const Comp2 = () => <Comp3 />
    const Comp3 = () => <Comp4 />
    const Comp4 = () => <Comp5 />
    const Comp5 = () => <div>done!</div>

    const wrapper = T.diveUntil(shallow(<Comp1 />), e => e.type() === "div")

    expect(wrapper).toHaveText("done!")
  })
})

describe("diveUntilDataTest", () => {
  it("dives into the shallow wrapper until the test id is found", () => {
    const Comp1 = () => <Comp2 />
    const Comp2 = () => <Comp3 />
    const Comp3 = () => <Comp4 />
    const Comp4 = () => <Comp5 />
    const Comp5 = () => <div data-test="foo">done!</div>

    const wrapper = T.diveUntilDataTest(shallow(<Comp1 />), "foo")

    expect(wrapper).toHaveText("done!")
  })
})
