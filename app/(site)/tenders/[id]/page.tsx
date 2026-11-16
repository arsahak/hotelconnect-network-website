import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/component/shared/Container";
import { TenderDetails } from "@/component/tenders/TenderDetails";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/tenders/[id]">): Promise<Metadata> {
  const { id } = await params;
  return pageMetadata({
    title: "Open tender",
    description: "An open tender from an independent boutique hotel. Suppliers send their quote directly — 0% commission.",
    path: `/tenders/${id}`,
  });
}

export default function TenderPage({ params }: PageProps<"/tenders/[id]">) {
  return (
    <Suspense
      fallback={
        <Container className="py-24">
          <div className="h-10 w-2/3 animate-pulse rounded bg-sand" />
          <div className="mt-6 h-64 animate-pulse rounded-xl bg-sand" />
        </Container>
      }
    >
      <TenderDetails params={params} />
    </Suspense>
  );
}
