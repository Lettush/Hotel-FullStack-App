import { useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import "./styles/Login.css";

const Login = () => {
  // Form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const login = async () => {
    fetch("http://localhost:4000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setIsLoading(false);
          throw new Error(data.error);
        } else {
          localStorage.setItem("name", data.name);
          localStorage.setItem("email", data.email);
          localStorage.setItem("token", data.token);
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email === "") return console.error("Email is empty!");
    if (password === "") return console.error("Password is empty!");

    setIsLoading(true);
    await login();
  };

  return (
    <div className="login">
      <div style={{ display: !isLoading ? "none" : "block" }}>Loading...</div>
      <form style={{ display: isLoading ? "none" : "flex" }}>
        <h3>Login</h3>
        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button onClick={handleLogin}>Login</button>

        <div className="link">
          Don't have an account? <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
