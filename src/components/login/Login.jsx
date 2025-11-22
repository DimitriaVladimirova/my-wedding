import { useState } from "react";
import { useNavigate } from "react-router";

export default function Login() {
    const navigate = useNavigate();

    const [values, setValues] = useState({
        email: '',
        password: '',
    })

    const [error, setError] = useState('');

    const onChangeHandler = (e) => {
        setValues(state => ({
            ...state, [e.target.name]: e.target.value,
        }))
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        setError('');

        if (!values.email || !values.password) {
            setError('All fields are required!');
            return;
        }

        try {
            //TODO add the server and do a real login
            console.log("Login attempt:", values);
            navigate("/");
        } catch (err) {
            setError("Login failed!");
        }

    }

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

                <button className="auth-btn" type="submit">
                    Login
                </button>
            </form>
        </section>
    );
}