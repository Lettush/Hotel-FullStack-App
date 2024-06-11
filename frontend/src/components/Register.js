import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
        if (response.ok) navigate("/");
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
    const response = createAccount();
  };

  return (
    <div>
      <div style={{ display: !isLoading ? "none" : "block" }}>Loading...</div>

      <form style={{ display: isLoading ? "none" : "block" }}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          onChange={(e) => setName(e.target.value)}
        />

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

        <label htmlFor="confirm-pass">Confirm Password:</label>
        <input
          type="password"
          name="confirm-pass"
          onChange={(e) => setConfirmPass(e.target.value)}
        />

        <button onClick={handleSignup}>Register</button>
      </form>
    </div>
  );
};

export default Register;
