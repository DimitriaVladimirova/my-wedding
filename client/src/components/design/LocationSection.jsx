import { useState } from "react";
import { useNavigate } from "react-router";
import { useWeddingSelection } from "../../context/WeddingSelectionContext";

export default function LocationsSection({ locations, isAdmin, isAuthenticated }) {
  const navigate = useNavigate();
  const { selectedLocationId, chooseLocation } = useWeddingSelection();

  const PAGE_SIZE = 3;
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(locations.length / PAGE_SIZE);
  const start = page * PAGE_SIZE;
  const visibleLocations = locations.slice(start, start + PAGE_SIZE);

  const handlePrev = () => setPage((p) => Math.max(p - 1, 0));
  const handleNext = () => setPage((p) => Math.min(p + 1, totalPages - 1));

  return (
    <section className="design-section">
      <div className="design-section-header">
        <h2 className="design-section-title">Locations</h2>

        {isAdmin && (
          <button
            className="design-admin-btn"
            type="button"
            onClick={() => navigate("/design/locations/create")}
          >
            + Add location
          </button>
        )}
      </div>

      <div className="card-grid">
        {visibleLocations.map((loc) => (
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

                {!isAdmin && isAuthenticated && (
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
            </div>
          </article>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="carousel-controls">
          <button
            type="button"
            className="design-secondary-btn"
            onClick={handlePrev}
            disabled={page === 0}
          >
            ‹ Prev
          </button>
          <span className="carousel-page-indicator">
            Page {page + 1} / {totalPages}
          </span>
          <button
            type="button"
            className="design-secondary-btn"
            onClick={handleNext}
            disabled={page === totalPages - 1}
          >
            Next ›
          </button>
        </div>
      )}
    </section>
  );
}
