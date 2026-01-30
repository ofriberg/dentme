import { app } from "@/app";
import request from "supertest";
import { describe, expect, it } from "vitest";

describe("API", () => {
  it("returns 400 on invalid body/payload", async () => {
    const res = await request(app).post("/users").send({ firstName: "A" });
    expect(res.status).toBe(400);
    expect(res.body.translationCode).toBe("VALIDATION_ERROR");
  });

  it("returns 404 and translation code when trying to delete a missing user", async () => {
    const res = await request(app).delete("/user/not-exist");
    expect(res.status).toBe(404);
    expect(res.body.translationCode).toBe("USER_NOT_FOUND");
  })
})