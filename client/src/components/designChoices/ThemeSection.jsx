import { useWeddingSelection } from "../../context/WeddingSelectionContext";

export default function ThemeSection({
  darkColors,
  lightColors,
  isAdmin,
  isAuthenticated,
}) {
  const {
    selectedDarkColorId,
    chooseDarkColor,
    selectedLightColorId,
    chooseLightColor,
  } = useWeddingSelection();

  return (
    <section className="design-section">
      <div className="design-section-header">
        <h2 className="design-section-title">Theme</h2>

        {isAdmin && (
          <button className="design-admin-btn" type="button">
            + Add colors
          </button>
        )}
      </div>

      <div className="theme-block">
        <h3 className="theme-subtitle">Main (dark) colors</h3>
        <div className="color-row">
          {darkColors.map((color) => (
            <button
              key={color._id}
              className={
                "color-circle-btn" +
                (selectedDarkColorId === color._id
                  ? " color-circle-btn--selected"
                  : "")
              }
              onClick={() => isAuthenticated && chooseDarkColor(color._id)}
              type="button"
            >
              <span
                className="color-circle"
                style={{ backgroundColor: color.hex }}
              />
              <span className="color-name">{color.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="theme-block">
        <h3 className="theme-subtitle">Accent (light) colors</h3>
        <div className="color-row">
          {lightColors.map((color) => (
            <button
              key={color._id}
              className={
                "color-circle-btn" +
                (selectedLightColorId === color._id
                  ? " color-circle-btn--selected"
                  : "")
              }
              onClick={() => isAuthenticated && chooseLightColor(color._id)}
              type="button"
            >
              <span
                className="color-circle"
                style={{ backgroundColor: color.hex }}
              />
              <span className="color-name">{color.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
