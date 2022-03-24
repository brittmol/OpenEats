import React, { useState } from "react";
import * as sessionActions from "../../../store/session";
import { useDispatch } from "react-redux";
import "../Auth.css";

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <>
      <h1 className="modal-form-title">Log In</h1>
      <form onSubmit={handleSubmit} className="modal-form">
        <ul>
          {errors.map((error, idx) => (
            <li key={idx} className="errors">
              {error}
            </li>
          ))}
        </ul>
        <label>
          Username or Email:&emsp;
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password:&emsp;
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit" className="modal-form-submit-btn">
          Log In
        </button>
      </form>
    </>
  );
}

export default LoginForm;
