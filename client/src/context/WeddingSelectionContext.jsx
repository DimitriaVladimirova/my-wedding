import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

const WeddingSelectionContext = createContext();
const STORAGE_KEY_PREFIX = "weddingSelections";

const initialState = {
  selectedLocationId: null,
  selectedMenuIds: [],
  menuGuestsByMenu: {},
  selectedDarkColorId: null,
  selectedLightColorId: null,
};

export function WeddingSelectionProvider({ children }) {
  const { user } = useContext(UserContext);

  const [selectedLocationId, setSelectedLocationId] = useState(
    initialState.selectedLocationId
  );
  const [selectedMenuIds, setSelectedMenuIds] = useState(
    initialState.selectedMenuIds
  );
  const [menuGuestsByMenu, setMenuGuestsByMenu] = useState(
    initialState.menuGuestsByMenu
  );
  const [selectedDarkColorId, setSelectedDarkColorId] = useState(
    initialState.selectedDarkColorId
  );
  const [selectedLightColorId, setSelectedLightColorId] = useState(
    initialState.selectedLightColorId
  );

  const userKey = user?._id || user?.id || user?.email || null;

  const getStorageKey = (key) =>
    key ? `${STORAGE_KEY_PREFIX}:${key}` : STORAGE_KEY_PREFIX;

  useEffect(() => {
    if (!userKey) {
      setSelectedLocationId(initialState.selectedLocationId);
      setSelectedMenuIds(initialState.selectedMenuIds);
      setMenuGuestsByMenu(initialState.menuGuestsByMenu);
      setSelectedDarkColorId(initialState.selectedDarkColorId);
      setSelectedLightColorId(initialState.selectedLightColorId);
      return;
    }

    try {
      const raw = localStorage.getItem(getStorageKey(userKey));
      if (!raw) {
        setSelectedLocationId(initialState.selectedLocationId);
        setSelectedMenuIds(initialState.selectedMenuIds);
        setMenuGuestsByMenu(initialState.menuGuestsByMenu);
        setSelectedDarkColorId(initialState.selectedDarkColorId);
        setSelectedLightColorId(initialState.selectedLightColorId);
        return;
      }

      const data = JSON.parse(raw);

      setSelectedLocationId(data.selectedLocationId ?? null);
      setSelectedMenuIds(data.selectedMenuIds ?? []);
      setMenuGuestsByMenu(data.menuGuestsByMenu ?? {});
      setSelectedDarkColorId(data.selectedDarkColorId ?? null);
      setSelectedLightColorId(data.selectedLightColorId ?? null);
    } catch (err) {
      console.error("Failed to load wedding selections", err);
      setSelectedLocationId(initialState.selectedLocationId);
      setSelectedMenuIds(initialState.selectedMenuIds);
      setMenuGuestsByMenu(initialState.menuGuestsByMenu);
      setSelectedDarkColorId(initialState.selectedDarkColorId);
      setSelectedLightColorId(initialState.selectedLightColorId);
    }
  }, [userKey]);

  useEffect(() => {
    if (!userKey) return; 

    const data = {
      selectedLocationId,
      selectedMenuIds,
      menuGuestsByMenu,
      selectedDarkColorId,
      selectedLightColorId,
    };

    try {
      localStorage.setItem(getStorageKey(userKey), JSON.stringify(data));
    } catch (err) {
      console.error("Failed to save wedding selections", err);
    }
  }, [
    userKey,
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
