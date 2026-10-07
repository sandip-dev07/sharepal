"use client";
import Header from "@/components/sharepal/Header";
import CategoryNav from "@/components/sharepal/CategoryNav";
import CatalogSection from "@/components/sharepal/CatalogSection";
import Faq from "@/components/sharepal/Faq";
import Breadcrumbs from "@/components/sharepal/Breadcrumbs";
import Reviews from "@/components/sharepal/Reviews";
import Stats from "@/components/sharepal/Stats";
import SeoLinks from "@/components/sharepal/SeoLinks";
import Footer from "@/components/sharepal/Footer";
import MobileNav from "@/components/sharepal/MobileNav";
import CartNotice from "@/components/sharepal/CartNotice";
import AvailabilitySheet from "@/components/sharepal/dialogs/AvailabilitySheet";
import CartDrawer from "@/components/sharepal/dialogs/CartDrawer";
import ShopDialog from "@/components/sharepal/dialogs/ShopDialog";
import { useShop } from "@/hooks/useShop";

export default function Home() {
  const shop = useShop();

  return (
    <div id="top" className="sharepal-page">
      <a className="skip-link" href="#products">
        Skip to products
      </a>

      <Header
        cartCount={shop.cartCount}
        delivery={shop.delivery}
        pickup={shop.pickup}
        onDates={shop.openDates}
        onSearch={() => shop.setPanel("search")}
        onCart={() => shop.setPanel("cart")}
        onCity={() => shop.setPanel("city")}
      />
      <CategoryNav />

      <main>
        <CatalogSection
          activeFilter={shop.activeFilter}
          query={shop.query}
          days={shop.days}
          cart={shop.cart}
          onFilterChange={shop.setActiveFilter}
          onQueryClear={() => shop.setQuery("")}
          onAdd={shop.add}
          onQuantity={shop.changeQuantity}
          onSelect={shop.select}
        />

        <div className="content-container">
          <Faq />
          <Breadcrumbs />
        </div>

        <div className="social-proof">
          <Reviews />
          <Stats />
        </div>
      </main>

      <SeoLinks />
      <Footer />

      <MobileNav
        cartCount={shop.cartCount}
        onSearch={() => shop.setPanel("search")}
        onCart={() => shop.setPanel("cart")}
        onCategories={() =>
          document
            .getElementById("products")
            ?.scrollIntoView({ behavior: "smooth" })
        }
      />

      <CartNotice
        notice={shop.notice}
        onViewCart={() => {
          shop.setPanel("cart");
          shop.dismissNotice();
        }}
      />

      <ShopDialog shop={shop} />
      <AvailabilitySheet shop={shop} />
      <CartDrawer shop={shop} />
    </div>
  );
}
