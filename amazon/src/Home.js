import React from "react";
import "./Home.css";

function Home({ products, onAddToCart }) {
  return (
    <main className="home">
      <section className="home__hero" aria-labelledby="hero-title">
        <div>
          <p className="home__eyebrow">Curated desk, travel, and audio gear</p>
          <h1 id="hero-title">A compact React storefront with working cart state.</h1>
          <p>
            Search products, add items to the cart, and keep pricing visible without relying on a backend.
          </p>
        </div>
      </section>

      <section className="home__grid" aria-label="Product catalog">
        {products.map((product) => (
          <article className="product" key={product.id}>
            <img src={product.image} alt={product.name} />
            <div className="product__body">
              <p className="product__category">{product.category}</p>
              <h2>{product.name}</h2>
              <p className="product__rating">Rating {product.rating} / 5</p>
              <div className="product__footer">
                <strong>${product.price.toFixed(2)}</strong>
                <button type="button" onClick={() => onAddToCart(product)}>
                  Add to cart
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

export default Home;
