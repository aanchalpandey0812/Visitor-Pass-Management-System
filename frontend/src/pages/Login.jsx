import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [name, setName] =
    useState("");

  const [role, setRole] =
    useState("Admin");

  const navigate =
    useNavigate();

  const handleLogin = (
    e
  ) => {
    e.preventDefault();

    localStorage.setItem(
      "user",
      JSON.stringify({
        name,
        role,
      })
    );

    navigate("/");
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Login</h2>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              required
            />
          </div>

          <div className="form-group">
            <select
              value={role}
              onChange={(e) =>
                setRole(e.target.value)
              }
            >
              <option>Admin</option>
              <option>Security</option>
              <option>Employee</option>
              <option>Visitor</option>
            </select>
          </div>

          <button type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;