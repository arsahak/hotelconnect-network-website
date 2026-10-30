import Image from "next/image";
import { cn } from "@/lib/cn";
import { BrandMark } from "./BrandMark";
import { skipOptimizer } from "@/lib/images";

/**
 * A cover photo that fills its (relative) parent. Without a photo yet it
 * shows a sand tile with the logo's "H" instead of a broken image.
 */
export function Photo({
  src,
  alt,
  sizes,
  className,
  priority,
}: {
  src?: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
}) {
  if (!src) {
    return (
      <div className={cn("absolute inset-0 grid place-items-center bg-sand", className)} role="img" aria-label={alt}>
        <BrandMark tone="current" className="w-10 text-brass-400/70" />
      </div>
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      unoptimized={skipOptimizer(src)}
      className={cn("object-cover", className)}
    />
  );
}
