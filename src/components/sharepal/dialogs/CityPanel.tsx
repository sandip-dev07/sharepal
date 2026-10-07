import { Button } from "@/components/ui/button";

export default function CityPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="dialog-form">
      <p className="text-sm text-sp-gray">
        Doorstep delivery and pickup across Bangalore. Browse other cities on
        SharePal.
      </p>
      <Button className="primary-action" onClick={onClose}>
        Continue with Bangalore
      </Button>
      <a
        className="text-center text-sm text-sp-blue underline"
        href="https://sharepal.in"
      >
        Explore other cities
      </a>
    </div>
  );
}
