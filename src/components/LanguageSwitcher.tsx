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
      className="flex items-center gap-0.5 rounded-full border border-white/15 bg-black/15 p-0.5 font-mono text-[0.65rem]"
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
                ? "rounded-full bg-[var(--accent-color)] px-2.5 py-1 font-semibold tracking-wider text-[var(--accent-text)] uppercase"
                : "rounded-full px-2.5 py-1 tracking-wider text-white/60 uppercase transition hover:text-[var(--accent-color)]"
            }
          >
            {localeLabels[locale]}
          </button>
        );
      })}
    </div>
  );
}
