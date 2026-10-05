import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { CatalogView, ProductCatalog } from '@/app/ui/product-catalog';

export const metadata: Metadata = {
  title: 'Products',
  description:
    'Roofing sheets, solar panels, SolaX and Luxpower inverters, LiFePO4 batteries, mounting and protection parts from HL Bars in Ormoc City and Naval, Biliran.',
};

export default function ProductsPage() {
  return (
    <>
      <section className="bg-navy-900">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <p className="font-display text-sm font-bold uppercase tracking-wider text-copper-400">
            Products
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Roofing and solar, supplied and installed
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-navy-100/80">
            Browse what we carry. Roofing prices depend on your roof size, so send
            us an inquiry for a quotation. Looking for a complete solar setup? See
            our{' '}
            <Link href="/#packages" className="font-semibold text-copper-300 hover:text-copper-400">
              solar packages
            </Link>
            .
          </p>
        </div>
      </section>

      {/* The selected category lives in the URL; until it is read, show everything. */}
      <Suspense fallback={<CatalogView selected="all" />}>
        <ProductCatalog />
      </Suspense>
    </>
  );
}
