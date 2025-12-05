import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { getLocationById } from "../../services/design";
import { UserContext } from "../../context/UserContext";
import { useWeddingSelection } from "../../context/WeddingSelectionContext";
import useRequest from "../../hooks/useRequest";

export default function LocationDetails() {
  const { locationId } = useParams();
  const navigate = useNavigate();

  const { isAuthenticated, isAdmin } = useContext(UserContext);
  const { selectedLocationId, chooseLocation } = useWeddingSelection();
  const { request } = useRequest();

  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadLocation() {
      try {
        setLoading(true);
        setError("");

        const data = await getLocationById(locationId);
        if (cancelled) return;

        setLocation(data);
      } catch (err) {
        if (!cancelled) {
          console.error(err);
          setError("Failed to load location.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadLocation();

    return () => {
      cancelled = true;
    };
  }, [locationId]);

  const handleChoose = () => {
    if (!isAuthenticated || isAdmin) return;
    chooseLocation(location._id);
  };

  const handleDelete = async () => {
    if (!isAdmin || !location) return;

    const confirm = window.confirm("Delete this location?");
    if (!confirm) return;

    try {
      await request(`/data/locations/${location._id}`, "DELETE", null, {
        admin: true,
      });

      navigate("/design");
    } catch (err) {
      alert(err.message || "Failed to delete location");
    }
  };

  const isChosen = selectedLocationId === location?._id;

  if (loading) {
    return (
      <main className="design-page">
        <p className="design-intro">Loading location details…</p>
      </main>
    );
  }

  if (error || !location) {
    return (
      <main className="design-page">
        <p className="design-intro" style={{ color: "darkred" }}>
          {error || "Location not found."}
        </p>
        <button
          className="design-secondary-btn"
          type="button"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>
      </main>
    );
  }

  return (
    <main className="design-page location-details-page">
      <button
        className="design-secondary-btn"
        type="button"
        onClick={() => navigate(-1)}
      >
        ← Back to design choices
      </button>

      <section className="design-section location-details-section">
        <div className="location-details-header">
          <h1 className="design-title">{location.title}</h1>
          <p className="design-intro">
            {location.city && location.country
              ? `${location.city}, ${location.country}`
              : null}
          </p>
        </div>

        <div className="location-details-content">
          <div className="location-main-image-wrap">
            <img
              src={location.imageUrl}
              alt={location.title}
              className="location-main-image"
            />
          </div>

          <div className="location-text-block">
            <p className="details-text">
              {location.summaryLong ||
                location.summary ||
                location.summaryShort}
            </p>

            {isAuthenticated && !isAdmin && (
              <button
                className="design-primary-btn"
                type="button"
                onClick={handleChoose}
              >
                {isChosen ? "Location selected" : "Choose this location"}
              </button>
            )}

            {isAdmin && (
              <div className="details-admin-actions">
                <button className="design-secondary-btn" type="button"
                  onClick={() => navigate(`/design/locations/${location._id}/edit`)}>
                  Edit
                </button>
                <button
                  className="design-danger-btn"
                  type="button"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        {Array.isArray(location.gallery) && location.gallery.length > 0 && (
          <div className="location-gallery">
            {location.gallery.map((img) => (
              <div key={img} className="location-gallery-item">
                <img src={img} alt={location.title} />
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
