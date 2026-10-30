import type { Metadata } from "next";
import { Suspense } from "react";
import { getSupplierAction } from "@/app/actions/supplier";
import { Container } from "@/component/shared/Container";
import { SupplierProfile } from "@/component/suppliers/SupplierProfile";
import { pageMetadata, snippet } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/suppliers/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const supplier = (await getSupplierAction(slug)).data;
  if (!supplier) return { title: "Supplier not found" };
  return pageMetadata({
    title: supplier.name,
    description: snippet(
      [supplier.tagline || supplier.description, supplier.regions.length ? `Supplier for boutique hotels in ${supplier.regions.join(", ")}.` : ""]
        .filter(Boolean)
        .join(" "),
    ),
    path: `/suppliers/${supplier.slug}`,
    image: supplier.image || undefined,
  });
}

export default function SupplierPage({ params }: PageProps<"/suppliers/[slug]">) {
  return (
    <Suspense
      fallback={
        <Container className="py-24">
          <div className="h-10 w-1/2 animate-pulse rounded bg-sand" />
          <div className="mt-6 h-64 animate-pulse rounded-xl bg-sand" />
        </Container>
      }
    >
      <SupplierProfile params={params} />
    </Suspense>
  );
}
