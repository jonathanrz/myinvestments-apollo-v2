import { submit } from "./index.page"

describe("submit", () => {
  it("returns null on successful login and calls setToken", async () => {
    const login = jest.fn(() =>
      Promise.resolve({ data: { login: "fake_token" } })
    )
    const setToken = jest.fn()

    const returnedValue = await submit(login, setToken)({
      email: "a@a.com",
      password: "secret"
    })

    expect(returnedValue).toBe(null)
    expect(setToken).toHaveBeenCalledWith("fake_token")
  })

  it("returns errors on server error and does not call setToken", async () => {
    const error = new Error("auth error")
    const login = jest.fn(() => Promise.reject(error))
    const setToken = jest.fn()

    const returnedValue = await submit(login, setToken)({
      email: "a",
      password: ""
    })

    expect(returnedValue).toBe(error)
    expect(setToken).not.toHaveBeenCalled()
  })

  it("returns errors on failed login and does not call setToken", async () => {
    const login = jest.fn(() => Promise.resolve({ data: { login: null } }))
    const setToken = jest.fn()

    const returnedValue = await submit(login, setToken)({
      email: "a",
      password: ""
    })

    expect(returnedValue).toBe("invalid login")
    expect(setToken).not.toHaveBeenCalled()
  })
})
