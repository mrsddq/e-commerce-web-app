import React from "react";
import "./Header.css";

function Header({ cartCount, cartTotal, query, onQueryChange }) {
  return (
    <header className="header">
      <div className="header__brand" aria-label="Storefront home">
        MarketLab
      </div>

      <div className="header__search">
        <input
          aria-label="Search products"
          className="header__searchInput"
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search products"
          type="search"
          value={query}
        />
        <span className="header__searchIcon" aria-hidden="true">Go</span>
      </div>

      <div className="header__nav">
        <div className="header__option">
          <span className="header__optionLineOne">Hello</span>
          <span className="header__optionLineTwo">Guest</span>
        </div>

        <div className="header__option">
          <span className="header__optionLineOne">Cart total</span>
          <span className="header__optionLineTwo">${cartTotal.toFixed(2)}</span>
        </div>

        <div className="header__optionBasket" aria-label={`${cartCount} items in cart`}>
          <span aria-hidden="true">Cart</span>
          <span className="header__optionLineTwo header__basketCount">{cartCount}</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
