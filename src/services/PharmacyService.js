const API_BASE_URL = "http://localhost:8080/api/pharmacies";

/**
 * Retrieve all pharmacies with optional filters
 * @param {Object} options
 * @param {string} [options.city] - Filter pharmacies by city
 * @param {boolean} [options.open24h] - Filter pharmacies open 24h
 * @param {boolean} [options.duty] - Filter pharmacies on duty
 * @param {string} token - JWT authentication token
 * @returns {Promise<Array>} List of pharmacies
 */
export async function getPharmacies(options = {}, token) {
  const params = new URLSearchParams();

  if (options.city) {
    params.append("city", options.city);
  }

  if (options.open24h !== undefined) {
    params.append("open24h", options.open24h);
  }

  if (options.duty !== undefined) {
    params.append("duty", options.duty);
  }

  const queryString = params.toString();
  const url = queryString ? `${API_BASE_URL}?${queryString}` : API_BASE_URL;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new Error(errorBody?.message || "Failed to fetch pharmacies");
  }

  return response.json();
}

/**
 * Create a new pharmacy
 * @param {Object} data - Pharmacy payload
 * @param {string} data.name - Pharmacy name
 * @param {string} data.city - Pharmacy city
 * @param {string} data.address - Pharmacy address
 * @param {string} data.phone - Pharmacy phone number
 * @param {boolean} data.open24h - Whether the pharmacy is open 24h
 * @param {boolean} data.duty - Whether the pharmacy is on duty
 * @param {string} token - JWT authentication token
 * @returns {Promise<Object>} Created pharmacy
 */
export async function createPharmacy(data, token) {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new Error(errorBody?.message || "Failed to create pharmacy");
  }

  return response.json();
}

/**
 * Update an existing pharmacy
 * @param {number|string} id - Pharmacy ID
 * @param {Object} data - Updated pharmacy data
 * @param {string} data.name - Pharmacy name
 * @param {string} data.city - Pharmacy city
 * @param {string} data.address - Pharmacy address
 * @param {string} data.phone - Pharmacy phone number
 * @param {boolean} data.open24h - Whether the pharmacy is open 24h
 * @param {boolean} data.duty - Whether the pharmacy is on duty
 * @param {string} token - JWT authentication token
 * @returns {Promise<Object>} Updated pharmacy
 */
export async function updatePharmacy(id, data, token) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new Error(errorBody?.message || "Failed to update pharmacy");
  }

  return response.json();
}

/**
 * Delete a pharmacy by ID
 * @param {number|string} id - Pharmacy ID
 * @param {string} token - JWT authentication token
 * @returns {Promise<boolean>} True if deletion succeeded
 */
export async function deletePharmacy(id, token) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    let message = "Failed to delete pharmacy";

    try {
      const errorBody = await response.json();
      message = errorBody?.message || message;
    } catch (_) {}

    throw new Error(message);
  }

  return true;
}
