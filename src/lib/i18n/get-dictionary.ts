import "server-only";
import type { Locale } from "./config";
import type { Dictionary } from "./types";

const dictionaries = {
  de: () => import("./dictionaries/de").then((m) => m.de),
  en: () => import("./dictionaries/en").then((m) => m.en),
} as const;

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
