const API_BASE_URL = "http://localhost:8080/api/auth";

/**
 * Register a new user
 * @param {Object} data - Registration payload
 * @param {string} data.username - User username
 * @param {string} data.email - User email
 * @param {string} data.password - User password
 * @returns {Promise<Object>} Registered user or success response
 */
export async function registerUser(data) {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new Error(errorBody?.message || "Registration failed");
  }

  return response.json();
}

/**
 * Authenticate a user and retrieve a JWT token
 * @param {Object} data - Login payload
 * @param {string} data.username - User username
 * @param {string} data.password - User password
 * @returns {Promise<Object>} Authentication response containing JWT token
 */
export async function loginUser(data) {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new Error(errorBody?.message || "Invalid credentials");
  }

  return response.json();
}

export default {
  registerUser,
  loginUser,
};
