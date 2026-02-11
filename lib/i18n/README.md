# I18n Extension Checklist

This project uses path-localized routes (example: `/id`, `/en`) and a locale registry in `lib/i18n/config.ts`.

## Add a new language

1. Add the locale code to `LOCALES` in `lib/i18n/config.ts`.
2. Add metadata in `LOCALE_META` (label, short label, flag icon path, enabled).
3. Add a dictionary file in `lib/i18n/messages/` and export it.
4. Register the dictionary in `components/i18n/LocaleProvider.tsx`.
5. Add a flag icon under `public/images/flags/`.
6. Add static route generation support by ensuring `generateStaticParams` includes the new locale.
7. Verify all dictionary keys match `Messages` type.
8. Run `bun run lint` and `bun run build`.

## Behavior order

Locale selection priority:
1. Saved preference
2. Browser language
3. Default fallback locale

## Notes

- Missing locale dictionary entries should fall back to default locale at runtime.
- Slugs are language-neutral in phase 1.
