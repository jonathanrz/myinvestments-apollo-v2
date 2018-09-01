import { isEmail, required, color, composeValidators } from "./index"

describe("isEmail", () => {
  let RANDOM_MESSAGE
  let validate

  beforeEach(() => {
    RANDOM_MESSAGE = `SOME RANDOM MESSAGE ${Math.random()}`
    validate = isEmail(RANDOM_MESSAGE)
  })

  it("returns undefined if the email is valid or empty", () => {
    expect(validate("name@email.com")).toBeUndefined()
    expect(validate()).toBeUndefined()
  })

  it("returns the error message if the email is invalid", () => {
    expect(validate("name@email.c.c")).toBe(RANDOM_MESSAGE)
    expect(validate("name@email")).toBe(RANDOM_MESSAGE)
    expect(validate("name")).toBe(RANDOM_MESSAGE)
    expect(validate("name@.com")).toBe(RANDOM_MESSAGE)
    expect(validate("name@lol@com")).toBe(RANDOM_MESSAGE)
  })
})

describe("required", () => {
  let RANDOM_MESSAGE
  let validate

  beforeEach(() => {
    RANDOM_MESSAGE = `SOME RANDOM MESSAGE ${Math.random()}`
    validate = required(RANDOM_MESSAGE)
  })

  it("returns undefined if the value is not empty", () => {
    expect(validate("some value")).toBeUndefined()
  })

  it("returns the error message if the value is empty", () => {
    expect(validate("    ")).toBe(RANDOM_MESSAGE)
    expect(validate(null)).toBe(RANDOM_MESSAGE)
    expect(validate()).toBe(RANDOM_MESSAGE)
  })
})

describe("color", () => {
  let RANDOM_MESSAGE
  let validate

  beforeEach(() => {
    RANDOM_MESSAGE = `SOME RANDOM MESSAGE ${Math.random()}`
    validate = color(RANDOM_MESSAGE)
  })

  it("returns undefined if the value is a valid hex color", () => {
    expect(validate("#FFff00")).toBeUndefined()
  })

  it("returns the error message if the value is an invalid hex color", () => {
    expect(validate("    ")).toBe(RANDOM_MESSAGE)
    expect(validate("efewfewfewfew")).toBe(RANDOM_MESSAGE)
    expect(validate("rgba(1,1,1)")).toBe(RANDOM_MESSAGE)
  })
})

describe("composeValidators", () => {
  it("runs informed validators and returns the first error message", () => {
    const validator1 = jest.fn(() => undefined)
    const validator2 = jest.fn(() => "ERROR 2")
    const validator3 = jest.fn(() => "ERROR 3")

    const errorMessage = composeValidators(validator1, validator2, validator3)(
      "some value"
    )

    expect(errorMessage).toBe("ERROR 2")
  })

  it("runs all informed validators and returns undefined if there are no error messages", () => {
    const validator1 = jest.fn(() => undefined)
    const validator2 = jest.fn(() => undefined)
    const validator3 = jest.fn(() => undefined)

    const errorMessage = composeValidators(validator1, validator2, validator3)(
      "some value"
    )

    expect(errorMessage).toBe(undefined)
  })

  it("ignores null values", () => {
    const validator1 = jest.fn(() => undefined)
    const validator2 = null
    const validator3 = jest.fn(() => "some error")

    const errorMessage = composeValidators(validator1, validator2, validator3)(
      "some value"
    )

    expect(errorMessage).toBe("some error")
  })
})
