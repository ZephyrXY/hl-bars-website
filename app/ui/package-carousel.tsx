'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import promoSolax from '@/public/images/promo-solax-packages.jpg';
import promoHlPower from '@/public/images/promo-hl-power-11kw.jpg';
import promoXtriple from '@/public/images/promo-xtriple-tiers.jpg';
import promoSolaxLuxpower from '@/public/images/promo-solax-luxpower.jpg';

const slides = [
  {
    src: promoSolax,
    alt: 'Essential Hybrid 6kW package for ₱282,000 and Ultimate Heavy Duty 6kW package for ₱357,000',
  },
  {
    src: promoHlPower,
    alt: 'HL Power 11kW all-in package for ₱355,000',
  },
  {
    src: promoXtriple,
    alt: 'X Triple Power packages: Tier 1 for ₱405,000, Tier 2 for ₱621,000 and Tier 3 for ₱720,000',
  },
  {
    src: promoSolaxLuxpower,
    alt: 'SolaX Power hybrid systems in 6kW, 8kW, 10kW and 12kW with a 16.8kWh high-voltage battery, and Luxpower Tek 2nd Gen hybrid inverters in 6kW and 12kW',
  },
];

/**
 * The slides are rendered three times so the carousel can loop: the visitor
 * always sees the middle copy, and when they scroll into the first or last
 * copy we jump back to the same slide in the middle copy without animating.
 */
const copies = [0, 1, 2];
const loop = copies.flatMap((copy) => slides.map((slide, i) => ({ ...slide, copy, i })));

/** Endless swipeable carousel of the solar package promo graphics. */
export default function PackageCarousel() {
  const trackRef = useRef<HTMLUListElement>(null);
  /** Index into `loop` of the slide closest to the center. */
  const currentRef = useRef(slides.length);
  const [active, setActive] = useState(0);

  const center = (index: number, behavior: ScrollBehavior) => {
    const track = trackRef.current;
    const slide = track?.children[index] as HTMLElement | undefined;
    if (!track || !slide) return;
    track.scrollTo({
      left: slide.offsetLeft - (track.clientWidth - slide.offsetWidth) / 2,
      behavior,
    });
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Start on the first slide of the middle copy.
    center(slides.length, 'instant');

    const closestToCenter = () => {
      const middle = track.scrollLeft + track.clientWidth / 2;
      let closest = 0;
      let closestDistance = Infinity;
      Array.from(track.children).forEach((child, i) => {
        const el = child as HTMLElement;
        const distance = Math.abs(el.offsetLeft + el.offsetWidth / 2 - middle);
        if (distance < closestDistance) {
          closest = i;
          closestDistance = distance;
        }
      });
      return closest;
    };

    // Once scrolling stops, move back into the middle copy if needed.
    let settleTimer: ReturnType<typeof setTimeout>;
    const settle = () => {
      const index = currentRef.current;
      if (index < slides.length || index >= slides.length * 2) {
        const offset = index < slides.length ? slides.length : -slides.length;
        const from = track.children[index] as HTMLElement;
        const to = track.children[index + offset] as HTMLElement;
        track.scrollTo({ left: track.scrollLeft + to.offsetLeft - from.offsetLeft, behavior: 'instant' });
        currentRef.current = index + offset;
      }
    };

    const onScroll = () => {
      currentRef.current = closestToCenter();
      setActive(currentRef.current % slides.length);
      clearTimeout(settleTimer);
      settleTimer = setTimeout(settle, 150);
    };
    // Re-center if the window is resized.
    const onResize = () => center(currentRef.current, 'instant');

    track.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      clearTimeout(settleTimer);
      track.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const move = (delta: number) => center(currentRef.current + delta, 'smooth');

  const arrowClass =
    'absolute top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white/90 p-3 text-navy-900 shadow-lg ring-1 ring-slate-200 transition hover:bg-white sm:block';

  return (
    <div className="relative" role="region" aria-roledescription="carousel" aria-label="Solar packages">
      <ul
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {loop.map((slide) => {
          const duplicate = slide.copy !== 1;
          return (
            <li
              key={`${slide.copy}-${slide.i}`}
              aria-hidden={duplicate || undefined}
              aria-roledescription={duplicate ? undefined : 'slide'}
              aria-label={duplicate ? undefined : `${slide.i + 1} of ${slides.length}`}
              className={clsx(
                'shrink-0 snap-center transition-opacity duration-300',
                slide.i !== active && 'opacity-60',
              )}
            >
              <a
                href={slide.src.src}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={duplicate ? -1 : undefined}
                className="block overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200"
              >
                <Image
                  src={slide.src}
                  alt={duplicate ? '' : slide.alt}
                  placeholder="blur"
                  sizes="(min-width: 640px) 28rem, 85vw"
                  className="h-auto max-h-[38rem] w-[85vw] object-contain sm:h-[38rem] sm:w-auto"
                />
              </a>
            </li>
          );
        })}
      </ul>

      <button
        type="button"
        onClick={() => move(-1)}
        aria-label="Previous package"
        className={clsx(arrowClass, 'left-2 lg:left-8')}
      >
        <ChevronLeftIcon className="h-6 w-6" />
      </button>
      <button
        type="button"
        onClick={() => move(1)}
        aria-label="Next package"
        className={clsx(arrowClass, 'right-2 lg:right-8')}
      >
        <ChevronRightIcon className="h-6 w-6" />
      </button>

      <div className="mt-6 flex justify-center gap-2">
        {slides.map((slide, i) => (
          <button
            key={slide.src.src}
            type="button"
            onClick={() => center(slides.length + i, 'smooth')}
            aria-label={`Show package ${i + 1}`}
            aria-current={i === active}
            className={clsx(
              'h-2.5 rounded-full transition-all',
              i === active ? 'w-8 bg-copper-500' : 'w-2.5 bg-slate-300 hover:bg-slate-400',
            )}
          />
        ))}
      </div>
    </div>
  );
}
