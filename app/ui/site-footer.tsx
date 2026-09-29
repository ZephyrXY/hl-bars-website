import Image from 'next/image';
import Link from 'next/link';
import { ClockIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline';
import logo from '@/public/images/logo.png';
import { navLinks, site } from '@/app/lib/site';
import { FacebookIcon, MessengerIcon } from '@/app/ui/brand-icons';

export default function SiteFooter() {
  return (
    <footer className="bg-navy-950 text-navy-100">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <Link href="/" className="inline-flex items-center gap-3">
            <Image src={logo} alt="" className="h-14 w-14" />
            <span>
              <span className="block font-display text-xl font-extrabold text-white">
                HL <span className="text-copper-400">BARS</span>
              </span>
              <span className="text-sm text-navy-100/70">{site.legalName}</span>
            </span>
          </Link>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-navy-100/70">
            Roofing and solar supply and installation, from the first site
            visit to after-sales support. Serving {site.branches.join(' and ')}.
          </p>
          <nav className="mt-6 flex gap-5 text-sm font-semibold">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-copper-300">
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <h2 className="font-display text-sm font-bold uppercase tracking-wider text-white">
            Get in touch
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href={site.phoneHref} className="flex items-center gap-3 hover:text-copper-300">
                <PhoneIcon className="h-5 w-5 shrink-0 text-copper-400" />
                <span>
                  <span className="text-navy-100/60">Contact Us:</span>{' '}
                  {site.phone}
                </span>
              </a>
            </li>
            <li>
              <a
                href={site.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-copper-300"
              >
                <FacebookIcon className="h-5 w-5 shrink-0 text-copper-400" />
                <span>
                  <span className="text-navy-100/60">Facebook:</span>{' '}
                  facebook.com/coloredroofing
                </span>
              </a>
            </li>
            <li>
              <a
                href={site.messenger}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-copper-300"
              >
                <MessengerIcon className="h-5 w-5 shrink-0 text-copper-400" />
                <span>
                  <span className="text-navy-100/60">Messenger:</span>{' '}
                  m.me/coloredroofing
                </span>
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-display text-sm font-bold uppercase tracking-wider text-white">
            Business hours
          </h2>
          <p className="mt-4 flex gap-3 text-sm">
            <ClockIcon className="h-5 w-5 shrink-0 text-copper-400" />
            <span>
              Opens from {site.hours}
              <br />
              {site.days}
            </span>
          </p>
          <p className="mt-4 flex gap-3 text-sm">
            <MapPinIcon className="h-5 w-5 shrink-0 text-copper-400" />
            <span>{site.address}</span>
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-4 py-5 text-xs text-navy-100/50 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} HL Bars · {site.legalName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
