import Image from "next/image";

export default function PromoBanners({ variant }: { variant: "partner" | "gear" }) {
  const partner = variant === "partner";
  return <a className={`promo-banner promo-${variant}`} href={partner ? "https://assets.sharepal.in/" : "https://earnwithus.sharepal.in/"} target="_blank" rel="noreferrer">
    <Image src={`/figma/${partner ? "imgLinkBanner" : "imgLinkBanner1"}.png`} alt={partner ? "Become an Asset Partner. Earn Monthly. Know More" : "Got gear you don't use anymore? Rent Out Your Gear on SharePal. Earn With Us"} fill sizes="(max-width: 1023px) 100vw, 1064px" />
  </a>;
}
