import localStorage from "./index"

describe("localStorage", () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it("saves the stringified value on window.localStorage", () => {
    localStorage.set("someKey", {
      some: {
        deep: ["array"],
        string: "or the",
        number: 1
      }
    })

    expect(window.localStorage.getItem("someKey")).toBe(
      '{"some":{"deep":["array"],"string":"or the","number":1}}'
    )
  })

  it("returns the parsed value from window.localStorage", () => {
    window.localStorage.setItem(
      "someKey",
      '{"some":{"deep":["array"],"string":"or the","number":1}}'
    )

    expect(localStorage.get("someKey")).toEqual({
      some: {
        deep: ["array"],
        string: "or the",
        number: 1
      }
    })
  })

  it("returns null if an unexpected content is stored on window.localStorage", () => {
    window.localStorage.setItem("someKey", "not a stringified json")
    expect(localStorage.get("someKey")).toBe(null)
  })
})
