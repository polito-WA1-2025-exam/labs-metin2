const baseMidPath = "/api/auth";

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

export async function logOut() {
  const res = await fetch(`${baseMidPath}/logout`, {
    method: "POST",
    credentials: "include",
  });
}

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
