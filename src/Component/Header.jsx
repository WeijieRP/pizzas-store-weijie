import React from "react";
import "./header.css";

function Header({title , subtitle}) {
  return (
    <>
      <div className="promo-banner" role="region" aria-label="Promotion">
        <div className="promo-track" aria-live="polite">
          <span className="promo-segment">
            Weekend Special! <strong>50% Off</strong> All Large Pizzas —
            Order Before Sunday Midnight!
          </span>
          <span className="promo-segment">
            Weekend Special! <strong>50% Off</strong> All Large Pizzas —
            Order Before Sunday Midnight!
          </span>
          <span className="promo-segment">
            Weekend Special! <strong>50% Off</strong> All Large Pizzas —
            Order Before Sunday Midnight!
          </span>
        </div>
      </div>

      <header className="header">
        <h1 className="title">{title}</h1>
        <p className="tagline">{subtitle}</p>
      </header>
    </>
  );
}

export default Header;
