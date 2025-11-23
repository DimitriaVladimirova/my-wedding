import { useState, useEffect } from "react";
import { getLocations, getMenus, getColors } from "../../services/design";
import LocationsSection from "./LocationSection";
import MenuSection from "./MenuSection";
import ThemeSection from "./ThemeSection";


export default function DesignChoices() {
  // TODO: replace these with real auth from context later
  const isAuthenticated = true; //set opposite for change
  const isAdmin = true;  //set opposite for change  

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
      />

      <ThemeSection
        darkColors={darkColors}
        lightColors={lightColors}
        isAdmin={isAdmin}
        isAuthenticated={isAuthenticated}
      />
    </main>
  );
}
