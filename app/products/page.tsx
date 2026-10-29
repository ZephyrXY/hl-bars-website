import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { CatalogView, ProductCatalog } from '@/app/ui/product-catalog';

export const metadata: Metadata = {
  title: 'Products',
  description:
    'Solar panels, HL, SolaX and Luxpower inverters, and LiFePO4 batteries from HL Bars in Ormoc City and Naval, Biliran.',
};

export default function ProductsPage() {
  return (
    <>
      <section className="bg-charcoal-900">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <p className="font-display text-sm font-bold uppercase tracking-wider text-brand-400">
            Products
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Solar products, supplied and installed
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-charcoal-100/80">
            Browse what we carry. Looking for a complete solar setup? See our{' '}
            <Link href="/#packages" className="font-semibold text-brand-300 hover:text-brand-400">
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
