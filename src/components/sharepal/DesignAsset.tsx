import Image from "next/image";
import dimensions from "@/constants/data/figma-assets.json";

/** Keep exported SVGs at their original dimensions. */
export default function DesignAsset({
  name,
  alt = "",
  className = "",
}: {
  name: keyof typeof dimensions;
  alt?: string;
  className?: string;
}) {
  return (
    <Image
      src={`/figma/${name}.svg`}
      alt={alt}
      {...dimensions[name]}
      className={`shrink-0 ${className}`}
      unoptimized
    />
  );
}
