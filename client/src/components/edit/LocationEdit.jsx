import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import useForm from "../../hooks/useForm";
import useRequest from "../../hooks/useRequest";
import { UserContext } from "../../context/UserContext";
import { getLocationById } from "../../services/design";

export default function LocationEdit() {
  const { locationId } = useParams();
  const navigate = useNavigate();
  const { isAdmin } = useContext(UserContext);
  const { request } = useRequest();

  const {
    values,
    setValues,
    register,
    formAction,
  } = useForm(editLocationHandler, {
    title: "",
    city: "",
    country: "",
    imageUrl: "",
    summaryShort: "",
    summaryLong: "",
  });

  async function editLocationHandler(formValues) {
    const data = {
      title: formValues.title,
      city: formValues.city,
      country: formValues.country,
      imageUrl: formValues.imageUrl,
      summaryShort: formValues.summaryShort,
      summaryLong: formValues.summaryLong,
    };

    try {
      await request(`/data/locations/${locationId}`, "PUT", data, {
        admin: true, 
      });

      navigate("/design");
    } catch (err) {
      alert(err.message || "Failed to update location");
    }
  }

  useEffect(() => {
    if (!isAdmin) {
      navigate("/design");
    }
  }, [isAdmin, navigate]);

  useEffect(() => {
    let cancelled = false;

    async function loadLocation() {
      try {
        const data = await getLocationById(locationId);
        if (cancelled) return;

        setValues({
          title: data.title || "",
          city: data.city || "",
          country: data.country || "",
          imageUrl: data.imageUrl || "",
          summaryShort: data.summaryShort || "",
          summaryLong: data.summaryLong || "",
        });
      } catch (err) {
        if (!cancelled) {
          alert("Failed to load location for edit");
          navigate("/design");
        }
      }
    }

    loadLocation();

    return () => {
      cancelled = true;
    };
  }, [locationId, setValues, navigate]);

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formAction(formData);
  };

  return (
    <section className="auth-section">
      <form className="auth-form" onSubmit={onSubmit}>
        <h2 className="auth-title">Edit Location</h2>

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
            placeholder="https://example.com/your-image.jpg"
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
          Save Changes
        </button>
      </form>
    </section>
  );
}
