'use client';

import { useRef } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { HomeModernIcon, SunIcon } from '@heroicons/react/24/outline';
import { categories, groups, products, type ProductCategory } from '@/app/lib/products';
import { ProductCard, ProductRow } from '@/app/ui/product-card';

const sections: { category: ProductCategory; icon: typeof SunIcon }[] = [
  { category: 'roofing', icon: HomeModernIcon },
  { category: 'solar', icon: SunIcon },
];

const catalog = sections.map((section) => ({
  ...section,
  groups: groups
    .filter((group) => group.category === section.category)
    .map((group) => ({ ...group, items: products.filter((p) => p.group === group.id) }))
    .filter((group) => group.items.length > 0),
}));

const countFor = (category: ProductCategory) =>
  products.filter((p) => p.category === category).length;

/** Valid dropdown values: 'all', a category, or a group id. */
function isValidSelection(value: string | null): value is string {
  return (
    value === 'all' ||
    catalog.some((s) => s.category === value || s.groups.some((g) => g.id === value))
  );
}

/** Reads the selection from the URL (?category=...) and keeps it in sync. */
export function ProductCatalog() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const fromUrl = params.get('category');
  const selected = isValidSelection(fromUrl) ? fromUrl : 'all';

  return (
    <CatalogView
      selected={selected}
      onSelect={(value) =>
        router.replace(value === 'all' ? pathname : `${pathname}?category=${value}`, {
          scroll: false,
        })
      }
    />
  );
}

export function CatalogView({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect?: (value: string) => void;
}) {
  const topRef = useRef<HTMLDivElement>(null);

  const visible = catalog
    .map((section) => ({
      ...section,
      groups: section.groups.filter(
        (group) => selected === 'all' || selected === section.category || selected === group.id,
      ),
    }))
    .filter((section) => section.groups.length > 0);

  const shown = visible.reduce(
    (sum, s) => sum + s.groups.reduce((n, g) => n + g.items.length, 0),
    0,
  );

  return (
    <div ref={topRef} className="scroll-mt-16 sm:scroll-mt-20">
      <div className="sticky top-16 z-40 border-b border-slate-200 bg-white/90 backdrop-blur sm:top-20">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3 sm:px-6 lg:px-8">
          <label htmlFor="product-category" className="text-sm font-semibold text-navy-900">
            Category
          </label>
          <select
            id="product-category"
            value={selected}
            disabled={!onSelect}
            onChange={(e) => {
              onSelect?.(e.target.value);
              // If the list is scrolled past, jump back to the top of the catalog.
              const top = topRef.current;
              if (top && top.getBoundingClientRect().top < 0) top.scrollIntoView();
            }}
            className="min-w-0 flex-1 rounded-full border-slate-300 py-2 pl-4 pr-10 text-sm font-semibold text-navy-800 shadow-sm focus:border-navy-600 focus:ring-navy-600 sm:max-w-sm sm:flex-none"
          >
            <option value="all">All products ({products.length})</option>
            {catalog.map((section) => (
              <optgroup key={section.category} label={categories[section.category].title}>
                <option value={section.category}>
                  All {categories[section.category].title.toLowerCase()} (
                  {countFor(section.category)})
                </option>
                {section.groups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name} ({group.items.length})
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          <p className="text-sm text-slate-500" aria-live="polite">
            Showing {shown} {shown === 1 ? 'product' : 'products'}
          </p>
        </div>
      </div>

      {visible.map(({ category, icon: Icon, groups: sectionGroups }, i) => (
        <section key={category} className={`py-16 ${i % 2 === 0 ? 'bg-slate-50' : ''}`}>
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

            {sectionGroups.map((group) => (
              <div key={group.id} className="mt-12">
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
      ))}
    </div>
  );
}
