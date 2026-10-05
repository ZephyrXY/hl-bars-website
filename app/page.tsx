import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';
import {
  ArrowRightIcon,
  Battery100Icon,
  BoltIcon,
  CheckCircleIcon,
  ClipboardDocumentCheckIcon,
  HomeModernIcon,
  MapPinIcon,
  PhoneIcon,
  ShieldCheckIcon,
  SunIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';
import { site } from '@/app/lib/site';
import { solarPackages } from '@/app/lib/products';
import { MessengerIcon } from '@/app/ui/brand-icons';
import { ProductCard } from '@/app/ui/product-card';
import solarDelivery from '@/public/images/solar-panels-delivery.jpg';
import solarEquipment from '@/public/images/solar-batteries-inverters.jpg';
import roofRedTile from '@/public/images/roof-red-tile.jpg';
import roofLongspanHouse from '@/public/images/roof-longspan-house.jpg';
import roofBlueCorrugated from '@/public/images/roof-blue-corrugated.jpg';
import roofTileSample from '@/public/images/roof-tile-profile-sample.jpg';

const highlights = [
  { icon: HomeModernIcon, title: 'Roofing', text: 'Supply & installation' },
  { icon: SunIcon, title: 'Hybrid solar', text: 'Panels, inverters & batteries' },
  { icon: ClipboardDocumentCheckIcon, title: 'Free site assessment', text: 'Before you commit' },
  { icon: WrenchScrewdriverIcon, title: 'After-sales support', text: 'We stay after the job' },
];

const roofingGallery: { src: StaticImageData; alt: string }[] = [
  { src: roofRedTile, alt: 'Newly installed red tile-profile metal roof on a house' },
  { src: roofLongspanHouse, alt: 'Aerial view of a new two-storey house with a maroon long-span roof' },
  { src: roofBlueCorrugated, alt: 'Blue corrugated roofing installed on a building near the sea' },
  { src: roofTileSample, alt: 'Close-up of terracotta-colored tile-profile roofing sheets' },
];

const roofingPoints = [
  'Long-span and colored roofing sheets in multiple profiles',
  'Supply only, or supply with full installation',
  'Trained crews working safely and finishing on time',
  'Maintenance and repairs after installation',
];

const steps = [
  { title: 'Consultation', text: 'Tell us about your home, your roof, or your electric bill. Call or message us.' },
  { title: 'Free site assessment', text: 'We visit, measure, and recommend the right materials or system size.' },
  { title: 'Supply & installation', text: 'Our own crew delivers and installs everything, cleanly and on schedule.' },
  { title: 'After-sales support', text: 'We stay reachable for maintenance, checks, and questions after the job.' },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-900">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(196,125,55,0.28),transparent_55%)]"
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-copper-400/40 bg-copper-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-copper-300">
              <BoltIcon className="h-4 w-4" />
              Roofing · Solar · Supply & Installation
            </p>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Roofs that protect.{' '}
              <span className="text-copper-400">Solar that pays you back.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-navy-100/80">
              HL Bars supplies and installs quality roofing and hybrid solar power
              systems for homes and businesses. One team handles everything, from
              the free site assessment to after-sales support.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-copper-500 px-6 py-3 font-semibold text-white shadow-lg shadow-copper-900/30 transition-colors hover:bg-copper-400"
              >
                Get a free site assessment
                <ArrowRightIcon className="h-5 w-5" />
              </Link>
              <a
                href={site.phoneHref}
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
              >
                <PhoneIcon className="h-5 w-5" />
                {site.phoneDisplay}
              </a>
            </div>
            <p className="mt-8 flex items-center gap-2 text-sm text-navy-100/70">
              <MapPinIcon className="h-5 w-5 text-copper-400" />
              Serving {site.branches.join(' and ')}
            </p>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
              <Image
                src={solarDelivery}
                alt="HL Bars crew unloading a pallet of 600W solar panels from a delivery truck"
                priority
                placeholder="blur"
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 left-4 right-4 flex items-center gap-4 rounded-2xl bg-white p-4 shadow-xl sm:left-auto sm:right-6 sm:max-w-xs">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-copper-50 text-copper-600">
                <SunIcon className="h-7 w-7" />
              </span>
              <p className="text-sm">
                <span className="block font-display font-bold text-navy-900">
                  Fresh from delivery
                </span>
                High-efficiency 600W panels, ready to install.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 lg:grid-cols-4 lg:px-8">
          {highlights.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-start gap-3">
              <Icon className="h-8 w-8 shrink-0 text-copper-500" />
              <div>
                <p className="font-display text-sm font-bold text-navy-900 sm:text-base">{title}</p>
                <p className="text-sm text-slate-500">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Roofing */}
      <section id="roofing" className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-end">
            <div>
              <p className="font-display text-sm font-bold uppercase tracking-wider text-copper-600">
                Roofing
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Strong roofs. Smart solutions. Built to protect what matters.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-600">
                From colored long-span sheets to complete re-roofing, we supply the
                materials and send a trained crew to install them properly the
                first time.
              </p>
              <Link
                href="/products#roofing"
                className="mt-6 inline-flex items-center gap-2 font-semibold text-copper-600 hover:text-copper-700"
              >
                View roofing products
                <ArrowRightIcon className="h-5 w-5" />
              </Link>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {roofingPoints.map((point) => (
                <li key={point} className="flex gap-3 rounded-xl bg-white p-4 text-sm shadow-sm ring-1 ring-slate-200">
                  <CheckCircleIcon className="h-5 w-5 shrink-0 text-navy-600" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-12 grid auto-rows-[11rem] grid-cols-2 gap-4 sm:auto-rows-[14rem] lg:grid-cols-4">
            {roofingGallery.map((img, i) => (
              <figure
                key={img.alt}
                className={
                  'group relative overflow-hidden rounded-2xl shadow-md ring-1 ring-slate-200 ' +
                  (i === 0 ? 'col-span-2 row-span-2' : i === 1 ? 'col-span-2' : '')
                }
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  placeholder="blur"
                  sizes={i < 2 ? '(min-width: 1024px) 50vw, 100vw' : '(min-width: 1024px) 25vw, 50vw'}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Solar */}
      <section id="solar" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="grid grid-cols-5 gap-4">
              <div className="col-span-3 overflow-hidden rounded-3xl shadow-lg">
                <Image
                  src={solarEquipment}
                  alt="Genixgreen LiFePO4 battery, hybrid inverter and crates of lithium batteries in the HL Bars warehouse"
                  placeholder="blur"
                  sizes="(min-width: 1024px) 30vw, 60vw"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="col-span-2 flex flex-col justify-end gap-4">
                <div className="rounded-2xl bg-navy-900 p-5 text-white">
                  <Battery100Icon className="h-8 w-8 text-copper-400" />
                  <p className="mt-3 font-display text-2xl font-extrabold">LiFePO4</p>
                  <p className="text-sm text-navy-100/70">Safe, long-life lithium batteries</p>
                </div>
                <div className="rounded-2xl bg-copper-50 p-5">
                  <BoltIcon className="h-8 w-8 text-copper-600" />
                  <p className="mt-3 font-display text-2xl font-extrabold text-navy-900">Hybrid</p>
                  <p className="text-sm text-slate-600">Grid, solar and battery in one system</p>
                </div>
              </div>
            </div>

            <div>
              <p className="font-display text-sm font-bold uppercase tracking-wider text-copper-600">
                Solar power
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                No more brownouts. No more expensive electric bills.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-600">
                Tired of high electricity bills and sudden brownouts? Our hybrid
                solar systems run your home on the sun during the day and on
                battery at night, and keep the lights on when the grid goes down.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  'SolaX hybrid inverters, 6kW to 12kW',
                  'High-efficiency 600W solar panels',
                  'LiFePO4 batteries from 200Ah to 628Ah',
                  'Complete accessories, mounting and professional installation',
                ].map((point) => (
                  <li key={point} className="flex gap-3">
                    <CheckCircleIcon className="h-6 w-6 shrink-0 text-copper-500" />
                    {point}
                  </li>
                ))}
              </ul>
              <Link
                href="/products#solar"
                className="mt-8 inline-flex items-center gap-2 font-semibold text-copper-600 hover:text-copper-700"
              >
                View all solar products
                <ArrowRightIcon className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Solar packages */}
      <section id="packages" className="scroll-mt-20 bg-slate-50 py-20 sm:scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="font-display text-sm font-bold uppercase tracking-wider text-copper-600">
              Solar packages
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Complete hybrid systems, installed
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Inverter, panels, battery, accessories and professional installation
              in one VAT-inclusive price. Not sure which one fits? We&apos;ll size it for you
              during the free site assessment.
            </p>
          </div>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {solarPackages.map((pkg) => (
              <ProductCard key={pkg.id} product={pkg} />
            ))}
          </ul>
        </div>
      </section>

      {/* Process */}
      <section className="bg-navy-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="font-display text-sm font-bold uppercase tracking-wider text-copper-600">
              How we work
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              From the first call to years after installation
            </h2>
          </div>
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <li key={step.title} className="rounded-2xl bg-white p-6 shadow-sm">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-800 font-display font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-lg font-bold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {[
              { icon: ShieldCheckIcon, text: 'Quality, certified materials' },
              { icon: WrenchScrewdriverIcon, text: 'Expert installation by HL Builders' },
              { icon: CheckCircleIcon, text: 'Dependable after-sales support' },
            ].map(({ icon: Icon, text }) => (
              <p key={text} className="flex items-center gap-3 font-semibold text-navy-900">
                <Icon className="h-6 w-6 text-copper-500" />
                {text}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-800 to-navy-950 px-6 py-14 text-center sm:px-12">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(196,125,55,0.3),transparent_50%)]"
            />
            <div className="relative">
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Invest in solar today. Build a roof that lasts.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-navy-100/80">
                Book your free consultation. We&apos;re open {site.days.toLowerCase()},{' '}
                {site.hours}.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <a
                  href={site.phoneHref}
                  className="inline-flex items-center gap-2 rounded-full bg-copper-500 px-6 py-3 font-semibold text-white hover:bg-copper-400"
                >
                  <PhoneIcon className="h-5 w-5" />
                  Call {site.phoneDisplay}
                </a>
                <a
                  href={site.messenger}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-navy-900 hover:bg-navy-50"
                >
                  <MessengerIcon className="h-5 w-5 text-[#0084FF]" />
                  Message us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
