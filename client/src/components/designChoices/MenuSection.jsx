import { useWeddingSelection } from "../../context/WeddingSelectionContext";

export default function MenuSection({ menus, isAdmin, isAuthenticated }) {
  const {
    selectedMenuId,
    chooseMenu,
    menuGuestsByMenu,
    setMenuGuestsForMenu,
  } = useWeddingSelection();

  const handleGuestsChange = (menuId, e) => {
    let value = Number(e.target.value);
    if (Number.isNaN(value)) value = 1;
    if (value < 1) value = 1;
    if (value > 150) value = 150;
    setMenuGuestsForMenu(menuId, value);
  };

  return (
    <section className="design-section">
      <div className="design-section-header">
        <h2 className="design-section-title">Menu</h2>

        {isAdmin && (
          <button className="design-admin-btn" type="button">
            + Add menu
          </button>
        )}
      </div>

      <div className="card-grid">
        {menus.map((menu) => (
          <article
            key={menu._id}
            className={
              "design-card" +
              (menu._id === selectedMenuId ? " design-card--selected" : "")
            }
          >
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
                {menu.pricePerGuest} € / guest · max {menu.maxGuests} guests
              </p>

              {isAuthenticated && (
                <div className="design-card-actions menu-actions">
                  <button
                    className="design-primary-btn"
                    type="button"
                    onClick={() => chooseMenu(menu._id)}
                  >
                    {selectedMenuId === menu._id
                      ? "Menu selected"
                      : "Choose this menu"}
                  </button>

                  <div className="menu-quantity">
                    <label>
                      Guests:{" "}
                      <input
                        type="number"
                        min="1"
                        max="150"
                        value={menuGuestsByMenu[menu._id] ?? 1}
                        onChange={(e) => handleGuestsChange(menu._id, e)}
                      />
                    </label>
                  </div>
                </div>
              )}

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
