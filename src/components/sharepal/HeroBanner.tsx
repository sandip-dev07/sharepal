import Image from "next/image";
import DesignAsset from "./DesignAsset";

export default function HeroBanner() {
  return (
    <section className="hero-gaming" aria-labelledby="hero-title">
      <Image className="hero-art hero-art-left" src="/figma/imgSpImage.png" alt="" width={250} height={250} preload />
      <Image className="hero-art hero-art-right" src="/figma/imgSpImage1.png" alt="" width={250} height={250} preload />
      <div className="hero-copy">
        <h1 id="hero-title">Gaming Consoles</h1>
        <div className="hero-description">
          <span>Rent the latest gaming gadgets from </span>
          <span className="hero-logo" aria-label="SharePal">
            <span className="hero-logo-desktop"><DesignAsset name="imgSvg" /><DesignAsset name="imgSvg1" /></span>
            <span className="hero-logo-mobile"><Image src="/figma/mobile-share.svg" alt="" width={35.15} height={27} unoptimized /><Image src="/figma/mobile-pal.svg" alt="" width={20.85} height={27} unoptimized /></span>
          </span>
          <span className="hero-products"> PS5, Xbox,<br className="hero-desktop-break" /> Oculus VR, Racing Wheel on rent.</span>
        </div>
        <div className="hero-brands" aria-label="Xbox, PlayStation 5, Meta">
          <span className="brand-crop"><Image src="/figma/imgVector1.png" alt="Xbox" width={95.048} height={95.048} className="brand-xbox" /></span><i />
          <span className="brand-crop"><Image src="/figma/imgVector2.png" alt="PS5" width={101.905} height={101.905} className="brand-ps5" /></span><i />
          <span className="brand-crop"><Image src="/figma/imgVector3.png" alt="Meta" width={85.905} height={85.905} className="brand-meta" /></span>
        </div>
      </div>
    </section>
  );
}
