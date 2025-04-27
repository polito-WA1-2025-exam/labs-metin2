const baseMidPath = "/api/establishments";

async function getAllEstablishments() {
  const res = await fetch(`${baseMidPath}/`, {});
  if (!res.ok) {
    throw new Error("bad request to get all establishments");
  } else {
    return res.json();
  }
}

async function getEstablishmentById(id) {
  const res = await fetch(`${baseMidPath}/${id}`, {});
  if (!res.ok) {
    throw new Error("bad request to get establishments by ID");
  } else {
    return res.json();
  }
}
