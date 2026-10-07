"use client";
import { useEffect, useRef } from "react";
import DesignAsset from "./DesignAsset";
import Link from "next/link";

export function dateLabel(value: string) {
  const date = new Date(value);
  const day = date.getUTCDate();
  const suffix =
    day >= 11 && day <= 13
      ? "th"
      : (({ 1: "st", 2: "nd", 3: "rd" } as Record<number, string>)[day % 10] ??
        "th");
  const month = new Intl.DateTimeFormat("en-GB", {
    month: "short",
    timeZone: "UTC",
  }).format(date);
  return `${day}${suffix} ${month}`;
}
export default function Header({
  cartCount,
  delivery,
  pickup,
  onDates,
  onSearch,
  onCart,
  onCity,
}: {
  cartCount: number;
  delivery: string;
  pickup: string;
  onDates: () => void;
  onSearch: () => void;
  onCart: () => void;
  onCity: () => void;
}) {
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const header = headerRef.current;
        // Hide on scroll down past header height, show on scroll up or near top
        const shouldHide = y > 120 && y > lastY + 4;
        const shouldShow = y < lastY - 4 || y <= 120;
        if (header) {
          if (shouldHide) {
            header.classList.add("site-header-hidden");
            document.body.classList.add("header-hidden");
          } else if (shouldShow) {
            header.classList.remove("site-header-hidden");
            document.body.classList.remove("header-hidden");
          }
        }
        lastY = y;
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.body.classList.remove("header-hidden");
    };
  }, []);

  return (
    <header className="site-header" ref={headerRef}>
      <div className="header-inner">
        <Link href="/" className="header-logo" aria-label="SharePal home">
          <DesignAsset name="header-imgSvg" />
          <DesignAsset name="header-imgSvg1" />
        </Link>
        <div className="rental-toolbar">
          <button className="city-button" onClick={onCity}>
            <DesignAsset name="header-imgSvgNoDescriptionAvailable" />
            Bangalore
            <DesignAsset name="header-imgSvgNoDescriptionAvailable1" />
          </button>
          <button className="date-summary" onClick={onDates}>
            <span>
              <DesignAsset name="header-imgSvgNoDescriptionAvailable2" />
              <span>
                {delivery ? (
                  <>
                    Delivery Date: <strong>{dateLabel(delivery)}</strong>
                  </>
                ) : (
                  "Delivery Date"
                )}
              </span>
            </span>
            <span>
              <DesignAsset name="header-imgSvgNoDescriptionAvailable3" />
              <span>
                {pickup ? (
                  <>
                    Pickup Date: <strong>{dateLabel(pickup)}</strong>
                  </>
                ) : (
                  "Pickup Date"
                )}
              </span>
            </span>
          </button>
          <button className="edit-dates" onClick={onDates}>
            <DesignAsset name="header-imgSvgNoDescriptionAvailable4" className="size-[14px]" />
            {delivery && pickup ? "Edit" : "Select"}
          </button>
        </div>
        <div className="header-actions">
          <button
            className="header-icon"
            onClick={onSearch}
            aria-label="Search products"
          >
            <DesignAsset name="header-imgVectorWhite" />
          </button>
          <button
            className="header-icon"
            onClick={onCart}
            aria-label={`Open cart, ${cartCount} items`}
          >
            <DesignAsset name="header-imgVector1White" />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </button>
          <a
            href="https://sharepal.in/"
            className="login-link"
            aria-label="Log in on SharePal"
          >
            <span>
              <DesignAsset name="header-imgSvgNoDescriptionAvailable5Dark" />
            </span>
            <strong>Hi, Login</strong>
          </a>
        </div>
      </div>
      <button className="mobile-date-summary" onClick={onDates}>
        <DesignAsset name="header-imgSvgNoDescriptionAvailable2" />
        <span className="mobile-rent-label">
          Rent For:{" "}
          <strong>{delivery ? dateLabel(delivery) : "Delivery date"}</strong>
          <span aria-hidden="true"> • </span>
          <strong>{pickup ? dateLabel(pickup) : "Pickup date"}</strong>
        </span>
        <span className="mobile-edit-pill">
          {delivery && pickup ? "Edit" : "Select"}
        </span>
      </button>
    </header>
  );
}
