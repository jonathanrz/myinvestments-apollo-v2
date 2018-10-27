import { formatCurrency } from "./currency"

describe("formatCurrency", () => {
  it("format simple number", () => {
    expect(formatCurrency(10000)).toBe("R$ 100,00")
  })

  it("format decimal number", () => {
    expect(formatCurrency(10023)).toBe("R$ 100,23")
  })

  it("format number with six digits", () => {
    expect(formatCurrency(123456)).toBe("R$ 1.234,56")
  })

  it("format number with nine digits", () => {
    expect(formatCurrency(123456789)).toBe("R$ 1.234.567,89")
  })

  it("format cents", () => {
    expect(formatCurrency(10)).toBe("R$ 0,10")
  })

  it("format undefined as 000", () => {
    expect(formatCurrency(undefined)).toBe("R$ 0,00")
  })
})
