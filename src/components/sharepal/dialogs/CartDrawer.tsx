import { useState, type ReactNode } from "react";
import Image from "next/image";
import {
  CalendarDays,
  ChevronDown,
  ChevronUp,
  Minus,
  Plus,
  ShoppingBag,
  TicketPercent,
  Trash2,
  X,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { dateLabel } from "@/components/sharepal/Header";
import type { UseShop } from "@/hooks/useShop";
import { formatINR, productTotal } from "@/lib/rental";
import DesignAsset from "@/components/sharepal/DesignAsset";

function CartIcon({ name, children }: {
  name: "minus" | "plus" | "trash" | "delivery" | "pickup" | "edit" | "coupon" | "down" | "close";
  children: ReactNode;
}) {
  return <>
    <span className={`cart-icon-desktop cart-icon-${name}`} aria-hidden="true"><span><DesignAsset name={`cart-${name}`} /></span></span>
    <span className="cart-icon-mobile" aria-hidden="true">{children}</span>
  </>;
}

const COUPONS: Record<string, { pct: number; cap: number; label: string }> = {
  WELCOME10: { pct: 10, cap: 500, label: "10% off up to ₹500" },
};

function categoryOf(name: string) {
  const n = name.toLowerCase();
  if (
    n.includes("oculus") ||
    n.includes("quest") ||
    n.includes("vr") ||
    n.includes("meta")
  )
    return "Audio Visual Equipment";
  if (n.includes("projector")) return "Projector";
  return "Gaming Console";
}

export default function CartDrawer({ shop }: { shop: UseShop }) {
  const open = shop.panel === "cart";
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState<string | null>(null);
  const [couponError, setCouponError] = useState("");
  const [showCoupons, setShowCoupons] = useState(false);

  const subtotal = shop.cart.reduce(
    (n, i) => n + productTotal(i.product, shop.days) * i.quantity,
    0,
  );
  const coupon = applied ? COUPONS[applied] : null;
  const discount = coupon
    ? Math.min(Math.round((subtotal * coupon.pct) / 100), coupon.cap)
    : 0;
  const total = subtotal - discount;

  function applyCoupon(raw: string) {
    const key = raw.trim().toUpperCase();
    if (!key) return;
    if (COUPONS[key]) {
      setApplied(key);
      setCouponError("");
      setCode(key);
    } else {
      setCouponError("Invalid coupon code");
    }
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(o) => {
        if (!o) shop.setPanel(null);
      }}
    >
      <SheetContent side="right" className="cart-drawer" showCloseButton={false}>
        <div className="cart-drag-handle" aria-hidden="true" />
        <div className="cart-head">
          <button
            className="cart-x"
            aria-label="Close cart"
            onClick={() => shop.setPanel(null)}
          >
            <CartIcon name="close"><X size={18} /></CartIcon>
          </button>
          <SheetTitle className="cart-title">Cart Items</SheetTitle>
          <span className="cart-count-pill">
            {shop.cartCount} item{shop.cartCount === 1 ? "" : "s"} added
          </span>
        </div>
        <SheetDescription className="sr-only">
          Your rental cart with quantities, dates, coupon and total.
        </SheetDescription>

        <div className="cart-body">
          {!shop.cart.length ? (
            <div className="empty-cart">
              <ShoppingBag size={42} />
              <h3>Your cart is empty</h3>
              <p>Add a console to get your next game night started.</p>
              <Button
                className="primary-action max-w-sm!"
                onClick={() => shop.setPanel(null)}
              >
                Explore gaming gear
              </Button>
            </div>
          ) : (
            shop.cart.map(({ product, quantity: count }) => (
              <div className="cart-row2" key={product.id}>
                <Image
                  src={product.image}
                  alt=""
                  width={79}
                  height={79}
                  className="cart-thumb2"
                />
                <div className="cart-row2-main">
                  <div className="cart-row2-top">
                    <div className="cart-row2-name">
                      <h3>{product.name}</h3>
                      <span>{categoryOf(product.name)}</span>
                    </div>
                    <div className="cart-row2-price">
                      <strong>
                        {formatINR(productTotal(product, shop.days) * count)}
                      </strong>
                      <span>Rent for {shop.days} days</span>
                    </div>
                  </div>
                  <div className="cart-row2-actions">
                    <div
                      className="mini-stepper"
                      role="group"
                      aria-label={`${product.name} quantity`}
                    >
                      <button
                        aria-label={`Decrease ${product.name} quantity`}
                        onClick={() => shop.changeQuantity(product.id, -1)}
                      >
                        <CartIcon name="minus"><Minus size={14} /></CartIcon>
                      </button>
                      <span>{count}</span>
                      <button
                        aria-label={`Increase ${product.name} quantity`}
                        onClick={() => shop.changeQuantity(product.id, 1)}
                      >
                        <CartIcon name="plus"><Plus size={14} /></CartIcon>
                      </button>
                    </div>
                    <button
                      className="cart-trash"
                      aria-label={`Remove ${product.name}`}
                      onClick={() => shop.removeItem(product.id)}
                    >
                      <CartIcon name="trash"><Trash2 size={18} /></CartIcon>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {!!shop.cart.length && (
          <div className="cart-foot">
            <div className="cart-dates">
              <span className="cart-date-mobile">
                <CalendarDays size={18} aria-hidden="true" />
                <span>
                  Rent for:{" "}
                  {shop.delivery && shop.pickup ? (
                    <strong>{dateLabel(shop.delivery)} <span aria-hidden="true">•</span> {dateLabel(shop.pickup)}</strong>
                  ) : (
                    <strong>Select rental dates</strong>
                  )}
                </span>
              </span>
              <span className="cart-date">
                <CartIcon name="delivery"><CalendarDays size={18} /></CartIcon>
                <span>
                  Delivery Date:{" "}
                  <strong>
                    {shop.delivery ? dateLabel(shop.delivery) : "Select"}
                  </strong>
                </span>
              </span>
              <span className="cart-divider" aria-hidden="true" />
              <span className="cart-date">
                <CartIcon name="pickup"><CalendarDays size={18} /></CartIcon>
                <span>
                  Pickup Date:{" "}
                  <strong>
                    {shop.pickup ? dateLabel(shop.pickup) : "Select"}
                  </strong>
                </span>
              </span>
              <Button
                className="cart-dates-edit"
                onClick={shop.openDates}
              >
                <CartIcon name="edit"><CalendarDays size={14} /></CartIcon>
                Edit
              </Button>
            </div>

            <div className="cart-coupon">
              <div className="cart-coupon-row">
                <span className="cart-coupon-field">
                  <CartIcon name="coupon"><TicketPercent size={20} /></CartIcon>
                  <Input
                    placeholder="Enter coupon code"
                    value={code}
                    onChange={(e) => {
                      setCode(e.target.value);
                      setCouponError("");
                    }}
                    aria-label="Coupon code"
                  />
                </span>
                <Button
                  className="cart-coupon-apply"
                  disabled={code.trim().length < 4}
                  onClick={() => applyCoupon(code)}
                >
                  Apply
                </Button>
              </div>
              {couponError && (
                <p className="cart-coupon-error" role="alert">
                  {couponError}
                </p>
              )}
              <button
                className="cart-coupons-link"
                onClick={() => setShowCoupons((v) => !v)}
                aria-expanded={showCoupons}
              >
                View Coupons
                <span className={showCoupons ? "cart-coupon-chevron is-open" : "cart-coupon-chevron"}>
                  <CartIcon name="down"><ChevronDown size={14} /></CartIcon>
                </span>
              </button>
              {showCoupons && (
                <div className="cart-coupon-list">
                  {Object.entries(COUPONS).map(([key, c]) => (
                    <button
                      key={key}
                      className="cart-coupon-item"
                      onClick={() => applyCoupon(key)}
                    >
                      <strong>{key}</strong>
                      <span>{c.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="cart-total2">
              <div>
                <p className="cart-total2-label">
                  Total Charges <ChevronUp size={14} />
                </p>
                <span className="cart-total2-sub">
                  Price incl. of all taxes
                </span>
                {discount > 0 && (
                  <span className="cart-total2-disc">
                    Coupon {applied} −{formatINR(discount)}
                  </span>
                )}
              </div>
              <strong className="cart-total2-price">{formatINR(total)}</strong>
              <Button
                className="cart-checkout"
                onClick={() => shop.notify("Please login to continue checkout")}
              >
                Login to CheckOut
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
