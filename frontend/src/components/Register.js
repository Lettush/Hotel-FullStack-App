import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import "./styles/Register.css";

const Register = () => {
  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const createAccount = () => {
    fetch("http://localhost:4000/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        admin: false,
      }),
    })
      .then((response) => {
        if (response.ok) navigate("/login");
        else throw new Error(response.status);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (name === "") return console.error("Name is empty!");
    if (email === "") return console.error("Email is empty!");
    if (password === "") return console.error("Password is empty!");
    if (confirmPass === "") return console.error("Confirm Password is empty!");
    if (password !== confirmPass)
      return console.error("Passwords do not match!");

    setIsLoading(true);
    createAccount();
  };

  return (
    <div className="register">
      <div style={{ display: !isLoading ? "none" : "block" }}>Loading...</div>

      <form style={{ display: isLoading ? "none" : "block" }}>
        <h2>Register</h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          name="confirm-pass"
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPass(e.target.value)}
        />

        <button onClick={handleSignup}>Register</button>

        <div className="link">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
