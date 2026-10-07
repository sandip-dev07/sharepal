import { footerGroups } from "@/constants/data/footer-links";
import links from "@/constants/data/sharepal-links.json";
import DesignAsset from "./DesignAsset";

export default function SeoLinks() {
  return <section className="seo-section" aria-label="Explore SharePal">
    <div className="footer-container">
      <div className="seo-groups">{footerGroups.map(group => <div key={group.title}>
        <h2>{group.title}</h2><ul>{group.links.map(label => <li key={label}><a href={(links as Record<string,string>)[label] ?? "https://sharepal.in/bangalore"}>{label}</a></li>)}</ul>
      </div>)}</div>
      <div className="seo-description">
        <h3><a className="underline" href="https://sharepal.in/bangalore/rent">Renting from SharePal in Bangalore</a></h3>
        <p>Discover the convenience of renting from SharePal, your trusted partner in Bangalore for all your rental needs. Whether you’re exploring the vibrant streets of Koramangala, setting up a shoot in Indiranagar, or planning a trek from the outskirts of Whitefield, SharePal has you covered. We offer a wide range of products, including cameras, action cameras, gaming consoles, projectors, speakers, trekking gear, riding gear, and creator gear. With free home delivery and pickup services, flexible rental tenures, and an easy-to-use platform, renting has never been easier. Experience the freedom to rent what you need, when you need it, without the commitment of buying.</p>
        <h3>Categories on Rent</h3>
        <h3><a className="underline" href="https://sharepal.in/bangalore/action-cameras-on-rent">Action Cameras on Rent</a></h3>
        <p>Capture your adventures in stunning detail with our range of action cameras. Choose from top brands like GoPro, Insta360, and DJI, perfect for everything from extreme sports to casual vlogging. Whether you need high-quality video for your next trek or a 360-degree camera to capture every angle, we’ve got you covered.</p>
        <details><summary>Read More <DesignAsset name="footer-imgSvg" /></summary>
          <h3 className="mt-5">Cameras on Rent</h3><p>From DSLRs to mirrorless cameras, SharePal offers a wide selection of high-quality cameras for rent. Whether you’re a professional photographer or an enthusiast, our range of cameras will suit your every need. Capture life’s precious moments without the hefty price tag of ownership.</p>
          <h3 className="mt-5">Gaming Consoles on Rent</h3><p>Level up your gaming experience with a PlayStation, Xbox, or VR headset. Choose your rental dates and enjoy gaming at home with doorstep delivery and pickup.</p>
          <h3 className="mt-5">Explore more gear</h3><p>Discover trekking equipment, riding gear, winter wear, projectors, speakers, and creator gear for your next adventure.</p>
        </details>
      </div>
    </div>
  </section>;
}
