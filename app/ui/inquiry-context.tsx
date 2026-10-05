'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { findProduct } from '@/app/lib/products';

export type InquiryItem = { id: string; qty: number };

type InquiryContextValue = {
  items: InquiryItem[];
  count: number;
  has: (id: string) => boolean;
  add: (id: string) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
};

const STORAGE_KEY = 'hl-bars-inquiry';
const InquiryContext = createContext<InquiryContextValue | null>(null);

function load(): InquiryItem[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    if (!Array.isArray(parsed)) return [];
    // Drop anything no longer in the catalog.
    return parsed.filter(
      (item): item is InquiryItem =>
        typeof item?.id === 'string' && Number.isInteger(item?.qty) && !!findProduct(item.id),
    );
  } catch {
    return [];
  }
}

export function InquiryProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<InquiryItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setItems(load());
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Storage unavailable (private mode etc.); the list still works for this visit.
    }
  }, [items, loaded]);

  const has = useCallback((id: string) => items.some((item) => item.id === id), [items]);
  const add = useCallback(
    (id: string) =>
      setItems((prev) => (prev.some((item) => item.id === id) ? prev : [...prev, { id, qty: 1 }])),
    [],
  );
  const remove = useCallback(
    (id: string) => setItems((prev) => prev.filter((item) => item.id !== id)),
    [],
  );
  const setQty = useCallback(
    (id: string, qty: number) =>
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, qty: Math.max(1, Math.floor(qty) || 1) } : item)),
      ),
    [],
  );
  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(
    () => ({ items, count: items.length, has, add, remove, setQty, clear }),
    [items, has, add, remove, setQty, clear],
  );

  return <InquiryContext.Provider value={value}>{children}</InquiryContext.Provider>;
}

export function useInquiry() {
  const context = useContext(InquiryContext);
  if (!context) throw new Error('useInquiry must be used inside <InquiryProvider>');
  return context;
}
