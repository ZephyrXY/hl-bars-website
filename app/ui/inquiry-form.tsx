'use client';

import { useState } from 'react';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import { site } from '@/app/lib/site';
import { MessengerIcon } from '@/app/ui/brand-icons';

const services = ['Roofing', 'Solar power system', 'Roofing and solar', 'Other'];

export default function InquiryForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [service, setService] = useState(services[0]);
  const [details, setDetails] = useState('');
  const [status, setStatus] = useState<string | null>(null);

  const message = [
    `Hi HL Bars! I'd like to inquire about: ${service}.`,
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
          <select value={service} onChange={(e) => setService(e.target.value)} className={inputClass}>
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
