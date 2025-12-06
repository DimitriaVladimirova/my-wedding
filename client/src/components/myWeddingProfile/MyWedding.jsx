import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../context/UserContext";
import { useWeddingSelection } from "../../context/WeddingSelectionContext";
import { getLocations, getMenus, getColors } from "../../services/design";

export default function MyWedding() {
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin, user } = useContext(UserContext);

  const {
    selectedLocationId,
    selectedMenuIds,
    menuGuestsByMenu,
    selectedDarkColorId,
    selectedLightColorId,
  } = useWeddingSelection();

  const [location, setLocation] = useState(null);
  const [menus, setMenus] = useState([]);
  const [darkColor, setDarkColor] = useState(null);
  const [lightColor, setLightColor] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isAuthenticated) {
    return (
      <main className="design-page">
        <h1 className="design-title">My Wedding</h1>
        <p className="design-intro">
          You need to be logged in to see your wedding plan.
        </p>
        <button
          className="design-primary-btn"
          type="button"
          onClick={() => navigate("/login")}
        >
          Go to Login
        </button>
      </main>
    );
  }

  if (isAdmin) {
    return (
      <main className="design-page">
        <h1 className="design-title">My Wedding</h1>
        <p className="design-intro">
          You are logged in as <strong>admin</strong>. Admins manage content but
          don&apos;t have personal wedding selections.
        </p>
        <button
          className="design-primary-btn"
          type="button"
          onClick={() => navigate("/design")}
        >
          Go to Design Choices
        </button>
      </main>
    );
  }

  useEffect(() => {
    let cancelled = false;

    async function loadData() {

      if (
        !selectedLocationId &&
        (!selectedMenuIds || selectedMenuIds.length === 0) &&
        !selectedDarkColorId &&
        !selectedLightColorId
      ) {
        setLocation(null);
        setMenus([]);
        setDarkColor(null);
        setLightColor(null);
        setLoading(false);
        setError("");
        return;
      }

      try {
        setLoading(true);
        setError("");

        const [allLocations, allMenus, allColors] = await Promise.all([
          getLocations(),
          getMenus(),
          getColors(),
        ]);

        if (cancelled) return;

        const loc =
          selectedLocationId &&
          allLocations.find((l) => l._id === selectedLocationId);

        const myMenus =
          selectedMenuIds && selectedMenuIds.length > 0
            ? allMenus.filter((m) => selectedMenuIds.includes(m._id))
            : [];

        const dark =
          selectedDarkColorId &&
          allColors.find((c) => c._id === selectedDarkColorId);

        const light =
          selectedLightColorId &&
          allColors.find((c) => c._id === selectedLightColorId);

        setLocation(loc || null);
        setMenus(myMenus);
        setDarkColor(dark || null);
        setLightColor(light || null);
      } catch (err) {
        console.error(err);
        if (!cancelled) {
          setError("Failed to load your wedding selections.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    setLoading(true);
    loadData();

    return () => {
      cancelled = true;
    };
  }, [
    selectedLocationId,
    selectedMenuIds,
    selectedDarkColorId,
    selectedLightColorId,
  ]);

  if (loading) {
    return (
      <main className="design-page">
        <h1 className="design-title">My Wedding</h1>
        <p className="design-intro">Loading your wedding profile…</p>
      </main>
    );
  }

  const hasAnySelection =
    location ||
    (menus && menus.length > 0) ||
    darkColor ||
    lightColor;

  return (
    <main className="design-page">
      <h1 className="design-title">My Wedding</h1>
      <p className="design-intro">
        {user?.email
          ? `Here are your current selections, ${user.email}.`
          : "Here are your current selections."}
      </p>

      {error && (
        <p className="auth-error" style={{ marginBottom: "1.5rem" }}>
          {error}
        </p>
      )}

      {!hasAnySelection && (
        <section className="design-section">
          <p className="design-intro">
            You haven&apos;t selected anything yet. Go to Design Choices to start planning your wedding.
          </p>
        </section>
      )}

      <section className="design-section">
        <div className="design-section-header">
          <h2 className="design-section-title">Location</h2>
          <button
            className="design-secondary-btn"
            type="button"
            onClick={() => navigate("/design")}
          >
            Change location
          </button>
        </div>

        {location ? (
          <div className="card-grid">
            <article className="design-card">
              <div className="design-card-image-wrap">
                <img
                  src={location.imageUrl}
                  alt={location.title}
                  className="design-card-image"
                />
              </div>
              <div className="design-card-body">
                <h3 className="design-card-title">{location.title}</h3>
                <p className="design-card-meta">
                  {location.city && location.country
                    ? `${location.city}, ${location.country}`
                    : null}
                </p>
                <p className="design-card-text">
                  {location.summaryShort || location.summary}
                </p>
              </div>
            </article>
          </div>
        ) : (
          <p className="design-intro">
            You haven&apos;t chosen a location yet.
          </p>
        )}
      </section>

      <section className="design-section">
        <div className="design-section-header">
          <h2 className="design-section-title">Menus</h2>
          <button
            className="design-secondary-btn"
            type="button"
            onClick={() => navigate("/design")}
          >
            Change menus
          </button>
        </div>

        {menus && menus.length > 0 ? (
          <div className="card-grid">
            {menus.map((menu) => {
              const guests = menuGuestsByMenu[menu._id] ?? 1;

              return (
                <article key={menu._id} className="design-card">
                  <div className="design-card-image-wrap">
                    <img
                      src={menu.imageUrl}
                      alt={menu.title}
                      className="design-card-image"
                    />
                  </div>
                  <div className="design-card-body">
                    <h3 className="design-card-title">{menu.title}</h3>
                    <p className="design-card-text">{menu.description}</p>
                    <p className="design-card-meta">
                      {menu.pricePerGuest} € / guest · max {menu.maxGuests}{" "}
                      guests
                    </p>
                    <p className="design-card-meta">
                      <strong>Your guests for this menu:</strong> {guests}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <p className="design-intro">You haven&apos;t chosen any menus yet.</p>
        )}
      </section>

      <section className="design-section">
        <div className="design-section-header">
          <h2 className="design-section-title">Theme Colors</h2>
          <button
            className="design-secondary-btn"
            type="button"
            onClick={() => navigate("/design")}
          >
            Change colors
          </button>
        </div>

        <div className="theme-block">
          <h3 className="theme-subtitle">Main (dark) color</h3>
          {darkColor ? (
            <div className="color-row">
              <div className="color-circle-btn color-circle-btn--selected">
                <span
                  className="color-circle"
                  style={{ backgroundColor: darkColor.hex }}
                />
                <span className="color-name">{darkColor.name}</span>
              </div>
            </div>
          ) : (
            <p className="design-intro">No dark color selected.</p>
          )}
        </div>

        <div className="theme-block">
          <h3 className="theme-subtitle">Accent (light) color</h3>
          {lightColor ? (
            <div className="color-row">
              <div className="color-circle-btn color-circle-btn--selected">
                <span
                  className="color-circle"
                  style={{ backgroundColor: lightColor.hex }}
                />
                <span className="color-name">{lightColor.name}</span>
              </div>
            </div>
          ) : (
            <p className="design-intro">No light color selected.</p>
          )}
        </div>
      </section>
    </main>
  );
}
