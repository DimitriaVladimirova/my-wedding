import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import useForm from "../../hooks/useForm";
import useRequest from "../../hooks/useRequest";
import { UserContext } from "../../context/UserContext";

export default function MenuCreate() {
    const navigate = useNavigate();
    const { request } = useRequest();
    const { isAdmin } = useContext(UserContext);

    useEffect(() => {
        if (!isAdmin) {
            navigate("/design");
        }
    }, [isAdmin, navigate]);

    const createMenuHandler = async (values) => {
        const data = {
            title: values.title,
            description: values.description,
            imageUrl: values.imageUrl.trim(),
            pricePerGuest: Number(values.pricePerGuest),
            maxGuests: Number(values.maxGuests),
        };

        try {
            await request("/data/menus", "POST", data);
            navigate("/design");
        } catch (err) {
            alert(err.message || "Failed to create menu");
        }
    };

    const { register, formAction } = useForm(createMenuHandler, {
        title: "",
        description: "",
        imageUrl: "",
        pricePerGuest: "",
        maxGuests: "150",
    });

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        formAction(formData);
    };

    return (
        <section className="auth-section">
            <form className="auth-form" onSubmit={onSubmit}>
                <h2 className="auth-title">Add Menu</h2>

                <label className="auth-label">
                    Title
                    <input
                        className="auth-input"
                        type="text"
                        placeholder="Classic Wedding Menu"
                        {...register("title")}
                    />
                </label>

                <label className="auth-label">
                    Description
                    <textarea
                        className="auth-input"
                        rows="4"
                        placeholder="Starter, main course, dessert, drinks…"
                        {...register("description")}
                    />
                </label>

                <label className="auth-label">
                    Image URL
                    <input
                        className="auth-input"
                        type="text"
                        placeholder="https://example.com/menu-photo.jpg"
                        {...register("imageUrl")}
                    />
                </label>

                <label className="auth-label">
                    Price per guest (€)
                    <input
                        className="auth-input"
                        type="number"
                        min="0"
                        step="1"
                        {...register("pricePerGuest")}
                    />
                </label>

                <label className="auth-label">
                    Max guests
                    <input
                        className="auth-input"
                        type="number"
                        min="1"
                        max="300"
                        {...register("maxGuests")}
                    />
                </label>

                <button className="auth-btn" type="submit">
                    Create Menu
                </button>
            </form>
        </section>
    );
}