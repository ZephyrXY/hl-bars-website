import type { Metadata } from 'next';
import Link from 'next/link';
import { HomeModernIcon, SunIcon } from '@heroicons/react/24/outline';
import { categories, groups, products, type ProductCategory } from '@/app/lib/products';
import { ProductCard, ProductRow } from '@/app/ui/product-card';

export const metadata: Metadata = {
  title: 'Products',
  description:
    'Roofing sheets, solar panels, SolaX and Luxpower inverters, LiFePO4 batteries, mounting and protection parts from HL Bars in Ormoc City and Naval, Biliran.',
};

const sections: { category: ProductCategory; icon: typeof SunIcon }[] = [
  { category: 'roofing', icon: HomeModernIcon },
  { category: 'solar', icon: SunIcon },
];

function groupsFor(category: ProductCategory) {
  return groups
    .filter((group) => group.category === category)
    .map((group) => ({ ...group, items: products.filter((p) => p.group === group.id) }))
    .filter((group) => group.items.length > 0);
}

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

      <nav
        aria-label="Product categories"
        className="sticky top-16 z-40 border-b border-slate-200 bg-white/90 backdrop-blur sm:top-20"
      >
        <div className="mx-auto flex max-w-7xl gap-2 px-4 py-3 sm:px-6 lg:px-8">
          {sections.map(({ category, icon: Icon }) => (
            <a
              key={category}
              href={`#${category}`}
              className="inline-flex items-center gap-2 rounded-full bg-navy-50 px-4 py-2 text-sm font-semibold text-navy-800 transition-colors hover:bg-copper-50 hover:text-copper-700"
            >
              <Icon className="h-5 w-5" />
              {categories[category].title}
            </a>
          ))}
        </div>
      </nav>

      {sections.map(({ category, icon: Icon }, i) => {
        const categoryGroups = groupsFor(category);
        return (
          <section
            key={category}
            id={category}
            className={`scroll-mt-32 py-16 sm:scroll-mt-36 ${i % 2 === 0 ? 'bg-slate-50' : ''}`}
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-copper-50 text-copper-600">
                  <Icon className="h-7 w-7" />
                </span>
                <div>
                  <h2 className="text-3xl font-extrabold tracking-tight">
                    {categories[category].title}
                  </h2>
                  <p className="mt-2 max-w-2xl text-slate-600">{categories[category].intro}</p>
                </div>
              </div>

              {categoryGroups.length > 1 && (
                <ul className="mt-8 flex flex-wrap gap-2">
                  {categoryGroups.map((group) => (
                    <li key={group.id}>
                      <a
                        href={`#${group.id}`}
                        className="inline-block rounded-full border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:border-copper-400 hover:text-copper-700"
                      >
                        {group.name}
                        <span className="ml-1.5 text-slate-400">{group.items.length}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}

              {categoryGroups.map((group) => (
                <div key={group.id} id={group.id} className="mt-12 scroll-mt-36 sm:scroll-mt-40">
                  <h3 className="font-display text-sm font-bold uppercase tracking-wider text-copper-600">
                    {group.name}
                  </h3>
                  {group.layout === 'list' ? (
                    <ul className="mt-5 divide-y divide-slate-200 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
                      {group.items.map((product) => (
                        <ProductRow key={product.id} product={product} />
                      ))}
                    </ul>
                  ) : (
                    <ul className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {group.items.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
}
