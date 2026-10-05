'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline';
import { useInquiry } from '@/app/ui/inquiry-context';

/** Floating button that links to the contact form once something is in the inquiry list. */
export default function InquiryFab() {
  const { count } = useInquiry();
  const pathname = usePathname();

  if (count === 0 || pathname === '/contact') return null;

  return (
    <Link
      href="/contact#inquiry"
      className="fixed bottom-4 right-4 z-50 inline-flex items-center gap-2 rounded-full bg-copper-500 px-5 py-3 font-semibold text-white shadow-xl shadow-navy-900/20 transition-colors hover:bg-copper-600 sm:bottom-6 sm:right-6"
    >
      <ClipboardDocumentListIcon className="h-5 w-5" />
      Send inquiry
      <span className="rounded-full bg-white px-2 py-0.5 text-xs font-bold text-copper-700">
        {count}
      </span>
    </Link>
  );
}
