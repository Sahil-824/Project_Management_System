import axios from "axios";

export const handleLogin = async ({ username, password, role }) => {
  try {
    console.log(username, password);
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_BASE_URL}/api/clientLogin`,
      {
        email: username,
        password,
        role,
      }
    );

    const data = response.data;
    console.log("Login response:", data);

    if (data.message === "Login successful" && data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.user?.username || "");
      localStorage.setItem("role", data.user?.role || "");
    }

    return data;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    return null;
  }
};

export const handleSignup = async (formData) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_BASE_URL}/api/clientSignup`,
      formData
    );

    const data = response.data;
    console.log("Signup response:", data);

    if (data.success && data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.user?.username || "");
      localStorage.setItem("role", data.user?.role || "");
    }

    return data;
  } catch (error) {
    console.error("Signup error:", error.response?.data || error.message);
    return null;
  }
};
