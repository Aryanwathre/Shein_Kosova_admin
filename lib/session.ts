"use client";

const ACCESS_TOKEN_KEY = "accessToken";

/**
 * 🧩 Get the current access token.
 * If a DEV token exists in .env.local, that takes priority.
 */
export const getAccessToken = (): string | null => {
  try {
    const devToken = process.env.NEXT_PUBLIC_DEV_ACCESS_TOKEN;
    if (devToken) {
      console.log("[Session] Using DEV token from .env.local");
      localStorage.setItem(ACCESS_TOKEN_KEY, devToken);
      return devToken;
    }

    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (token) {
      console.log("[Session] Using stored user token");
      return token;
    }

    console.warn("[Session] No token found");
    return null;
  } catch (error) {
    console.error("[Session] Error getting token:", error);
    return null;
  }
};

/**
 * 🧩 Save (or overwrite) an access token.
 */
export const setAccessToken = (token: string): void => {
  try {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
    console.log("[Session] Token saved");
  } catch (error) {
    console.error("[Session] Error saving token:", error);
  }
};

/**
 * 🧩 Update the access token (optional, same as set but adds logging).
 */
export const updateAccessToken = (newToken: string): void => {
  try {
    const oldToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    localStorage.setItem(ACCESS_TOKEN_KEY, newToken);
    console.log("[Session] Token updated", {
      oldToken: oldToken ? "EXISTS" : "NONE",
      newToken: "SET",
    });
  } catch (error) {
    console.error("[Session] Error updating token:", error);
  }
};

/**
 * 🧩 Remove (log out / clear) access token.
 */
export const clearAccessToken = (): void => {
  try {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    console.log("[Session] Token cleared");
  } catch (error) {
    console.error("[Session] Error clearing token:", error);
  }
};

/**
 * 🧩 Check if the user is authenticated.
 */
export const isAuthenticated = (): boolean => {
  const token = getAccessToken();
  return !!token;
};
