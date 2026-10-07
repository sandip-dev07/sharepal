"use client";
import { Home, LayoutGrid, Search, ShoppingCart } from "lucide-react";

export default function MobileNav({
  onSearch,
  onCart,
  onCategories,
  cartCount,
}: {
  onSearch: () => void;
  onCart: () => void;
  onCategories: () => void;
  cartCount: number;
}) {
  return (
    <nav className="mobile-nav" aria-label="Mobile navigation">
      <a href="#top">
        <Home />
        <span>Home</span>
      </a>
      <button onClick={onCategories}>
        <LayoutGrid />
        <span>Categories</span>
      </button>
      <button onClick={onSearch}>
        <Search />
        <span>Search</span>
      </button>
      <button onClick={onCart}>
        <ShoppingCart />
        <span>Cart{cartCount > 0 ? ` (${cartCount})` : ""}</span>
      </button>
    </nav>
  );
}
