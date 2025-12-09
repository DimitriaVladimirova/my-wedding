import { useContext, useEffect, useState } from "react";
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

  const [error, setError] = useState("");

  const { setValues, register, formAction } = useForm(editLocationHandler, {
    title: "",
    city: "",
    country: "",
    imageUrl: "",
    summaryShort: "",
    summaryLong: "",
  });

  async function editLocationHandler(formValues) {
    setError("");

    const title = formValues.title.trim();
    const city = formValues.city.trim();
    const country = formValues.country.trim();
    const imageUrl = formValues.imageUrl.trim();
    const summaryShort = formValues.summaryShort.trim();
    const summaryLong = formValues.summaryLong.trim();

    if (!title || !city || !country || !imageUrl) {
      setError("Title, city, country and image URL are required.");
      return;
    }

    const urlRegex = /^https?:\/\/.+/i;
    if (!urlRegex.test(imageUrl)) {
      setError("Image URL must start with http:// or https://");
      return;
    }

    if (summaryShort.length < 10) {
      setError("Short summary must be at least 10 characters.");
      return;
    }

    if (summaryLong.length > 500) {
      setError("Long summary must be less than 500 characters.");
      return;
    }

    const data = {
      title,
      city,
      country,
      imageUrl,
      summaryShort,
      summaryLong,
    };

    try {
      await request(`/data/locations/${locationId}`, "PUT", data, {
        admin: true,
      });

      navigate("/design");
    } catch (err) {
      setError(err.message || "Failed to update location");
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

        {error && <p className="auth-error">{error}</p>}

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
