import { userService } from "@/services/user";
import { HttpError } from "@/utils/errors";
import { describe, expect, it } from "vitest";

describe('userService', () => {
  it("creates a user", () => {
    const user = userService.create({
      firstName: "Anders",
      lastName: "Andersson",
      email: "anders@andersson.se"
    });

    expect(user.id).toBeTruthy();
    expect(user.email).toBe("anders@andersson.se");
  });

  it("throws an error on duplicate emails", () => {
    userService.create({
      firstName: "Anders",
      lastName: "Andersson",
      email: "anders@andersson.se"
    });

    expect(() => {
      userService.create({
        firstName: "Anders",
        lastName: "Anders",
        email: "anders@andersson.se"
      })
    }).toThrowError(HttpError);

    try {
      userService.create({ firstName: "C", lastName: "D", email: "D@test.com" });
    }
    catch (err) {
      const error = err as HttpError;
      expect(error.status).toBe(409);
      expect(error.translationCode).toBe("EMAIL_EXISTS");
    }
  });

  it("throws 404 when deleting a muissing user", () => {
    expect(() => userService.deleteById("does-not-exist")).toThrowError(HttpError)
  });

})