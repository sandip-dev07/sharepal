import { useEffect, useState } from "react";
import { daysBetween, RENTAL_DAYS, type Product } from "@/lib/rental";

export type Panel = "dates" | "search" | "cart" | "city" | "product" | null;
export type CartItem = { product: Product; quantity: number };

export function useShop() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [panel, setPanel] = useState<Panel>(null);
  const [selected, setSelected] = useState<Product | null>(null);
  // No dates pre-selected — toolbar shows "Delivery Date / Pickup Date" + Select.
  const [delivery, setDelivery] = useState("");
  const [pickup, setPickup] = useState("");
  const [draftDelivery, setDraftDelivery] = useState(delivery);
  const [draftPickup, setDraftPickup] = useState(pickup);
  const [notice, setNotice] = useState("");
  const [dateError, setDateError] = useState("");

  const days =
    delivery && pickup ? daysBetween(delivery, pickup) : RENTAL_DAYS;
  const cartCount = cart.reduce((n, item) => n + item.quantity, 0);

  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(""), 3500);
    return () => clearTimeout(timer);
  }, [notice]);

  function add(product: Product) {
    setCart((items) =>
      items.some((i) => i.product.id === product.id)
        ? items.map((i) =>
            i.product.id === product.id
              ? { ...i, quantity: i.quantity + 1 }
              : i,
          )
        : [...items, { product, quantity: 1 }],
    );
    setNotice(`${product.name} added to your cart`);
  }

  function changeQuantity(id: number, change: number) {
    setCart((items) =>
      items
        .map((i) =>
          i.product.id === id ? { ...i, quantity: i.quantity + change } : i,
        )
        .filter((i) => i.quantity > 0),
    );
  }

  function removeItem(id: number) {
    setCart((items) => items.filter((i) => i.product.id !== id));
  }

  function openDates() {
    setDraftDelivery(delivery);
    setDraftPickup(pickup);
    setDateError("");
    setPanel("dates");
  }

  /** Validates + applies draft dates. Returns true when applied. */
  function applyDates() {
    if (
      !draftDelivery ||
      !draftPickup ||
      Date.parse(draftPickup) - Date.parse(draftDelivery) < 172800000
    ) {
      setDateError("Choose a pickup date at least two days after delivery.");
      return false;
    }
    setDelivery(draftDelivery);
    setPickup(draftPickup);
    setPanel(null);
    setNotice("Rental dates updated. Prices have been recalculated.");
    return true;
  }

  function submitSearch() {
    setPanel(null);
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  }

  function select(product: Product) {
    setSelected(product);
    setPanel("product");
  }

  function dismissNotice() {
    setNotice("");
  }

  function notify(message: string) {
    setNotice(message);
  }

  return {
    // state
    activeFilter,
    query,
    cart,
    panel,
    selected,
    delivery,
    pickup,
    draftDelivery,
    draftPickup,
    notice,
    dateError,
    days,
    cartCount,
    // setters for controlled inputs
    setActiveFilter,
    setQuery,
    setPanel,
    setDraftDelivery,
    setDraftPickup,
    // actions
    add,
    changeQuantity,
    removeItem,
    openDates,
    applyDates,
    submitSearch,
    select,
    dismissNotice,
    notify,
  };
}

export type UseShop = ReturnType<typeof useShop>;
