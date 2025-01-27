import axios from "axios";

function getAuthToken() {
  return localStorage.getItem("authToken") || "";
}

export async function login(userObject) {
  const url = "https://mind-backend-iz7d.onrender.com/auth/login";

  try {
    const response = await axios.post(url, userObject);
    return response.data;
  } catch (error) {
    console.error("Erro no login:", error);
    throw error;
  }
}

export async function createUser(newUserData) {
  const url = "https://mind-backend-iz7d.onrender.com/auth/register";
  try {
    const response = await axios.post(url, newUserData);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

export async function getProducts() {
  try {
    const response = await axios.get(
      `https://mind-backend-iz7d.onrender.com/product`,
      {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export async function getUserData(email) {
  try {
    const response = await axios.get(
      `https://mind-backend-iz7d.onrender.com/users/${email}`,
      {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
