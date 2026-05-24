import React, { useMemo, useState } from "react";
import "./App.css";
import Header from "./Header";
import Home from "./Home";

const PRODUCTS = [
  {
    id: "keyboard",
    name: "Mechanical Keyboard",
    category: "Workstation",
    price: 89.99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "headphones",
    name: "Noise Cancelling Headphones",
    category: "Audio",
    price: 129.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "desk-lamp",
    name: "LED Desk Lamp",
    category: "Home Office",
    price: 44.5,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "backpack",
    name: "Commuter Backpack",
    category: "Travel",
    price: 64,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80",
  },
];

function App() {
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState([]);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) {
      return PRODUCTS;
    }

    return PRODUCTS.filter((product) =>
      `${product.name} ${product.category}`.toLowerCase().includes(normalizedQuery)
    );
  }, [query]);

  const cartTotal = cart.reduce((total, product) => total + product.price, 0);

  return (
    <div className="app">
      <Header
        cartCount={cart.length}
        cartTotal={cartTotal}
        query={query}
        onQueryChange={setQuery}
      />
      <Home products={filteredProducts} onAddToCart={(product) => setCart([...cart, product])} />
    </div>
  );
}

export default App;
