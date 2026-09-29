# HL Bars Website

Website for **HL Bars (HL Builders and Related Services)**, which does roofing and solar supply and installation in Ormoc City and Naval, Biliran.

It has two pages:

- **Home** (`app/page.tsx`)
- **Contact Us** (`app/contact/page.tsx`)

## Run it locally

```bash
pnpm install
pnpm dev
```

Then open http://localhost:3000.

## Where to change things

| What | File |
| --- | --- |
| Phone, Facebook, Messenger, hours, address | `app/lib/site.ts` |
| Header / footer | `app/ui/site-header.tsx`, `app/ui/site-footer.tsx` |
| Contact inquiry form | `app/ui/inquiry-form.tsx` |
| Photos | `public/images/` |
| Brand colors | `tailwind.config.ts` |
| Monetag service worker | `public/sw.js` |

Built with Next.js, React and Tailwind CSS.
