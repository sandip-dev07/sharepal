export interface Product {
  id: number; name: string; image: string; rating: number; booked_count: number;
  tag: string; per_day_rent: number; out_of_stock: boolean; six_day_rent?: number;
}
export const RENTAL_DAYS = 6;
export function rentalTotal(perDay: number, days: number = RENTAL_DAYS) { return Math.round(perDay * days); }
export function rentalMrp(total: number) { return Math.round(total * 1.2); }
export function productTotal(product: Product, days: number = RENTAL_DAYS) {
  return Math.round((product.six_day_rent ? product.six_day_rent / RENTAL_DAYS : product.per_day_rent) * days);
}
export function daysBetween(delivery: string, pickup: string) {
  return Math.max(1, Math.round((Date.parse(pickup) - Date.parse(delivery)) / 86400000) - 1);
}
export function formatINR(n: number) { return `₹${n.toLocaleString("en-IN")}`; }
