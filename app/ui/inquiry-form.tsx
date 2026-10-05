'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ChatBubbleLeftRightIcon,
  MinusIcon,
  PlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { site } from '@/app/lib/site';
import { categories, findProduct, formatPrice, type Product } from '@/app/lib/products';
import { MessengerIcon } from '@/app/ui/brand-icons';
import { useInquiry } from '@/app/ui/inquiry-context';

const services = ['Roofing', 'Solar power system', 'Roofing and solar', 'Other'];

/** Picks the service that matches the products in the list. */
function serviceFor(products: Product[]) {
  const kinds = new Set(products.map((p) => p.category));
  if (kinds.size === 2) return 'Roofing and solar';
  const [only] = kinds;
  return only ? categories[only].service : services[0];
}

export default function InquiryForm({ initialProductId }: { initialProductId?: string }) {
  const inquiry = useInquiry();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [chosenService, setChosenService] = useState<string | null>(null);
  const [details, setDetails] = useState('');
  const [status, setStatus] = useState<string | null>(null);

  const { add } = inquiry;
  useEffect(() => {
    // Support old links like /contact?product=<id>.
    if (initialProductId) add(initialProductId);
  }, [initialProductId, add]);

  const lines = inquiry.items.flatMap((item) => {
    const product = findProduct(item.id);
    return product ? [{ ...item, product }] : [];
  });
  const priced = lines.filter((line) => line.product.price);
  const total = priced.reduce((sum, line) => sum + line.product.price! * line.qty, 0);
  const service = chosenService ?? serviceFor(lines.map((line) => line.product));

  const message = [
    `Hi HL Bars! I'd like to inquire about: ${service}.`,
    lines.length > 0 &&
      [
        '',
        'Products:',
        ...lines.map(({ qty, product }) =>
          [
            `- ${qty} × ${product.name}`,
            product.model && ` (${product.model})`,
            product.price && ` @ ${formatPrice(product.price)}`,
          ]
            .filter(Boolean)
            .join(''),
        ),
        priced.length > 0 && `Estimated total: ${formatPrice(total)} (VAT inclusive)`,
        '',
      ]
        .filter((line) => line !== false)
        .join('\n'),
    name && `Name: ${name}`,
    phone && `Contact number: ${phone}`,
    location && `Location: ${location}`,
    details && `Details: ${details}`,
  ]
    .filter(Boolean)
    .join('\n');

  const canSend = name.trim() !== '' && phone.trim() !== '';

  async function sendViaMessenger() {
    try {
      await navigator.clipboard.writeText(message);
      setStatus('Your message was copied. Paste it into the Messenger chat that just opened.');
    } catch {
      setStatus('Messenger opened. Please type or paste your inquiry there.');
    }
    window.open(site.messenger, '_blank', 'noopener,noreferrer');
  }

  const inputClass =
    'mt-1.5 block w-full rounded-lg border-slate-300 text-sm shadow-sm focus:border-navy-600 focus:ring-navy-600';

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
      <div>
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-sm font-semibold text-navy-900">
            Products in your inquiry{lines.length > 0 && ` (${lines.length})`}
          </p>
          {lines.length > 0 && (
            <button
              type="button"
              onClick={inquiry.clear}
              className="text-xs font-semibold text-slate-500 hover:text-copper-700"
            >
              Clear all
            </button>
          )}
        </div>

        {lines.length === 0 ? (
          <p className="mt-2 rounded-lg border border-dashed border-slate-300 bg-white px-4 py-3 text-sm text-slate-500">
            No products added yet.{' '}
            <Link href="/products" className="font-semibold text-copper-600 hover:text-copper-700">
              Browse products
            </Link>{' '}
            and tap &ldquo;Add to inquiry&rdquo; on anything you&apos;d like a quote for, or just
            describe your project below.
          </p>
        ) : (
          <>
            <ul className="mt-2 divide-y divide-slate-200 rounded-lg bg-white ring-1 ring-slate-200">
              {lines.map(({ id, qty, product }) => (
                <li key={id} className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3">
                  <div className="min-w-0 flex-1 basis-48">
                    <p className="text-sm font-semibold text-navy-900">{product.name}</p>
                    <p className="text-xs text-slate-500">
                      {product.price ? `${formatPrice(product.price)} each` : 'Price on request'}
                      {product.model && ` · ${product.model}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      aria-label={`Decrease quantity of ${product.name}`}
                      onClick={() => inquiry.setQty(id, qty - 1)}
                      disabled={qty <= 1}
                      className="rounded-full p-1.5 text-slate-600 hover:bg-slate-100 disabled:opacity-40"
                    >
                      <MinusIcon className="h-4 w-4" />
                    </button>
                    <input
                      type="number"
                      min={1}
                      inputMode="numeric"
                      aria-label={`Quantity of ${product.name}`}
                      value={qty}
                      onChange={(e) => inquiry.setQty(id, Number(e.target.value))}
                      className="w-16 rounded-lg border-slate-300 px-2 py-1 text-center text-sm focus:border-navy-600 focus:ring-navy-600"
                    />
                    <button
                      type="button"
                      aria-label={`Increase quantity of ${product.name}`}
                      onClick={() => inquiry.setQty(id, qty + 1)}
                      className="rounded-full p-1.5 text-slate-600 hover:bg-slate-100"
                    >
                      <PlusIcon className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="w-28 text-right text-sm font-semibold text-navy-900">
                    {product.price ? formatPrice(product.price * qty) : '—'}
                  </p>
                  <button
                    type="button"
                    aria-label={`Remove ${product.name}`}
                    onClick={() => inquiry.remove(id)}
                    className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-copper-700"
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
            {priced.length > 0 && (
              <p className="mt-2 text-right text-sm text-slate-600">
                Estimated total:{' '}
                <span className="font-display text-lg font-extrabold text-navy-900">
                  {formatPrice(total)}
                </span>
                <span className="block text-xs text-slate-500">
                  VAT inclusive
                  {priced.length < lines.length && ', excludes items priced on request'}. Final
                  quotation may vary.
                </span>
              </p>
            )}
            <Link
              href="/products"
              className="mt-2 inline-block text-sm font-semibold text-copper-600 hover:text-copper-700"
            >
              + Add more products
            </Link>
          </>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-semibold text-navy-900">
          Your name <span className="text-copper-600">*</span>
          <input required value={name} onChange={(e) => setName(e.target.value)} className={inputClass} autoComplete="name" />
        </label>
        <label className="block text-sm font-semibold text-navy-900">
          Contact number <span className="text-copper-600">*</span>
          <input required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} autoComplete="tel" placeholder="09XX XXX XXXX" />
        </label>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-semibold text-navy-900">
          I&apos;m interested in
          <select value={service} onChange={(e) => setChosenService(e.target.value)} className={inputClass}>
            {services.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-semibold text-navy-900">
          Location
          <input value={location} onChange={(e) => setLocation(e.target.value)} className={inputClass} placeholder="Barangay, City" />
        </label>
      </div>
      <label className="block text-sm font-semibold text-navy-900">
        Tell us about your project
        <textarea
          rows={4}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          className={inputClass}
          placeholder="e.g. roof area, monthly electric bill, preferred package"
        />
      </label>

      <div className="flex flex-col gap-3 sm:flex-row">
        <a
          href={canSend ? `${site.smsHref}?body=${encodeURIComponent(message)}` : undefined}
          aria-disabled={!canSend}
          onClick={(e) => {
            if (!canSend) {
              e.preventDefault();
              setStatus('Please enter your name and contact number first.');
            }
          }}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-copper-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-copper-600 aria-disabled:opacity-60"
        >
          <ChatBubbleLeftRightIcon className="h-5 w-5" />
          Send via SMS
        </a>
        <button
          type="button"
          onClick={() => (canSend ? sendViaMessenger() : setStatus('Please enter your name and contact number first.'))}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-navy-800 px-6 py-3 font-semibold text-white transition-colors hover:bg-navy-700"
        >
          <MessengerIcon className="h-5 w-5" />
          Send via Messenger
        </button>
      </div>
      {status && (
        <p role="status" className="rounded-lg bg-navy-50 px-4 py-3 text-sm text-navy-800">
          {status}
        </p>
      )}
      <p className="text-xs text-slate-500">
        SMS opens your phone&apos;s messaging app with your inquiry filled in, ready to send to {site.phoneDisplay}.
      </p>
    </form>
  );
}
