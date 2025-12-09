import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useForm from "../../hooks/useForm";
import useRequest from "../../hooks/useRequest";
import { UserContext } from "../../context/UserContext";
import { getMenuById } from "../../services/design";

export default function MenuEdit() {
  const { menuId } = useParams();
  const navigate = useNavigate();
  const { isAdmin } = useContext(UserContext);
  const { request } = useRequest();

  const [error, setError] = useState("")

  const { setValues, register, formAction } = useForm(editMenuHandler, {
    title: "",
    description: "",
    imageUrl: "",
    pricePerGuest: "",
    maxGuests: "150",
  });

  async function editMenuHandler(formValues) {
    setError("");

    const title = formValues.title.trim();
    const description = formValues.description.trim();
    const imageUrl = formValues.imageUrl.trim();
    const pricePerGuest = Number(formValues.pricePerGuest);
    const maxGuests = Number(formValues.maxGuests);

    if (!title || !description || !imageUrl) {
      setError("Title, description and image URL are required.");
      return;
    }

    if (description.length < 50 || description.length > 500) {
      setError("Description must be between 50 and 500 characters.");
      return;
    }

    const urlRegex = /^https?:\/\/.+/i;
    if (!urlRegex.test(imageUrl)) {
      setError("Image URL must start with http:// or https://");
      return;
    }

    if (Number.isNaN(pricePerGuest) || pricePerGuest <= 0) {
      setError("Price per guest must be a positive number.");
      return;
    }

    if (Number.isNaN(maxGuests) || maxGuests < 1) {
      setError("Max guests must be at least 1.");
      return;
    }

    const data = { title, description, imageUrl, pricePerGuest, maxGuests, };

    try {
      await request(`/data/menus/${menuId}`, "PUT", data, { admin: true });
      navigate("/design");
    } catch (err) {
      setError(err.message || "Failed to update menu");
    }
  }

  useEffect(() => {
    if (!isAdmin) {
      navigate("/design");
    }
  }, [isAdmin, navigate]);

  useEffect(() => {
    let cancelled = false;

    async function loadMenu() {
      try {
        const data = await getMenuById(menuId);
        if (cancelled) return;

        setValues({
          title: data.title || "",
          description: data.description || "",
          imageUrl: data.imageUrl || "",
          pricePerGuest: data.pricePerGuest ?? "",
          maxGuests: data.maxGuests ?? "150",
        });
      } catch (err) {
        if (!cancelled) {
          alert("Failed to load menu for edit");
          navigate("/design");
        }
      }
    }

    loadMenu();

    return () => {
      cancelled = true;
    };
  }, [menuId, setValues, navigate]);

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formAction(formData);
  };

  return (
    <section className="auth-section">
      <form className="auth-form" onSubmit={onSubmit}>
        <h2 className="auth-title">Edit Menu</h2>

        {error && <p className="auth-error">{error}</p>}

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
            placeholder="https://example.com/menu.jpg"
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
            max="150"
            {...register("maxGuests")}
          />
        </label>

        <button className="auth-btn" type="submit">
          Save Changes
        </button>
      </form>
    </section>
  );
}
