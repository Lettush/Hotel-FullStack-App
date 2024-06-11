import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
        localStorage.setItem("name", data.user.name);
        localStorage.setItem("token", data.token);
        navigate("/");
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
    <div>
        <div style={{ display: !isLoading ? "none" : "block" }}>Loading...</div>
      <form style={{ display: isLoading ? "none" : "block" }}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
};

export default Login;
