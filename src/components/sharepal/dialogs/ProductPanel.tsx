import Image from "next/image";
import { Plus, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatINR, productTotal, type Product } from "@/lib/rental";

export default function ProductPanel({
  product,
  days,
  similar,
  onAdd,
  onAddAndClose,
  onChangeDates,
}: {
  product: Product;
  days: number;
  similar: Product[];
  onAdd: (product: Product) => void;
  onAddAndClose: (product: Product) => void;
  onChangeDates: () => void;
}) {
  if (product.out_of_stock) {
    return (
      <div className="avail-grid">
        <div className="avail-main">
          <div className="avail-photo">
            <Image
              src={product.image}
              alt={product.name}
              width={280}
              height={220}
              className="avail-photo-img"
            />
          </div>
          <h3>{product.name}</h3>
          <p className="avail-booked">
            <TrendingUp size={14} />
            {product.booked_count > 0
              ? `${product.booked_count} booked this month`
              : "In high demand this month"}
          </p>
          <Button
            className="avail-change"
            variant="outline"
            onClick={onChangeDates}
          >
            Change Dates
          </Button>
        </div>
        <div className="avail-side">
          <h4>Similar Products:</h4>
          <div className="avail-list">
            {similar.map((p) => (
              <div className="avail-row" key={p.id}>
                <Image
                  src={p.image}
                  alt=""
                  width={56}
                  height={56}
                  className="avail-thumb"
                />
                <div className="avail-meta">
                  <strong>{p.name}</strong>
                  <span>
                    {p.name.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim()} on
                    rent
                  </span>
                </div>
                <span className="avail-price">
                  {formatINR(productTotal(p, days))}
                </span>
                <Button
                  className="avail-add"
                  variant="outline"
                  onClick={() => onAdd(p)}
                  aria-label={`Add ${p.name} to cart`}
                >
                  <Plus size={16} />
                  Add
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail">
      <Image
        src={product.image}
        alt={product.name}
        width={260}
        height={260}
        className="mx-auto h-60 w-60 object-contain"
      />
      <p>
        {formatINR(productTotal(product, days))} for {days} days, including GST
      </p>
      <Button className="primary-action" onClick={() => onAddAndClose(product)}>
        Add to cart
      </Button>
    </div>
  );
}
