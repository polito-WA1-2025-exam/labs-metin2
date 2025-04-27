const baseMidPath = "/api/reservations";

/**
 * create a new reservation, it will create a info in reservations table and update status of the bag in bag table
 * @param {Object} params
 * @param {string} params.userID
 * @param {string} params.bagID
 * @param {string} params.status
 * @param {string} params.allergies
 * @param {string} params.specialRequests
 * @param {string} params.removedItems
 * @returns {Promise<Object>} reservation id (json)
 */
async function createNewReservation(params) {
  const res = await fetch(`${baseMidPath}/`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
  if (!res.ok) {
    throw new Error("bad post to create new reservation");
  } else {
    return res.json();
  }
}

/**
 * delete reservation by bag id
 * @param {string} id
 * @returns {Promise<Object>} bag info (json)
 */
async function deleteReservationByBagId(id) {
  const res = await fetch(`${baseMidPath}/bags/${id}/reservations`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("bad delete request to delete reservation by bag id");
  } else {
    return res.json();
  }
}

/**
 * get reservation by bag id
 * @param {string} bagID
 * @returns {Promise<Object>} reservation info (json)
 */
async function getReservationsByBagId(bagID) {
  const res = await fetch(`${baseMidPath}/bags/${bagID}/reservations`, {
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("bad get request to get reservation by bag id");
  } else {
    return res.json();
  }
}

/**
 * get reservation by user id
 * @param {string} userID
 * @returns {Promise<Object>} reservation info (json)
 */
async function getReservationsByUserId(userID) {
  const res = await fetch(`${baseMidPath}/users/${userID}/reservations`, {
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("bad get request to get reservation by user id");
  } else {
    return res.json();
  }
}
