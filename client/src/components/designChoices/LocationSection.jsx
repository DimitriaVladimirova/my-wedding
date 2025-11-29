import { useNavigate } from "react-router";
import { useWeddingSelection } from "../../context/WeddingSelectionContext";

export default function LocationsSection({ locations, isAdmin, isAuthenticated }) {
  const navigate = useNavigate();
  const { selectedLocationId, chooseLocation } = useWeddingSelection();

  //TODO FIX images

  return (
    <section className="design-section">
      <div className="design-section-header">
        <h2 className="design-section-title">Locations</h2>

        {isAdmin && (
          <button className="design-admin-btn" type="button">
            + Add location
          </button>
        )}
      </div>

      <div className="card-grid">
        {locations.map((loc) => (
          <article
            key={loc._id}
            className={
              "design-card" +
              (loc._id === selectedLocationId ? " design-card--selected" : "")
            }
          >
            <div className="design-card-image-wrap">
              <img
                src={loc.imageUrl}
                alt={loc.title}
                className="design-card-image"
              />
            </div>
            <div className="design-card-body">
              <h3 className="design-card-title">{loc.title}</h3>
              <div className="design-card-text">
                {loc.summaryShort || loc.summary}
              </div>

              <div className="design-card-actions">
                <button
                  className="design-secondary-btn"
                  type="button"
                  onClick={() => navigate(`/design/locations/${loc._id}`)}
                >
                  Details
                </button>

                {isAuthenticated && !isAdmin && (
                  <button
                    className="design-primary-btn"
                    type="button"
                    onClick={() => chooseLocation(loc._id)}
                  >
                    {selectedLocationId === loc._id
                      ? "Chosen"
                      : "Choose this location"}
                  </button>
                )}
              </div>

              {isAdmin && (
                <div className="details-admin-actions">
                  <button className="design-secondary-btn" type="button">
                    Edit
                  </button>
                  <button className="design-danger-btn" type="button">
                    Delete
                  </button>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}