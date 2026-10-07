import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { dateLabel } from "@/components/sharepal/Header";
import type { UseShop } from "@/hooks/useShop";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { products } from "@/constants/data/products";
import DatesPanel from "./DatesPanel";
import SearchPanel from "./SearchPanel";
import CityPanel from "./CityPanel";
import ProductPanel from "./ProductPanel";

function titleFor(shop: UseShop) {
  switch (shop.panel) {
    case "dates":
      return "Select rental dates";
    case "search":
      return "Find your gaming gear";
    case "city":
      return "Rent in Bangalore";
    case "product":
      return shop.selected?.out_of_stock
        ? shop.pickup
          ? `Next Available from ${dateLabel(shop.pickup)}`
          : "Next Available"
        : (shop.selected?.name ?? "");
    default:
      return "";
  }
}

function descriptionFor(shop: UseShop) {
  switch (shop.panel) {
    case "dates":
      return "Choose your delivery and pickup dates. Delivery and pickup days are excluded from the rental duration.";
    case "search":
      return "Search consoles, games, and accessories.";
    case "city":
      return "This catalog features gaming gadgets available in Bangalore.";
    case "product":
      return shop.selected?.out_of_stock
        ? "This item is unavailable for your dates. Try similar products below."
        : "Gaming gear delivered to your doorstep.";
    default:
      return "";
  }
}

export default function ShopDialog({ shop }: { shop: UseShop }) {
  const { panel, selected } = shop;
  // Mobile renders the availability bottom sheet instead of this dialog.
  const isMobile = useMediaQuery("(max-width: 639px)");
  const wide = panel === "product" && selected?.out_of_stock && !isMobile;
  const isMobileSheet =
    isMobile && panel === "product" && !!selected?.out_of_stock;
  const similar = selected
    ? products.filter((p) => !p.out_of_stock && p.id !== selected.id).slice(0, 4)
    : [];

  return (
    <Dialog
      open={panel !== null && panel !== "cart" && !isMobileSheet}
      onOpenChange={(open) => {
        if (!open) shop.setPanel(null);
      }}
    >
      <DialogContent
        className={wide ? "sharepal-dialog sharepal-dialog-wide availability-dialog" : "sharepal-dialog"}
      >
        <div className={wide ? "availability-dialog-head" : "shop-dialog-heading"}>
          <DialogTitle>{titleFor(shop)}</DialogTitle>
          <DialogDescription>{descriptionFor(shop)}</DialogDescription>
        </div>

        {panel === "dates" && (
          <DatesPanel
            draftDelivery={shop.draftDelivery}
            draftPickup={shop.draftPickup}
            dateError={shop.dateError}
            onDeliveryChange={shop.setDraftDelivery}
            onPickupChange={shop.setDraftPickup}
            onSubmit={shop.applyDates}
          />
        )}

        {panel === "search" && (
          <SearchPanel
            query={shop.query}
            onQueryChange={shop.setQuery}
            onSubmit={shop.submitSearch}
          />
        )}

        {panel === "city" && <CityPanel onClose={() => shop.setPanel(null)} />}

        {panel === "product" && selected && (
          <div className={wide ? "availability-dialog-body" : undefined}>
            <ProductPanel
              product={selected}
              days={shop.days}
              similar={similar}
              onAdd={shop.add}
              onAddAndClose={(p) => {
                shop.add(p);
                shop.setPanel(null);
              }}
              onChangeDates={shop.openDates}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
