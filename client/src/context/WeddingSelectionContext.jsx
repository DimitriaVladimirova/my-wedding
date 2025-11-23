import { createContext, useContext, useState } from "react";

const WeddingSelectionContext = createContext();

export function WeddingSelectionProvider({ children }) {
  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const [selectedMenuId, setSelectedMenuId] = useState(null);
  const [menuGuestsByMenu, setMenuGuestsByMenu] = useState({});
  const [selectedDarkColorId, setSelectedDarkColorId] = useState(null);
  const [selectedLightColorId, setSelectedLightColorId] = useState(null);

  const chooseLocation = (id) => setSelectedLocationId(id);
  const chooseMenu = (id) => setSelectedMenuId(id);
  const setMenuGuestsForMenu = (menuId, guests) =>
    setMenuGuestsByMenu((prev) => ({ ...prev, [menuId]: guests }));

  const chooseDarkColor = (id) => setSelectedDarkColorId(id);
  const chooseLightColor = (id) => setSelectedLightColorId(id);

  const value = {
    selectedLocationId,
    chooseLocation,
    selectedMenuId,
    chooseMenu,
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
