import type { Metadata } from 'next';
import { ClockIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { findProduct } from '@/app/lib/products';
import { site } from '@/app/lib/site';
import { FacebookIcon, MessengerIcon } from '@/app/ui/brand-icons';
import InquiryForm from '@/app/ui/inquiry-form';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Call, message, or visit HL Bars for roofing and solar supply and installation. Open Monday to Saturday, 7:45am to 5:00pm.',
};

const channels = [
  {
    icon: PhoneIcon,
    label: 'Call or text',
    value: site.phone,
    href: site.phoneHref,
    external: false,
  },
  {
    icon: FacebookIcon,
    label: 'Facebook',
    value: 'facebook.com/coloredroofing',
    href: site.facebook,
    external: true,
  },
  {
    icon: MessengerIcon,
    label: 'Messenger',
    value: 'm.me/coloredroofing',
    href: site.messenger,
    external: true,
  },
];

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  const { product: productId } = await searchParams;
  const product = findProduct(productId);

  return (
    <>
      <section className="bg-navy-900">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <p className="font-display text-sm font-bold uppercase tracking-wider text-copper-400">
            Contact Us
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Let&apos;s talk about your roof or your solar setup
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-navy-100/80">
            Ask for a quotation or book a free site assessment by calling,
            texting, or messaging us during business hours.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-5 lg:px-8">
          <div className="space-y-4 lg:col-span-2">
            {channels.map(({ icon: Icon, label, value, href, external }) => (
              <a
                key={label}
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 transition hover:shadow-md hover:ring-copper-300"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy-700 group-hover:bg-copper-50 group-hover:text-copper-600">
                  <Icon className="h-6 w-6" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm text-slate-500">{label}</span>
                  <span className="block break-words font-display font-bold text-navy-900">{value}</span>
                </span>
              </a>
            ))}

            <div className="rounded-2xl bg-navy-900 p-6 text-navy-100">
              <p className="flex items-center gap-3 font-display font-bold text-white">
                <ClockIcon className="h-6 w-6 text-copper-400" />
                Business hours
              </p>
              <p className="mt-3 text-lg">
                Opens from <span className="font-semibold text-white">{site.hours}</span>
              </p>
              <p>{site.days}</p>
              <p className="mt-4 flex items-start gap-3 border-t border-white/10 pt-4 text-sm">
                <MapPinIcon className="h-5 w-5 shrink-0 text-copper-400" />
                <span>
                  {site.address}
                  <br />
                  Also serving Naval, Biliran
                </span>
              </p>
            </div>
          </div>

          <div
            id="inquiry"
            className="order-first scroll-mt-24 rounded-3xl bg-slate-50 p-6 ring-1 ring-slate-200 sm:scroll-mt-28 sm:p-8 lg:order-none lg:col-span-3"
          >
            <h2 className="text-2xl font-extrabold tracking-tight">Send us an inquiry</h2>
            <p className="mt-2 text-sm text-slate-600">
              Fill this in and send it straight to us by SMS or Messenger.
            </p>
            <div className="mt-6">
              <InquiryForm initialProductId={product?.id} />
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl ring-1 ring-slate-200">
            <iframe
              title="Map to HL Bars in Brgy. Cogon Combado, Ormoc City"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(site.address)}&z=15&output=embed`}
              className="h-80 w-full sm:h-96"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
