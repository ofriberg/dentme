import { userService } from "@/services/user";
import { HttpError } from "@/utils/errors";

import { beforeEach, describe, expect, it } from "vitest";

describe('userService', () => {
  beforeEach(() => {
    userService._resetForTests();
  });

  it("creates a user", () => {
    const user = userService.create({
      firstName: "Anders",
      lastName: "Andersson",
      email: "anders@andersson.se"
    });

    expect(user.id).toBeTruthy();
    expect(user.email).toBe("anders@andersson.se");
  });

  it("deletes a user", () => {
    const user = userService.create({
      firstName: "Anders",
      lastName: "Andersson",
      email: "anders@andersson.se"
    });

    expect(userService.list().length).toBe(1);

    expect(() => userService.deleteById(user.id)).not.toThrow();

    expect(userService.list().length).toBe(0);

  });

  it("throws a 409 error on duplicate emails", () => {
    userService.create({
      firstName: "Anders",
      lastName: "Andersson",
      email: "anders@andersson.se"
    });

    try {
      userService.create({
        firstName: "C",
        lastName: "D",
        email: "anders@andersson.se"
      });
      throw new Error("Expected a HttpError, but wasnt thrown");
    }
    catch (err: unknown) {
      expect(err).toBeInstanceOf(HttpError);
      const error = err as HttpError;
      expect(error.status).toBe(409);
      expect(error.translationCode).toBe("EMAIL_EXISTS");
    }
  });

  it("throws 404 when deleting a missing user", () => {
    try {
      userService.deleteById("does-not-exist");
      throw new Error("Expected HttpError, but wasnt thrown");
    }
    catch (err: unknown) {
      expect(err).toBeInstanceOf(HttpError);
      const e = err as HttpError;
      expect(e.status).toBe(404);
      expect(e.translationCode).toBe("USER_NOT_FOUND");
    }
  });

})