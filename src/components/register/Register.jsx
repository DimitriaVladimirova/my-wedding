import { useNavigate } from "react-router";
import { useState } from "react";

export default function Register() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: '',
    password: '',
    rePassword: '',
  });

  const [error, setError] = useState("");

  function onChangeHandler(e) {
    setValues(state => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  }

  async function onSubmitHandler(e) {
    e.preventDefault();
    setError("");

    if (!values.email || !values.password || !values.rePassword) {
      setError("All fields are required!");
      return;
    }

    if (values.password.length < 6) {
      setError("Password must be at least 6 characters long!");
      return
    }

    if (values.password !== values.rePassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      //TODO add the server and do a real register
      console.log("Registering user:", values);
      navigate("/");
    } catch (err) {
      setError("Registration failed!");
    }

  }

  return (
    <section className="auth-section">
      <form className="auth-form" onSubmit={onSubmitHandler}>
        <h2 className="auth-title">Create an account</h2>

        {error && <p className="auth-error">{error}</p>}

        <label className="auth-label">
          Email
          <input
            className="auth-input"
            type="email"
            name="email"
            value={values.email}
            onChange={onChangeHandler}
            placeholder="you@example.com"
          />
        </label>

        <label className="auth-label">
          Password
          <input
            className="auth-input"
            type="password"
            name="password"
            value={values.password}
            onChange={onChangeHandler}
            placeholder="••••••••"
          />
        </label>

        <label className="auth-label">
          Repeat Password
          <input
            className="auth-input"
            type="password"
            name="rePassword"
            value={values.rePassword}
            onChange={onChangeHandler}
            placeholder="••••••••"
          />
        </label>

        <button className="auth-btn" type="submit">
          Register
        </button>
      </form>
    </section>
  );
}