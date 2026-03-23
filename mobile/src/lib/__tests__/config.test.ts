import { API_URL } from "../config";

describe("config", () => {
  describe("API_URL", () => {
    it("is a non-empty string", () => {
      expect(typeof API_URL).toBe("string");
      expect(API_URL.length).toBeGreaterThan(0);
    });

    it("is a valid HTTP or HTTPS URL", () => {
      expect(API_URL).toMatch(/^https?:\/\//);
    });

    it("contains a host (localhost, IP, or domain)", () => {
      const url = new URL(API_URL);
      expect(url.hostname).toBeTruthy();
    });
  });
});
