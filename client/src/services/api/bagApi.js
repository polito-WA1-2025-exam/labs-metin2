const baseMidPath = "/api/bags";

async function getAllBags() {
  const res = await fetch(`${baseMidPath}/`, {
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("bad credentials to get all bags");
  } else {
    return res.json();
  }
}

async function getBagById(id) {
  const res = await fetch(`${baseMidPath}/${id}`, {
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("bad credentials to get bag by ID");
  } else {
    return res.json();
  }
}

export { getAllBags, getBagById };
