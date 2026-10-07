import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SearchPanel({
  query,
  onQueryChange,
  onSubmit,
}: {
  query: string;
  onQueryChange: (value: string) => void;
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
      <label className="sr-only" htmlFor="product-search">
        Search products
      </label>
      <Input
        id="product-search"
        placeholder="Try PS5, Xbox, Oculus…"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        autoFocus
      />
      <Button className="primary-action" type="submit">
        <Search size={18} />
        Search products
      </Button>
    </form>
  );
}
