"use client";
import { reviews } from "@/constants/data/reviews";
import DesignAsset from "./DesignAsset";
import styles from "./Reviews.module.css";

function ReviewCard({ r }: { r: (typeof reviews)[number] }) {
  return (
    <article className={`review-card ${styles.card}`}>
      <div className="review-stars" aria-label="5 out of 5 stars on Google">
        <span className="google-mark" aria-label="Google">
          {[4, 5, 6, 7].map((n) => (
            <DesignAsset
              key={n}
              name={`imgVector${n}` as "imgVector4"}
              className={`google-part-${n}`}
            />
          ))}
        </span>
        {[0, 1, 2, 3, 4].map((n) => (
          <span className="star-slot" key={n}>
            <DesignAsset name="imgVector8" />
          </span>
        ))}
      </div>
      <p className="review-text">“ {r.text} ”</p>
      <div className="review-person">
        <span className="review-avatar">{r.initials}</span>
        <div>
          <p>{r.name}</p>
          <span>{r.meta}</span>
        </div>
      </div>
    </article>
  );
}

export default function Reviews() {
  return (
    <section className="reviews-section" aria-labelledby="reviews-title">
      <h2 id="reviews-title">
        Served more than <span>1 Lakh Orders</span>
      </h2>
      <div
        className={`reviews-rail no-scrollbar ${styles.rail}`}
        tabIndex={0}
        role="region"
        aria-label="Customer reviews; auto-scrolling, hover or focus to pause"
      >
        <div className={`reviews-track ${styles.track}`}>
          {[0, 1].map((copy) => (
            <div
              className={`reviews-group ${styles.group}`}
              key={copy}
              aria-hidden={copy === 1 ? true : undefined}
            >
              {reviews.map((r) => (
                <ReviewCard key={`${copy}-${r.name}`} r={r} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
