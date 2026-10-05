'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { categories, groups, products, type ProductCategory } from '@/app/lib/products';

const menu = (['roofing', 'solar'] as ProductCategory[]).map((category) => ({
  category,
  title: categories[category].title,
  groups: groups.filter(
    (group) => group.category === category && products.some((p) => p.group === group.id),
  ),
}));

const href = (value?: string) => (value ? `/products?category=${value}` : '/products');

/** "Products" item in the header with a dropdown of product categories. */
export default function ProductsMenu({ active }: { active: boolean }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const close = () => setOpen(false);
  const itemClass =
    'block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-navy-50 hover:text-navy-800';

  return (
    <div ref={rootRef} className="sm:relative">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((o) => !o)}
        className={clsx(
          'inline-flex items-center gap-0.5 whitespace-nowrap rounded-full px-2.5 py-2 text-sm font-semibold transition-colors sm:px-4',
          active || open
            ? 'bg-navy-50 text-navy-800'
            : 'text-slate-600 hover:bg-slate-100 hover:text-navy-800',
        )}
      >
        Products
        <ChevronDownIcon
          className={clsx('h-4 w-4 transition-transform', open && 'rotate-180')}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          id={menuId}
          className="absolute inset-x-4 top-full mt-2 max-h-[calc(100vh-6rem)] overflow-y-auto rounded-2xl bg-white p-2 shadow-xl ring-1 ring-slate-200 sm:inset-x-auto sm:right-0 sm:w-72"
        >
          <Link href={href()} onClick={close} className={clsx(itemClass, 'font-semibold text-navy-900')}>
            All products
          </Link>
          {menu.map((section) => (
            <div key={section.category} className="mt-1 border-t border-slate-100 pt-1">
              <Link
                href={href(section.category)}
                onClick={close}
                className={clsx(itemClass, 'font-semibold text-navy-900')}
              >
                {section.title}
              </Link>
              {section.groups.map((group) => (
                <Link key={group.id} href={href(group.id)} onClick={close} className={clsx(itemClass, 'pl-6')}>
                  {group.name}
                </Link>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
