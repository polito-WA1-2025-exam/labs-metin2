const baseMidPath = "/api/establishments";

/**
 * get all establishments
 * @returns {Promise<Object>} establishment info (json)
 */
async function getAllEstablishments() {
  const res = await fetch(`${baseMidPath}/`, {});
  if (!res.ok) {
    throw new Error("bad request to get all establishments");
  } else {
    return res.json();
  }
}

/**
 * get establishment by id
 * @param {string} id
 * @returns {Promise<Object>} establishment info (json)
 */
async function getEstablishmentById(id) {
  const res = await fetch(`${baseMidPath}/${id}`, {});
  if (!res.ok) {
    throw new Error("bad request to get establishments by ID");
  } else {
    return res.json();
  }
}

export { getAllEstablishments, getEstablishmentById };
