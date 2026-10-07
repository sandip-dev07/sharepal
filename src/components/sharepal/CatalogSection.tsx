import SidebarFilters from "./SidebarFilters";
import HeroBanner from "./HeroBanner";
import ProductGrid from "./ProductGrid";
import { sidebarFilters } from "@/constants/data/categories";
import { products } from "@/constants/data/products";
import type { Product } from "@/lib/rental";
import type { CartItem } from "@/hooks/useShop";

export default function CatalogSection({
  activeFilter,
  query,
  days,
  cart,
  onFilterChange,
  onQueryClear,
  onAdd,
  onQuantity,
  onSelect,
}: {
  activeFilter: string;
  query: string;
  days: number;
  cart: CartItem[];
  onFilterChange: (value: string) => void;
  onQueryClear: () => void;
  onAdd: (product: Product) => void;
  onQuantity: (id: number, change: number) => void;
  onSelect: (product: Product) => void;
}) {
  return (
    <div className="catalog-layout">
      <div className="catalog-hero"><HeroBanner /></div>
      <SidebarFilters
        filters={sidebarFilters.map((f) => f.label)}
        active={activeFilter}
        onChange={onFilterChange}
      />
      <div className="catalog-main">
        {query && (
          <div className="search-summary">
            Search results for “{query}”{" "}
            <button onClick={onQueryClear}>Clear search</button>
          </div>
        )}
        <ProductGrid
          key={activeFilter + query}
          products={products}
          activeFilter={activeFilter}
          query={query}
          days={days}
          cart={cart}
          onFilterChange={onFilterChange}
          onAdd={onAdd}
          onQuantity={onQuantity}
          onSelect={onSelect}
        />
      </div>
    </div>
  );
}
