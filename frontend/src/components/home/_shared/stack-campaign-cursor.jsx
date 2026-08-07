"use client";

import CursorTracker from "@/components/animata/container/cursor-tracker";

/** Thin client island — keeps StackCampaignCard itself a Server Component. */
export default function StackCampaignCursor({ label, labelClassName, children }) {
  return (
    <CursorTracker label={label} labelClassName={labelClassName} className="block">
      {children}
    </CursorTracker>
  );
}
