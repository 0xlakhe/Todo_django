import { useState } from "react";
import api from "./api";

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .post("token-auth/", { username, password })
      .then((response) => {
        localStorage.setItem("token", response.data.token);

        onLoginSuccess();
      })
      .catch((error) => {
        alert("Invalid username or password.");
        console.error("Login error:", error);
      });
  };
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
