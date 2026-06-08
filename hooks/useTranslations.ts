"use client";

import { useLocale } from "@/components/i18n/LocaleProvider";
import type { Translations } from "@/lib/i18n/translations";

export function useTranslations(): Translations {
  return useLocale().t;
}
