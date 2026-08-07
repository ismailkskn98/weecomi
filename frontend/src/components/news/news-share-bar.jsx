"use client";

import { useEffect, useState } from "react";
import { Check, Link2 } from "lucide-react";
import { useTranslations } from "next-intl";

function XIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedinIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function FacebookIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
  );
}

export default function NewsShareBar({ title }) {
  const t = useTranslations("News");
  const [copied, setCopied] = useState(false);
  const [pageUrl, setPageUrl] = useState("");

  useEffect(() => {
    setPageUrl(window.location.href);
  }, []);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(pageUrl || window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  }

  const encodedUrl = encodeURIComponent(pageUrl);
  const shareTitle = encodeURIComponent(title || "");

  const buttonClass =
    "inline-flex size-9 items-center justify-center rounded-full border border-black/[0.08] text-weecomi-dark-gray transition hover:border-weecomi-orange hover:text-weecomi-orange";

  return (
    <div className="flex items-center gap-2" role="group" aria-label={t("shareLabel")}>
      <button type="button" onClick={copyLink} className={buttonClass} aria-label={t("copyLink")}>
        {copied ? <Check className="h-4 w-4 text-weecomi-orange" /> : <Link2 className="h-4 w-4" />}
      </button>
      <a
        href={pageUrl ? `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` : "#"}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClass}
        aria-label="LinkedIn"
        onClick={(event) => {
          if (!pageUrl) event.preventDefault();
        }}
      >
        <LinkedinIcon className="h-4 w-4" />
      </a>
      <a
        href={pageUrl ? `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${shareTitle}` : "#"}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClass}
        aria-label="X"
        onClick={(event) => {
          if (!pageUrl) event.preventDefault();
        }}
      >
        <XIcon className="h-3.5 w-3.5" />
      </a>
      <a
        href={pageUrl ? `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` : "#"}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClass}
        aria-label="Facebook"
        onClick={(event) => {
          if (!pageUrl) event.preventDefault();
        }}
      >
        <FacebookIcon className="h-4 w-4" />
      </a>
    </div>
  );
}
