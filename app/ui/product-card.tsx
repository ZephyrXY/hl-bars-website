import Image from 'next/image';
import Link from 'next/link';
import { ArrowRightIcon, CheckIcon } from '@heroicons/react/24/outline';
import { formatPrice, type Product } from '@/app/lib/products';

function inquireHref(product: Product) {
  return `/contact?product=${product.id}`;
}

function ProductImage({
  product,
  sizes,
  padding = 'p-4',
}: {
  product: Product;
  sizes: string;
  padding?: string;
}) {
  if (!product.image) return null;
  // Imported photos fill the frame; catalog cut-outs (string paths) sit on white.
  return typeof product.image === 'string' ? (
    <Image
      src={product.image}
      alt={product.name}
      fill
      sizes={sizes}
      className={`object-contain ${padding}`}
    />
  ) : (
    <Image
      src={product.image}
      alt={product.name}
      fill
      placeholder="blur"
      sizes={sizes}
      className="object-cover"
    />
  );
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <li className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
      {product.image && (
        <div className="relative aspect-[4/3] border-b border-slate-100 bg-white">
          <ProductImage
            product={product}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <h4 className="text-lg font-bold leading-snug">{product.name}</h4>
        {product.model && <p className="mt-1 text-xs text-slate-500">Model: {product.model}</p>}
        {product.description && (
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{product.description}</p>
        )}
        <ul className="mt-4 space-y-2 text-sm">
          {product.specs.map((spec) => (
            <li key={spec} className="flex gap-2">
              <CheckIcon className="h-5 w-5 shrink-0 text-copper-500" />
              {spec}
            </li>
          ))}
        </ul>
        {product.details && (
          <details className="group mt-4 text-sm">
            <summary className="cursor-pointer font-semibold text-navy-700 hover:text-copper-600">
              Full specifications
            </summary>
            <ul className="mt-3 space-y-1.5 border-l-2 border-slate-200 pl-3 text-slate-600">
              {product.details.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </details>
        )}
        <div className="mt-auto pt-6">
          {product.price ? (
            <p>
              <span className="font-display text-2xl font-extrabold text-navy-900">
                {formatPrice(product.price)}
              </span>
              {product.priceNote && (
                <span className="block text-xs text-slate-500">{product.priceNote}</span>
              )}
            </p>
          ) : (
            <p className="font-display font-bold text-navy-900">Ask for price</p>
          )}
          <Link
            href={inquireHref(product)}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy-800 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-700"
          >
            Inquire about this
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </li>
  );
}

/** Compact row for small parts such as clamps and breakers. */
export function ProductRow({ product }: { product: Product }) {
  return (
    <li className="flex items-center gap-4 p-4 sm:px-6">
      {product.image && (
        <div className="relative h-14 w-14 shrink-0 rounded-lg bg-white ring-1 ring-slate-200">
          <ProductImage product={product} sizes="56px" padding="p-1" />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-navy-900">{product.name}</p>
        <p className="text-xs text-slate-500">
          {[product.model, ...product.specs].filter(Boolean).join(' · ')}
        </p>
      </div>
      <div className="shrink-0 text-right">
        <p className="font-display font-extrabold text-navy-900">
          {product.price ? formatPrice(product.price) : 'Ask for price'}
        </p>
        <Link
          href={inquireHref(product)}
          className="text-xs font-semibold text-copper-600 hover:text-copper-700"
        >
          Inquire
        </Link>
      </div>
    </li>
  );
}
