import { parseDate } from "./date"

describe("parseDate", () => {
  it("returns parsed data", () => {
    expect(parseDate("2018-09-22", "yyyy-MM-dd").getTime()).toBe(1537585200000)
  })
})
