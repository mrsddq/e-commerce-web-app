import React, { useMemo, useState, useReducer } from "react";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import { cartReducer, cartSummary, formatPrice } from "./cart";

const PRODUCTS = [
  {
    id: "keyboard",
    name: "Mechanical Keyboard",
    category: "Workstation",
    priceCents: 8999,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "headphones",
    name: "Noise Cancelling Headphones",
    category: "Audio",
    priceCents: 12999,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "desk-lamp",
    name: "LED Desk Lamp",
    category: "Home Office",
    priceCents: 4450,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "backpack",
    name: "Commuter Backpack",
    category: "Travel",
    priceCents: 6400,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80",
  },
];

function App() {
  const [query, setQuery] = useState("");
  const [cart, dispatch] = useReducer(cartReducer, {});

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) {
      return PRODUCTS;
    }

    return PRODUCTS.filter((product) =>
      `${product.name} ${product.category}`.toLowerCase().includes(normalizedQuery)
    );
  }, [query]);

  const summary = cartSummary(cart, PRODUCTS);

  return (
    <div className="app">
      <Header
        cartCount={summary.count}
        cartTotalCents={summary.totalCents}
        query={query}
        onQueryChange={setQuery}
      />
      <Home products={filteredProducts} onAddToCart={(product) => dispatch({ type: 'add', productId: product.id })} />
      <section className="cart" aria-labelledby="cart-heading">
        <h2 id="cart-heading">Your cart</h2>
        {summary.count === 0 ? <p>Your cart is empty.</p> : (
          <ul>
            {PRODUCTS.filter((product) => cart[product.id]).map((product) => (
              <li key={product.id}>
                <span>{product.name} × {cart[product.id]} — {formatPrice(product.priceCents * cart[product.id])}</span>
                <button type="button" aria-label={`Remove one ${product.name}`} onClick={() => dispatch({ type: 'remove', productId: product.id })}>Remove one</button>
              </li>
            ))}
          </ul>
        )}
        <p role="status">{summary.count} items · {formatPrice(summary.totalCents)}</p>
      </section>
    </div>
  );
}

export default App;
