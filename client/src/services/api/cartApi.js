const baseMidPath = "/api/carts";

/**
 * add a item to cart with user id
 * @param {Object} params
 * @param {string} userID
 * @param {string} bagID
 * @returns {Promise<Object>} user id and bag id
 */
async function addItemToCart(params) {
  const res = await fetch(`${baseMidPath}/${params.userID}/${params.bagID}`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
  if (!res.ok) {
    throw new Error("bad post to add item of user id to cart");
  } else {
    return res.json();
  }
}

/**
 * remove a item from cart with user id
 * @param {Object} params
 * @param {string} userID
 * @param {string} bagID
 * @returns {Promise<Object>} user id and bag id
 */
async function removeItemFromCart(params) {
  const res = await fetch(`${baseMidPath}/${params.userID}/${params.bagID}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("bad delete to remove item of user id from cart");
  } else {
    return res.json();
  }
}
/**
 * get all bag id by user id
 * @param {string} userID
 * @returns {Promise<Object>} bag info (json)
 */
async function getAllBagsInCartByUserID(userID) {
  const res = await fetch(`${baseMidPath}/${userID}`, {
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("bad get request to get all bag id by user id");
  } else {
    return res.json();
  }
}
/**
 * get all user id by bag id
 * @param {string} bagID
 * @returns {Promise<Object>} user info (json)
 */
async function getAllUserInCartByBagID(bagID) {
  const res = await fetch(`${baseMidPath}/${bagID}`, {
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("bad get request to get all user id by bag id");
  } else {
    return res.json();
  }
}
export {
  addItemToCart,
  removeItemFromCart,
  getAllBagsInCartByUserID,
  getAllUserInCartByBagID,
};
