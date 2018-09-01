import React from "react"
import { Link } from "react-router-dom"
import { shallow } from "enzyme"
import { findDataTest, expectDataTest } from "app/utils/tests"
import Menu, { menuItems } from "./Menu"

function build() {
  return shallow(<Menu />)
}

function verifyLinkItem(wrapper, item) {
  const link = findDataTest(wrapper, "link")
  expect(link).toHaveLength(1)
  expect(link).toHaveProp({ button: true, component: Link, to: item.to })
  expectDataTest(wrapper, "link-text").toHaveProp({ primary: item.text })
}

describe("Menu", () => {
  it("render divider items", () => {
    const wrapper = build().dive()
    const dividerItems = menuItems.filter(item => item.divider)
    const dividers = findDataTest(wrapper, "divider")
    expect(dividers).toHaveLength(dividerItems.length)
  })

  it("render link items", () => {
    const wrapper = build().dive()
    const linkItems = menuItems.filter(item => !item.divider)
    const links = findDataTest(wrapper, "link")
    expect(links).toHaveLength(linkItems.length)
    linkItems.forEach((item, index) => {
      verifyLinkItem(links.at(index), item)
    })
  })
})
