import Image from "next/image";
import { cn } from "@/lib/cn";
import { skipOptimizer } from "@/lib/images";
import { Monogram } from "@/component/shared/Monogram";

/** The supplier's logo, or its initials until a logo is uploaded. */
export function SupplierLogo({ name, logo, className }: { name: string; logo?: string; className?: string }) {
  if (!logo) return <Monogram name={name} className={className} />;
  return (
    <span className={cn("relative block size-14 shrink-0 overflow-hidden rounded-md border border-line bg-white shadow-sm", className)}>
      <Image src={logo} alt={`${name} logo`} fill sizes="80px" unoptimized={skipOptimizer(logo)} className="object-contain p-1.5" />
    </span>
  );
}
