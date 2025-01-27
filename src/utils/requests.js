import axios from "axios";
import defaultPicture from "../../public/images/default-picture.png";

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
    const response = await axios.post(url, newUserData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
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

export async function getProduct(product) {
  try {
    const response = await axios.get(
      `https://mind-backend-iz7d.onrender.com/product/${product}`,
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

export async function getProductImage(product) {
  try {
    const response = await fetch(
      `https://mind-backend-iz7d.onrender.com/image/${product}`,
      {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error(
        `Failed to fetch profile picture: ${response.statusText}`
      );
    }

    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);
    return imageUrl;
  } catch (error) {
    console.error("Error fetching profile picture:", error);
    return defaultPicture;
  }
}

export async function uploadProductPicture(product, fileInput) {
  const formData = new FormData();
  formData.append("image", fileInput.files[0]);

  try {
    const response = await axios.post(
      `https://mind-backend-iz7d.onrender.com/image/product/${product}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }
    );
    console.log(response.data);
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function updateProduct(product, productInfo) {
  const url = `https://mind-backend-iz7d.onrender.com/product/${product}`;
  try {
    const response = await axios.put(url, productInfo, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    console.log("User data updated successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error updating user data:",
      error.response?.data || error.message
    );
    throw error;
  }
}

export async function addProduct(productData) {
  const url = "https://mind-backend-iz7d.onrender.com/product";

  try {
    const response = await axios.post(url, productData, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
}
