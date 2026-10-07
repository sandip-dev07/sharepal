"use client";
import { Fragment, useState } from "react";
import ProductCard from "./ProductCard";
import PromoBanners from "./PromoBanners";
import { Button } from "@/components/ui/button";
import { sidebarFilters } from "@/constants/data/categories";
import type { Product } from "@/lib/rental";
import type { CartItem } from "@/hooks/useShop";

export default function ProductGrid({ products, activeFilter, query, days, cart, onAdd, onQuantity, onSelect, onFilterChange }: {
  products: Product[]; activeFilter: string; query: string; days: number;
  cart: CartItem[];
  onAdd: (product: Product) => void; onQuantity: (id: number, change: number) => void; onSelect: (product: Product) => void;
  onFilterChange: (value: string) => void;
}) {
  const [visible, setVisible] = useState(12);
  const filter = sidebarFilters.find(f => f.label === activeFilter);
  const filtered = products.filter(p => (!filter || filter.match(p.name)) && p.name.toLowerCase().includes(query.toLowerCase().trim()));
  const shown = filtered.slice(0, visible);
  const showPromos = activeFilter === "All" && !query;
  return <section id="products" aria-labelledby="catalog-title">
    <div className="catalog-heading"><h2 id="catalog-title">Gaming Gadgets On Rent</h2><p><span className="total-items-label">Total items: </span><span>{filtered.length} items</span></p></div>
    <div className="mobile-filters no-scrollbar" aria-label="Filter products">{sidebarFilters.map(f => <button key={f.label} aria-pressed={f.label === activeFilter} onClick={() => onFilterChange(f.label)}>{f.label}</button>)}</div>
    <div className="product-grid">
      {shown.map((p, i) => <Fragment key={p.id}>
        <ProductCard
          product={p}
          days={days}
          quantity={cart.find((i) => i.product.id === p.id)?.quantity ?? 0}
          onAdd={() => onAdd(p)}
          onQuantity={onQuantity}
          onSelect={() => onSelect(p)}
        />
        {showPromos && i === 3 && <PromoBanners variant="partner" />}
        {showPromos && i === 7 && <PromoBanners variant="gear" />}
      </Fragment>)}
    </div>
    {filtered.length === 0 && <div className="empty-results"><h3>No gadgets found</h3><p>Try another search or browse a different category.</p></div>}
    <div className="catalog-pagination"><p role="status">Showing {shown.length} of {filtered.length} results</p>
      {visible < filtered.length && <Button variant="outline" className="show-more" onClick={() => setVisible(v => v + 12)}>Show More</Button>}
    </div>
  </section>;
}
