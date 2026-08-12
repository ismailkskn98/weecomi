"use client";

import { InfinitySpin } from "react-loader-spinner";
import { useTranslations } from "next-intl";

export default function LoadingSpinner() {
  const t = useTranslations("Loading");

  return (
    <div className="loading-infinity">
      <span className="sr-only">{t("ariaLabel")}</span>
      <InfinitySpin width="180" color="#346C92" ariaLabel={t("ariaLabel")} />
    </div>
  );
}
