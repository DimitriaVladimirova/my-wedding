import { createContext, useContext, useEffect, useState } from "react";

const WeddingSelectionContext = createContext();
const STORAGE_KEY = "weddingSelections";

export function WeddingSelectionProvider({ children }) {
  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const [selectedMenuIds, setSelectedMenuIds] = useState([]);
  const [menuGuestsByMenu, setMenuGuestsByMenu] = useState({});
  const [selectedDarkColorId, setSelectedDarkColorId] = useState(null);
  const [selectedLightColorId, setSelectedLightColorId] = useState(null);



  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;

      const data = JSON.parse(raw);

      setSelectedLocationId(data.selectedLocationId ?? null);
      setSelectedMenuIds(data.selectedMenuIds ?? []);
      setMenuGuestsByMenu(data.menuGuestsByMenu ?? {});
      setSelectedDarkColorId(data.selectedDarkColorId ?? null);
      setSelectedLightColorId(data.selectedLightColorId ?? null);
    } catch (err) {
      console.error("Failed to load wedding selections", err);
    }
  }, []);

  useEffect(() => {
    const data = {
      selectedLocationId,
      selectedMenuIds,
      menuGuestsByMenu,
      selectedDarkColorId,
      selectedLightColorId,
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (err) {
      console.error("Failed to save wedding selections", err);
    }
  }, [
    selectedLocationId,
    selectedMenuIds,
    menuGuestsByMenu,
    selectedDarkColorId,
    selectedLightColorId,
  ]);




  const chooseLocation = (id) => setSelectedLocationId(id);

  const toggleMenu = (menuId) => {
    setSelectedMenuIds((prev) =>
      prev.includes(menuId)
        ? prev.filter((id) => id !== menuId)
        : [...prev, menuId]
    );
  };

  const setMenuGuestsForMenu = (menuId, guests) => {
    setMenuGuestsByMenu((prev) => ({
      ...prev,
      [menuId]: guests,
    }));
  };

  const chooseDarkColor = (id) => setSelectedDarkColorId(id);
  const chooseLightColor = (id) => setSelectedLightColorId(id);

  const value = {
    selectedLocationId,
    chooseLocation,
    selectedMenuIds,
    toggleMenu,
    menuGuestsByMenu,
    setMenuGuestsForMenu,
    selectedDarkColorId,
    chooseDarkColor,
    selectedLightColorId,
    chooseLightColor,
  };

  return (
    <WeddingSelectionContext.Provider value={value}>
      {children}
    </WeddingSelectionContext.Provider>
  );
}

export function useWeddingSelection() {
  return useContext(WeddingSelectionContext);
}
