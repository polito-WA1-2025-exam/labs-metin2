const baseMidPath = "/api/users";

/**
 * get user by user id
 * @param {string} userID
 * @returns {Promise<Object>} user info (json)
 */
async function getUserById(userID) {
  const res = await fetch(`${baseMidPath}/${userID}`, {});
  if (!res.ok) {
    throw new Error("bad get request to get user by user id");
  } else {
    return res.json();
  }
}

/**
 * get user by user name
 * @param {string} username
 * @returns {Promise<Object>} user info (json)
 */
async function getUserByUsername(username) {
  const res = await fetch(`${baseMidPath}/${username}`, {});
  if (!res.ok) {
    throw new Error("bad get request to get user by user name");
  } else {
    return res.json();
  }
}
