import { useWeddingSelection } from "../../context/WeddingSelectionContext";
import { useNavigate } from "react-router";

export default function ThemeSection({
  darkColors,
  lightColors,
  isAdmin,
  isAuthenticated,
}) {

  const navigate = useNavigate()

  const {
    selectedDarkColorId,
    chooseDarkColor,
    selectedLightColorId,
    chooseLightColor,
  } = useWeddingSelection();

  const handleDeleteColor = (id) => {
    // TODO: call DELETE /data/colors/:id when implement
    console.log("Delete color with id:", id);
  };

  const canChoose = isAuthenticated && !isAdmin;

  return (
    <section className="design-section">
      <div className="design-section-header">
        <h2 className="design-section-title">Theme</h2>

        {isAdmin && (
          <button
            className="design-admin-btn"
            type="button"
            onClick={() => navigate("/design/colors/create")}
          >
            + Add colors
          </button>
        )}
      </div>

      <div className="theme-block">
        <h3 className="theme-subtitle">Main (dark) colors</h3>
        <div className="color-row">
          {darkColors.map((color) => (
            <div key={color._id} className="color-item">
              <button
                className={
                  "color-circle-btn" +
                  (selectedDarkColorId === color._id
                    ? " color-circle-btn--selected"
                    : "")
                }
                type="button"
                onClick={() => {
                  if (!canChoose) return;
                  chooseDarkColor(color._id);
                }}
              >
                <span
                  className="color-circle"
                  style={{ backgroundColor: color.hex }}
                />
                <span className="color-name">{color.name}</span>
              </button>

              {isAdmin && (
                <button
                  className="color-delete-btn"
                  type="button"
                  onClick={() => handleDeleteColor(color._id)}
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="theme-block">
        <h3 className="theme-subtitle">Accent (light) colors</h3>
        <div className="color-row">
          {lightColors.map((color) => (
            <div key={color._id} className="color-item">
              <button
                className={
                  "color-circle-btn" +
                  (selectedLightColorId === color._id
                    ? " color-circle-btn--selected"
                    : "")
                }
                type="button"
                onClick={() => {
                  if (!canChoose) return;
                  chooseLightColor(color._id);
                }}
              >
                <span
                  className="color-circle"
                  style={{ backgroundColor: color.hex }}
                />
                <span className="color-name">{color.name}</span>
              </button>

              {isAdmin && (
                <button
                  className="color-delete-btn"
                  type="button"
                  onClick={() => handleDeleteColor(color._id)}
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
