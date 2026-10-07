"use client";
import { useState } from "react";
import Image from "next/image";
import { Heart, Minus, Plus } from "lucide-react";
import { formatINR, productTotal, type Product } from "@/lib/rental";
import DesignAsset from "./DesignAsset";

export default function ProductCard({
  product,
  days,
  quantity,
  onAdd,
  onQuantity,
  onSelect,
}: {
  product: Product;
  days: number;
  quantity: number;
  onAdd: () => void;
  onQuantity: (id: number, change: number) => void;
  onSelect: () => void;
}) {
  const [fav, setFav] = useState(false);

  return (
    <article className="product-card">
      <div className="product-image">
        <button
          className="product-view"
          onClick={onSelect}
          aria-label={`View ${product.name}`}
        >
          {product.tag && (
            <span
              className={`product-tag ${product.tag === "New" ? "tag-new" : ""}`}
            >
              {product.tag}
            </span>
          )}
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 639px) calc((100vw - 152px) / 2), (max-width: 1023px) 30vw, 230px"
            className="object-contain p-8"
          />
          {product.out_of_stock && (
            <span className="unavailable-overlay">
              Unavailable for these dates
            </span>
          )}
        </button>
        <button
          type="button"
          className="fav-button"
          aria-pressed={fav}
          aria-label={
            fav
              ? `Remove ${product.name} from favorites`
              : `Add ${product.name} to favorites`
          }
          onClick={() => setFav((v) => !v)}
        >
          <Heart size={20} fill={fav ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="product-information">
        <h3>
          <button onClick={onSelect}>{product.name}</button>
        </h3>
        <div className="product-price">
          {product.out_of_stock ? (
            <>
              <p className="unavailable-label">
                <DesignAsset name="imgSvg2" />
                Unavailable
              </p>
              <button className="availability-button" onClick={onSelect}>
                Check Availability
              </button>
            </>
          ) : (
            <>
              <p className="rental-caption">
                Rent for <strong>{days}</strong> days
              </p>
              <div className="price-row">
                <div>
                  <p className="rental-price">
                    {formatINR(productTotal(product, days))}
                  </p>
                  <span className="gst-badge">Incl. of GST</span>
                </div>
                {quantity > 0 ? (
                  <div
                    className="qty-stepper"
                    role="group"
                    aria-label={`${product.name} quantity`}
                  >
                    <button
                      onClick={() => onQuantity(product.id, -1)}
                      aria-label={`Remove one ${product.name} from cart`}
                    >
                      <Minus size={16} />
                    </button>
                    <span aria-live="polite">{quantity}</span>
                    <button
                      onClick={() => onQuantity(product.id, 1)}
                      aria-label={`Add one more ${product.name} to cart`}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={onAdd}
                    className="add-product"
                    aria-label={`Add ${product.name} to cart`}
                  >
                    <DesignAsset name="imgSvgNoDescriptionAvailable" />
                    <span className="add-product-label">Add to Cart</span>
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
