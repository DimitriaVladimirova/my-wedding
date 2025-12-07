import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../context/UserContext";
import useForm from "../../hooks/useForm";

export default function Login() {
    const navigate = useNavigate();
    const { loginHandler } = useContext(UserContext);

    const [error, setError] = useState("");

    const { register, formAction } = useForm(
        async (values) => {
            const email = values.email.trim();
            const password = values.password;
            setError("");

            if (!email || !password) {
                return setError("All fields are required!");
            }

            const emailRegex = /.+@.+\..+/;
            if (!emailRegex.test(email)) {
                return setError("Please enter a valid email address.");
            }

            try {
                await loginHandler(email, password);
                navigate("/");
            } catch (err) {
                setError(err.message || "Login failed!");
            }
        },
        {
            email: "",
            password: "",
        }
    );

    return (
        <section className="auth-section">
            <form className="auth-form" onSubmit={(e) => { e.preventDefault(); formAction(); }}>
                <h2 className="auth-title">Welcome back</h2>

                {error && <p className="auth-error">{error}</p>}

                <label className="auth-label">
                    Email
                    <input className="auth-input" type="email"
                        {...register("email")}
                        placeholder="you@example.com"
                        required
                    />
                </label>

                <label className="auth-label">
                    Password
                    <input
                        className="auth-input"
                        type="password"
                        {...register("password")}
                        placeholder="••••••••"
                        required
                    />
                </label>

                <button className="auth-btn" type="submit">Login</button>
            </form>
        </section>
    );
}