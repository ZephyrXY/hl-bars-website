'use client';

import clsx from 'clsx';
import { CheckIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useInquiry } from '@/app/ui/inquiry-context';

export default function AddToInquiryButton({
  productId,
  productName,
  compact = false,
}: {
  productId: string;
  productName: string;
  compact?: boolean;
}) {
  const { has, add, remove } = useInquiry();
  const added = has(productId);
  const Icon = added ? CheckIcon : PlusIcon;

  return (
    <button
      type="button"
      aria-pressed={added}
      aria-label={`${added ? 'Remove' : 'Add'} ${productName} ${added ? 'from' : 'to'} your inquiry`}
      title={added ? 'Click to remove from your inquiry' : undefined}
      onClick={() => (added ? remove(productId) : add(productId))}
      className={clsx(
        'inline-flex items-center justify-center gap-1.5 rounded-full font-semibold transition-colors',
        compact ? 'px-3 py-1 text-xs' : 'w-full px-5 py-2.5 text-sm',
        added
          ? 'bg-copper-50 text-copper-700 ring-1 ring-copper-300 hover:bg-copper-100'
          : 'bg-navy-800 text-white hover:bg-navy-700',
      )}
    >
      <Icon className={compact ? 'h-3.5 w-3.5' : 'h-4 w-4'} />
      {added ? (compact ? 'Added' : 'Added to inquiry') : compact ? 'Add' : 'Add to inquiry'}
    </button>
  );
}
