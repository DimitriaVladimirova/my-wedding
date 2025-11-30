import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import useForm from "../../hooks/useForm";
import useRequest from "../../hooks/useRequest";
import { UserContext } from "../../context/UserContext";

export default function LocationCreate() {
    const navigate = useNavigate();
    const { request } = useRequest();
    const { isAdmin } = useContext(UserContext);

    useEffect(() => {
        if (!isAdmin) {
            navigate("/design");
        }
    }, [isAdmin, navigate]);

    const createLocationHandler = async (values) => {
        const data = {
            title: values.title,
            city: values.city,
            country: values.country,
            imageUrl: values.imageUrl.trim(),
            summaryShort: values.summaryShort,
            summaryLong: values.summaryLong,
        };

        try {
            await request("/data/locations", "POST", data);
            navigate("/design");
        } catch (err) {
            alert(err.message || "Failed to create location");
        }
    };

    const { register, formAction } = useForm(createLocationHandler, {
        title: "",
        city: "",
        country: "",
        imageUrl: "",
        summaryShort: "",
        summaryLong: "",
    });

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        formAction(formData);
    };

    return (
        <section className="auth-section">
            <form className="auth-form" onSubmit={onSubmit}>
                <h2 className="auth-title">Add Location</h2>

                <label className="auth-label">
                    Title
                    <input
                        className="auth-input"
                        type="text"
                        placeholder="Seaside Villa"
                        {...register("title")}
                    />
                </label>

                <label className="auth-label">
                    City
                    <input
                        className="auth-input"
                        type="text"
                        placeholder="Santorini"
                        {...register("city")}
                    />
                </label>

                <label className="auth-label">
                    Country
                    <input
                        className="auth-input"
                        type="text"
                        placeholder="Greece"
                        {...register("country")}
                    />
                </label>

                <label className="auth-label">
                    Image URL
                    <input
                        className="auth-input"
                        type="text"
                        placeholder="https://example.com/my-beautiful-venue.jpg"
                        {...register("imageUrl")}
                    />
                </label>

                <label className="auth-label">
                    Short summary
                    <textarea
                        className="auth-input"
                        rows="3"
                        placeholder="A romantic cliffside venue with sunset views…"
                        {...register("summaryShort")}
                    />
                </label>

                <label className="auth-label">
                    Long description
                    <textarea
                        className="auth-input"
                        rows="5"
                        placeholder="Describe the location, capacity, vibe, etc."
                        {...register("summaryLong")}
                    />
                </label>

                <button className="auth-btn" type="submit">
                    Create Location
                </button>
            </form>
        </section>
    );
}