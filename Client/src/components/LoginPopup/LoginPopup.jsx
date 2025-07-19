import React, { useState } from "react";
import "./LoginPopup.css";
import { useNavigate } from "react-router-dom";

const LoginSignup = ({ onLogin, onSignup }) => {
  console.log("hello");
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    accessToken: "",
    role: "client", // default role
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let responseData;

    if (isLogin) {
      responseData = await onLogin({
        username: formData.username,
        password: formData.password,
        role: formData.role,
      });
    } else {
      responseData = await onSignup(formData);
    }
    console.log("adsasdasd", responseData);
    // Navigate based on role
    if (responseData?.message === "Login successful") {
      if (formData.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/client/dashboard");
      }
    } else {
      // Optionally handle error display here
      console.error("Login/Signup failed");
      // e.g., setError('Invalid credentials')
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isLogin ? "Login" : "Signup"}</h2>

        <form onSubmit={handleSubmit} className="auth-form">
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="client">Client</option>
            <option value="admin">Admin</option>
          </select>

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          {!isLogin && (
            <>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="accessToken"
                placeholder="Access Token"
                value={formData.accessToken}
                onChange={handleChange}
                required
              />
            </>
          )}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit">{isLogin ? "Login" : "Signup"}</button>
        </form>

        <p onClick={() => setIsLogin(!isLogin)} className="toggle-link">
          {isLogin
            ? "Don't have an account? Signup"
            : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
};

export default LoginSignup;
