import Image from "next/image";
import { TrendingUp, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { dateLabel } from "@/components/sharepal/Header";
import type { UseShop } from "@/hooks/useShop";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { products } from "@/constants/data/products";
import { formatINR, productTotal } from "@/lib/rental";

/** Mobile-only bottom sheet version of the availability dialog. */
export default function AvailabilitySheet({ shop }: { shop: UseShop }) {
  const isMobile = useMediaQuery("(max-width: 639px)");
  const { panel, selected } = shop;
  const open =
    isMobile && panel === "product" && !!selected?.out_of_stock;

  const similar = selected
    ? products.filter((p) => !p.out_of_stock && p.id !== selected.id).slice(0, 4)
    : [];

  return (
    <Sheet
      open={open}
      onOpenChange={(o) => {
        if (!o) shop.setPanel(null);
      }}
    >
      <SheetContent side="bottom" className="avail-sheet" aria-label="Availability">
        <span className="avail-grab" aria-hidden="true" />
        <button
          className="avail-close"
          aria-label="Close"
          onClick={() => shop.setPanel(null)}
        >
          <X size={20} />
        </button>
        {selected && (
          <>
            <SheetTitle className="avail-sheet-title">
              Next Available from{" "}
              {shop.pickup ? dateLabel(shop.pickup) : "soon"}
            </SheetTitle>
            <SheetDescription className="sr-only">
              This item is unavailable for your dates. Similar products below.
            </SheetDescription>

            <div className="avail-summary">
              <Image
                src={selected.image}
                alt=""
                width={64}
                height={64}
                className="avail-summary-thumb"
              />
              <div>
                <h3>{selected.name}</h3>
                <p className="avail-booked">
                  <TrendingUp size={14} />
                  {selected.booked_count > 0
                    ? `${selected.booked_count} booked this month`
                    : "In high demand this month"}
                </p>
              </div>
            </div>

            <h4 className="avail-sheet-sub">Similar Products:</h4>
            <div className="avail-list">
              {similar.map((p) => (
                <div className="avail-row" key={p.id}>
                  <Image
                    src={p.image}
                    alt=""
                    width={48}
                    height={48}
                    className="avail-thumb"
                  />
                  <div className="avail-meta">
                    <strong>{p.name}</strong>
                    <span>
                      {p.name.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim()}{" "}
                      on rent
                    </span>
                  </div>
                  <span className="avail-price">
                    {formatINR(productTotal(p, shop.days))}
                  </span>
                  <span className="avail-na" aria-label={`${p.name} not available`}>
                    Not Available
                  </span>
                </div>
              ))}
            </div>

            <Button
              className="avail-cta"
              onClick={() => shop.setPanel("dates")}
            >
              Change Dates
            </Button>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
