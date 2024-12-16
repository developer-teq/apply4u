
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../AuthContext";
const Login = () => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response  = await axios.post(
        "http://127.0.0.1:8000/apicall/token/",
        {
          username: formData.email, // Send email as username
          password: formData.password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const { access, refresh } = response.data;
      login(access, refresh);
      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);
      // const token = response.data.access_token;
      // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
       
       
      
      setMessage("Login successful!");
      navigate("/");
      setFormData({ email: "", password: "" });
    } catch (error) {
      setMessage(error.response?.data?.detail || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg">
            <div className="card-body">
              <h3 className="text-center mb-4">Login with Email</h3>
              {message && (
                <div
                  className={`alert ${
                    message.includes("successful")
                      ? "alert-success"
                      : "alert-danger"
                  }`}
                  role="alert"
                >
                  {message}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Logging In..." : "Login"}
                  </button>
                </div>
              </form>
              <div className="text-center mt-3">
                <small>
                  Forgot password?{" "}
                  <a href="/forgot-password" className="text-decoration-none">
                    Reset here
                  </a>
                </small>
                <br />
                <small>
                  Don’t have an account?{" "}
                  <a href="/signup" className="text-decoration-none">
                    Sign up
                  </a>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
