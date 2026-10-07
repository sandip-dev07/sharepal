import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DatesPanel({
  draftDelivery,
  draftPickup,
  dateError,
  onDeliveryChange,
  onPickupChange,
  onSubmit,
}: {
  draftDelivery: string;
  draftPickup: string;
  dateError: string;
  onDeliveryChange: (value: string) => void;
  onPickupChange: (value: string) => void;
  onSubmit: () => void;
}) {
  return (
    <form
      className="dialog-form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <label>
        Delivery date
        <Input
          type="date"
          required
          value={draftDelivery}
          onChange={(e) => onDeliveryChange(e.target.value)}
        />
      </label>
      <label>
        Pickup date
        <Input
          type="date"
          required
          min={draftDelivery}
          value={draftPickup}
          onChange={(e) => onPickupChange(e.target.value)}
        />
      </label>
      {dateError && (
        <p className="text-sm text-red-600" role="alert">
          {dateError}
        </p>
      )}
      <Button className="primary-action" type="submit">
        Apply dates
      </Button>
    </form>
  );
}
