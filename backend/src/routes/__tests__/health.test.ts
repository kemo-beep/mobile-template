import { describe, expect, it } from "vitest";
import app from "../../index";

const mockEnv = {
  DATABASE_URL: "postgresql://test:test@localhost/test",
  BETTER_AUTH_SECRET: "test-secret-min-32-chars-long",
  BETTER_AUTH_URL: "http://localhost:8787",
};

describe("GET /health", () => {
  it("returns 200 with status ok", async () => {
    const res = await app.request("/health", {}, mockEnv);
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json).toEqual({
      success: true,
      data: {
        status: "ok",
        timestamp: expect.any(String),
        version: "1.0.0",
      },
    });
  });
});
