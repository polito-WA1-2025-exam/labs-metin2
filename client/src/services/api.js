const APIURL = "http://localhost:3001"; // same port as Express

async function getEstablishments() {
  const response = await fetch(`${APIURL}/api/establishments`, {
    credentials: "include",
  });
  if (!response.ok) throw new Error("Failed to get establishments");
  return response.json();
}

export { getEstablishments };
