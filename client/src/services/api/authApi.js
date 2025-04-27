const baseMidPath = "/api/auth";

/**
 *  login function
 * @param {Object} credentials
 * @param {string}  credentials.username
 * @param {string}  credentials.password
 * @returns {Promise<Object>} user info (json)
 */
export async function login(credentials) {
  const res = await fetch(`${baseMidPath}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(credentials),
  });
  if (!res.ok) {
    throw new Error("bad credentials");
  } else {
    return res.json();
  }
}

/**
 * logout function
 *  @returns {Promise<void>} if failed, throw a error
 */
export async function logOut() {
  const res = await fetch(`${baseMidPath}/logout`, {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("logout failed");
  }
}

/**
 * get current user function
 * @returns {Promise<object>} return current user info
 */
export async function getCurrentUser() {
  const res = await fetch(`${baseMidPath}/session`, {
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("no activate session");
  } else {
    return res.json();
  }
}
