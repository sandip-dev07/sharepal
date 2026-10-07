import { ShoppingBag } from "lucide-react";

export default function CartNotice({
  notice,
  onViewCart,
}: {
  notice: string;
  onViewCart: () => void;
}) {
  if (!notice) return null;
  return (
    <div className="cart-notice" role="status">
      <ShoppingBag size={18} />
      <span>{notice}</span>
      <button onClick={onViewCart}>View cart</button>
    </div>
  );
}
