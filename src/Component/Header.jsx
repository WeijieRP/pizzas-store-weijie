import React from "react";
import "./header.css";

function Header() {
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
        <h1 className="title">Weijie&apos;s Pizza Co.</h1>
        <p className="tagline">Freshly baked. Always made with passion</p>
      </header>
    </>
  );
}

export default Header;
