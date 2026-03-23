"use client";

import { createAuthClient } from "better-auth/react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8787";

export const authClient = createAuthClient({
  baseURL: `${apiUrl}/api/auth`,
});
