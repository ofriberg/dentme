import { getParam } from "@/utils/url";
import { describe, expect, it } from "vitest";

describe('getParam', () => {
  it("returns string value", () => {
    expect(getParam("123")).toBe("123")
  });

  it("returns first valie if it's an array", () => {
    expect(getParam(["123", "456"])).toBe("123")
  });

  it("throws an error of it's missing", () => {
    expect(() => getParam(undefined)).toThrow()
  })

})
