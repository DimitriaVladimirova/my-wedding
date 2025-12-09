import { useState, useEffect, useContext } from "react";
import { getLocations, getMenus, getColors } from "../../services/design";
import LocationsSection from "./LocationSection";
import MenuSection from "./MenuSection";
import ThemeSection from "./ThemeSection";
import { UserContext } from "../../context/UserContext";
import useRequest from "../../hooks/useRequest";
import { useNavigate } from "react-router";
import { useWeddingSelection } from "../../context/WeddingSelectionContext";


export default function DesignChoices() {

  const navigate = useNavigate();
  const { isAuthenticated, isAdmin } = useContext(UserContext);
  const { request } = useRequest();

  const {
    selectedLocationId,
    selectedMenuIds,
    selectedDarkColorId,
    selectedLightColorId,
  } = useWeddingSelection();

  const [locations, setLocations] = useState([]);
  const [menus, setMenus] = useState([]);
  const [darkColors, setDarkColors] = useState([]);
  const [lightColors, setLightColors] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      try {
        setLoading(true);
        setError("");

        const [locRes, menuRes, colorRes] = await Promise.all([
          getLocations(),
          getMenus(),
          getColors(),
        ]);

        if (cancelled) return;

        setLocations(locRes || []);
        setMenus(menuRes || []);

        const allColors = colorRes || [];
        const dark = allColors.filter((c) => c.shadeType === "dark");
        const light = allColors.filter((c) => c.shadeType === "light");

        setDarkColors(dark);
        setLightColors(light);
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Failed to load design options.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleDeleteMenu = async (id) => {
    if (!isAdmin) return;
    const sure = window.confirm("Delete this menu?");
    if (!sure) return;

    try {
      await request(`/data/menus/${id}`, "DELETE", null, { admin: true });
      setMenus((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      alert(err.message || "Failed to delete menu");
    }
  };

  const handleDeleteColor = async (id) => {
    if (!isAdmin) return;
    const sure = window.confirm("Delete this color?");
    if (!sure) return;

    try {
      await request(`/data/colors/${id}`, "DELETE", null, { admin: true });

      setDarkColors((prev) => prev.filter((c) => c._id !== id));
      setLightColors((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      alert(err.message || "Failed to delete color");
    }
  };

  if (loading) {
    return (
      <main className="design-page">
        <h1 className="design-title">Design Choices</h1>
        <p className="design-intro">Loading your wedding options…</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="design-page">
        <h1 className="design-title">Design Choices</h1>
        <p className="design-intro" style={{ color: "darkred" }}>
          {error}
        </p>
      </main>
    );
  }

  const hasCompleteSelection =
    !!selectedLocationId &&
    selectedMenuIds &&
    selectedMenuIds.length > 0 &&
    !!selectedDarkColorId &&
    !!selectedLightColorId;

  return (
    <main className="design-page">
      <h1 className="design-title">Design Choices</h1>
      <p className="design-intro">
        Choose your dream wedding location, menu and theme colors. You can
        select one location, one menu and one dark + one light color
        combination.
      </p>

      <LocationsSection
        locations={locations}
        isAdmin={isAdmin}
        isAuthenticated={isAuthenticated}
      />

      <MenuSection
        menus={menus}
        isAdmin={isAdmin}
        isAuthenticated={isAuthenticated}
        onDeleteMenu={handleDeleteMenu}
      />

      <ThemeSection
        darkColors={darkColors}
        lightColors={lightColors}
        isAdmin={isAdmin}
        isAuthenticated={isAuthenticated}
        onDeleteColor={handleDeleteColor}
      />

      {isAuthenticated && !isAdmin && (
        <div
          style={{
            textAlign: "center",
            marginTop: "2.5rem",
            marginBottom: "1rem",
          }}
        >
          <button
            className="design-primary-btn"
            type="button"
            disabled={!hasCompleteSelection}
            onClick={() => navigate("/my-wedding")}
          >
            See your selections
          </button>
        </div>
      )}
    </main>
  );
}
