"use client";

import { usePathname, useRouter } from "next/navigation";
import { locales, localeLabels, type Locale } from "@/lib/i18n/config";

const COOKIE_NAME = "Q2METHODS_LOCALE";

type Props = { current: Locale; label: string };

function swapLocaleInPath(pathname: string, target: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return `/${target}`;
  segments[0] = target;
  return `/${segments.join("/")}`;
}

function persistLocaleCookie(target: Locale) {
  document.cookie = `${COOKIE_NAME}=${target}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
}

export function LanguageSwitcher({ current, label }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  function selectLocale(target: Locale) {
    if (target === current) return;
    persistLocaleCookie(target);
    const nextPath = swapLocaleInPath(pathname, target);
    router.push(nextPath);
    router.refresh();
  }

  return (
    <div
      role="group"
      aria-label={label}
      className="flex items-center gap-1 rounded-full border border-white/15 bg-[var(--navbar-bg)] px-1 py-0.5 text-xs font-semibold"
    >
      {locales.map((locale) => {
        const isActive = locale === current;
        return (
          <button
            key={locale}
            type="button"
            onClick={() => selectLocale(locale)}
            aria-pressed={isActive}
            className={
              isActive
                ? "rounded-full bg-[var(--accent-color)] px-2.5 py-0.5 text-[var(--accent-text)]"
                : "rounded-full px-2.5 py-0.5 text-[var(--secondary-text)] transition hover:text-[var(--accent-color)]"
            }
          >
            {localeLabels[locale]}
          </button>
        );
      })}
    </div>
  );
}
