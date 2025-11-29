import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../context/UserContext";

export default function Login() {
    const navigate = useNavigate();
    const { loginHandler } = useContext(UserContext);

    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const onChangeHandler = (e) => {
        setValues((state) => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setError("");

        if (!values.email || !values.password) {
            setError("All fields are required!");
            return;
        }

        try {
            await loginHandler(values.email.trim(), values.password);
            navigate("/");
        } catch (err) {
            setError(err.message || "Login failed!");
        }
    };

    return (
        <section className="auth-section">
            <form className="auth-form" onSubmit={onSubmitHandler}>
                <h2 className="auth-title">Welcome back</h2>

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

                <button className="auth-btn" type="submit">
                    Login
                </button>
            </form>
        </section>
    );
}