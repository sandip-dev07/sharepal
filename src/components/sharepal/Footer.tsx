import DesignAsset from "./DesignAsset";
import Link from "next/link";
import links from "@/constants/data/sharepal-links.json";
const columns = [
  { title: "Sharepal", links: ["About", "Why SharePal", "Sitemap", "CarePal"] },
  {
    title: "Become a Pal",
    links: [
      "Sharepal for Creators",
      "Careers",
      "Sharepal for Brands",
      "Asset Funding Program",
      "Rent Your Gear",
    ],
  },
  {
    title: "Information",
    links: [
      "How it works?",
      "FAQs",
      "Verification",
      "Cancellation Policy",
      "Life at Sharepal",
    ],
  },
  {
    title: "Policies",
    links: [
      "Terms & Condition",
      "Shipping policy",
      "Damage Policy",
      "Terms of Use",
      "Privacy Policy",
    ],
  },
];
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <Link href="/" aria-label="SharePal home">
            <DesignAsset name="footer-imgSvg1" />
            <DesignAsset name="footer-imgSvg2" />
          </Link>
        </div>
        <div className="footer-columns">
          {columns.map((column) => (
            <div key={column.title}>
              <h2>{column.title}</h2>
              <ul>
                {column.links.map((label) => (
                  <li key={label}>
                    <a
                      href={
                        label === "Asset Funding Program"
                          ? "https://assets.sharepal.in/"
                          : label === "Rent Your Gear"
                            ? "https://earnwithus.sharepal.in/"
                            : ((links as Record<string, string>)[label] ??
                              "https://sharepal.in")
                      }
                    >
                      {label}
                      {["Asset Funding Program", "Rent Your Gear"].includes(
                        label,
                      ) && <span className="footer-new">New</span>}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="footer-support">
            <h2>Need Help</h2>
            <ul>
              <li>
                <a href="https://sharepal.in/support">
                  <DesignAsset name="footer-imgSvg3" />
                  Contact Support
                </a>
              </li>
              <li>
                <a href="https://sharepal.in/support">Contact Us</a>
              </li>
              <li>
                <a href="mailto:care@sharepal.in">
                  <DesignAsset name="footer-imgSvg4" />
                  care@sharepal.in
                </a>
              </li>
            </ul>
            <div className="footer-social">
              <a
                href="https://www.facebook.com/Sharepal.in"
                aria-label="SharePal on Facebook"
              >
                <DesignAsset name="footer-imgVector" />
              </a>
              <a
                href="https://www.instagram.com/sharepal.in/"
                aria-label="SharePal on Instagram"
              >
                <DesignAsset name="footer-imgVector1" />
              </a>
              <a
                href="https://www.linkedin.com/company/sharepal/"
                aria-label="SharePal on LinkedIn"
              >
                <DesignAsset name="footer-imgVector2" />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <a href="#top">
            Go up <DesignAsset name="footer-imgSvg5" />
          </a>
          <span>© 2026. SWNAC E-Kiraya Services Pvt Ltd</span>
          <span>Made with ♥ for India</span>
        </div>
      </div>
    </footer>
  );
}
