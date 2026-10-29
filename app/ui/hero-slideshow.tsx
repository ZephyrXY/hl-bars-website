'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { Battery100Icon, HomeModernIcon, SunIcon } from '@heroicons/react/24/outline';
import solarDelivery from '@/public/images/solar-panels-delivery.jpg';
import solarEquipment from '@/public/images/solar-batteries-inverters.jpg';
import roofRedTileHouse from '@/public/images/roof-red-tile-house.jpg';
import roofBrownInstalled from '@/public/images/roof-brown-longspan-installed.jpg';

/** How long each photo stays up, in milliseconds. */
const interval = 5000;

/** Alternates solar and roofing to match the "Roofs that protect. Solar that pays you back." headline. */
const slides = [
  {
    src: solarDelivery,
    alt: 'HL Bars crew unloading a pallet of 600W solar panels from a delivery truck',
    icon: SunIcon,
    title: 'Fresh from delivery',
    text: 'High-efficiency 600W panels, ready to install.',
  },
  {
    src: roofRedTileHouse,
    alt: 'Red tile-profile metal roof installed on a new house in the hills',
    icon: HomeModernIcon,
    title: 'Tile-profile roofing',
    text: 'A finished roof, installed by our own crew.',
  },
  {
    src: solarEquipment,
    alt: 'Genixgreen LiFePO4 battery, hybrid inverter and crates of lithium batteries in the HL Bars warehouse',
    icon: Battery100Icon,
    title: 'Batteries & inverters in stock',
    text: 'LiFePO4 batteries and hybrid inverters, ready for your home.',
  },
  {
    src: roofBrownInstalled,
    alt: 'Brown long-span roof installed by HL Bars under a blue sky',
    icon: HomeModernIcon,
    title: 'Long-span roofing',
    text: 'Colored long-span sheets, cut to length and installed.',
  },
];

/** Hero photo that crossfades through roofing and solar work. */
export default function HeroSlideshow() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = setInterval(() => setActive((i) => (i + 1) % slides.length), interval);
    return () => clearInterval(timer);
    // Restart the timer when the slide changes, so a dot click gets the full interval.
  }, [paused, active]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
        {slides.map((slide, i) => (
          <Image
            key={slide.title}
            src={slide.src}
            alt={slide.alt}
            aria-hidden={i !== active || undefined}
            priority={i === 0}
            placeholder="blur"
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className={clsx(
              'object-cover transition-opacity duration-1000',
              i === active ? 'opacity-100' : 'opacity-0',
            )}
          />
        ))}

        <div className="absolute right-4 top-4 flex gap-1.5 rounded-full bg-navy-950/40 px-2.5 py-2 backdrop-blur">
          {slides.map((slide, i) => (
            <button
              key={slide.title}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show photo ${i + 1}: ${slide.title}`}
              aria-current={i === active}
              className={clsx(
                'h-2 rounded-full transition-all',
                i === active ? 'w-6 bg-white' : 'w-2 bg-white/50 hover:bg-white/80',
              )}
            />
          ))}
        </div>
      </div>

      {/* All captions share one grid cell so the card keeps the height of the longest one. */}
      <div className="absolute -bottom-6 left-4 right-4 grid rounded-2xl bg-white p-4 shadow-xl sm:left-auto sm:right-6 sm:w-80">
        {slides.map(({ icon: Icon, title, text }, i) => (
          <div
            key={title}
            aria-hidden={i !== active || undefined}
            className={clsx(
              'col-start-1 row-start-1 flex items-center gap-4 transition-opacity duration-1000',
              i === active ? 'opacity-100' : 'opacity-0',
            )}
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-copper-50 text-copper-600">
              <Icon className="h-7 w-7" />
            </span>
            <p className="text-sm">
              <span className="block font-display font-bold text-navy-900">{title}</span>
              {text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
