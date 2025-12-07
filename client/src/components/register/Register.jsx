import { useNavigate } from "react-router";
import { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";

export default function Register() {
  const navigate = useNavigate();
  const { registerHandler } = useContext(UserContext)

  const [values, setValues] = useState({
    email: '',
    password: '',
    rePassword: '',
  });

  const [error, setError] = useState("");

  function onChangeHandler(e) {
    setValues((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  }

  async function onSubmitHandler(e) {
    e.preventDefault();
    setError("");

    const email = values.email.trim();
    const password = values.password;
    const rePassword = values.rePassword;

    if (!email || !password || !rePassword) {
      setError("All fields are required!");
      return;
    }

    const emailRegex = /.+@.+\..+/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 4) {
      setError("Password must be at least 4 characters long!");
      return;
    }

    if (password !== rePassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      await registerHandler(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message || "Registration failed!");
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
            required
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
            required
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
            required
          />
        </label>

        <button className="auth-btn" type="submit">
          Register
        </button>
      </form>
    </section>
  );
}