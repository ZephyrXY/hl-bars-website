type IconProps = { className?: string };

export function FacebookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07Z" />
    </svg>
  );
}

export function MessengerIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 0C5.24 0 0 4.95 0 11.64c0 3.5 1.43 6.52 3.77 8.61.2.18.31.42.32.68l.07 2.13a.96.96 0 0 0 1.35.85l2.38-1.05c.2-.09.43-.1.64-.05 1.09.3 2.26.46 3.47.46 6.76 0 12-4.95 12-11.64S18.76 0 12 0Zm7.2 8.95-3.52 5.59a1.8 1.8 0 0 1-2.6.48l-2.8-2.1a.72.72 0 0 0-.87 0l-3.78 2.87c-.5.38-1.16-.22-.83-.76l3.52-5.59a1.8 1.8 0 0 1 2.6-.48l2.8 2.1c.26.2.61.2.87 0l3.78-2.87c.5-.38 1.16.22.83.76Z" />
    </svg>
  );
}
