import { useNavigate } from "react-router";
import { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import useForm from "../../hooks/useForm";

export default function Register() {
  const navigate = useNavigate();
  const { registerHandler } = useContext(UserContext)

  const [error, setError] = useState("");

  const { register, formAction } = useForm(
    async (values) => {
      const { email, password, rePassword } = values;

      setError("");

      if (!email || !password || !rePassword) {
        return setError("All fields are required!");
      }

      const emailRegex = /.+@.+\..+/;
      if (!emailRegex.test(email)) {
        return setError("Please enter a valid email address.");
      }

      if (password.length < 4) {
        return setError("Password must be at least 4 characters long!");
      }

      if (password !== rePassword) {
        return setError("Passwords do not match!");
      }

      try {
        await registerHandler(email, password);
        navigate("/");
      } catch (err) {
        setError(err.message || "Registration failed!");
      }
    },
    {
      email: "",
      password: "",
      rePassword: "",
    }
  );

  return (
    <section className="auth-section">
      <form className="auth-form" onSubmit={e => { e.preventDefault(); formAction(); }}>
        <h2 className="auth-title">Create an account</h2>

        {error && <p className="auth-error">{error}</p>}

        <label className="auth-label">
          Email
          <input className="auth-input" type="email" {...register("email")} placeholder="you@example.com" />
        </label>

        <label className="auth-label">
          Password
          <input className="auth-input" type="password" {...register("password")} placeholder="••••••••" />
        </label>

        <label className="auth-label">
          Repeat Password
          <input className="auth-input" type="password" {...register("rePassword")} placeholder="••••••••" />
        </label>

        <button className="auth-btn" type="submit">Register</button>
      </form>
    </section>
  );
}