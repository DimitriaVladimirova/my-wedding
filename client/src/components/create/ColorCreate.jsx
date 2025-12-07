import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useForm from "../../hooks/useForm";
import useRequest from "../../hooks/useRequest";
import { UserContext } from "../../context/UserContext";

export default function ColorCreate() {
    const navigate = useNavigate();
    const { request } = useRequest();
    const { isAdmin } = useContext(UserContext);

    const [error, setError] = useState("")

    useEffect(() => {
        if (!isAdmin) {
            navigate("/design");
        }
    }, [isAdmin, navigate]);

    const createColorHandler = async (values) => {
        setError("");

        const name = values.name.trim();
        const hex = values.hex.trim();
        const shadeType = values.shadeType.trim();

        if (!name) {
            setError("Color name is required.");
            return;
        }

        const hexRegex = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
        if (!hexRegex.test(hex)) {
            setError("Hex code must be in format #RGB or #RRGGBB.");
            return;
        }

        if (shadeType !== "dark" && shadeType !== "light") {
            setError("Shade type must be either dark or light.");
            return;
        }

        const data = { name, hex, shadeType, };

        try {
            await request("/data/colors", "POST", data);
            navigate("/design");
        } catch (err) {
            setError(err.message || "Failed to create color");
        }
    };

    const { register, formAction } = useForm(createColorHandler, {
        name: "",
        hex: "#ffffff",
        shadeType: "light",
    });

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        formAction(formData);
    };

    return (
        <section className="auth-section">
            <form className="auth-form" onSubmit={onSubmit}>
                <h2 className="auth-title">Add Theme Color</h2>

                {error && <p className="auth-error">{error}</p>}

                <label className="auth-label">
                    Name
                    <input
                        className="auth-input"
                        type="text"
                        placeholder="Champagne"
                        {...register("name")}
                    />
                </label>

                <label className="auth-label">
                    Hex code
                    <input
                        className="auth-input"
                        type="text"
                        placeholder="#F7E7CE"
                        {...register("hex")}
                    />
                </label>

                <label className="auth-label">
                    Shade type
                    <select className="auth-input" {...register("shadeType")}>
                        <option value="dark">Dark (main)</option>
                        <option value="light">Light (accent)</option>
                    </select>
                </label>

                <button className="auth-btn" type="submit">
                    Create Color
                </button>
            </form>
        </section>
    );
}
