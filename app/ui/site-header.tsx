'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { PhoneIcon } from '@heroicons/react/24/solid';
import logo from '@/public/images/logo.png';
import { navLinks, site } from '@/app/lib/site';

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-20 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="HL Bars home">
          <Image src={logo} alt="" priority className="h-10 w-10 sm:h-14 sm:w-14" />
          <span className="leading-tight max-[420px]:hidden">
            <span className="block font-display text-lg font-extrabold tracking-tight text-navy-900 sm:text-xl">
              HL <span className="text-copper-500">BARS</span>
            </span>
            <span className="hidden text-xs font-medium text-slate-500 sm:block">
              {site.legalName}
            </span>
          </span>
        </Link>

        <nav className="flex items-center gap-0.5 sm:gap-2">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={clsx(
                  'whitespace-nowrap rounded-full px-2.5 py-2 text-sm font-semibold transition-colors sm:px-4',
                  active
                    ? 'bg-navy-50 text-navy-800'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-navy-800',
                )}
              >
                {link.name}
              </Link>
            );
          })}
          <a
            href={site.phoneHref}
            className="ml-2 hidden items-center gap-2 rounded-full bg-copper-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-copper-600 md:inline-flex"
          >
            <PhoneIcon className="h-4 w-4" />
            {site.phoneDisplay}
          </a>
        </nav>
      </div>
    </header>
  );
}
