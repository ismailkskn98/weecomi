"use client";

import OrbitingItems from "@/components/animata/list/orbiting-items";

export default function OrbitPanel({ labels = [] }) {
  const items = labels.map((label) => (
    <span key={label} className="font-heading text-[8px] font-semibold text-weecomi-dark-gray">
      {String(label).slice(0, 3)}
    </span>
  ));

  return (
    <OrbitingItems
      items={items}
      center={<span className="font-heading text-[10px] font-semibold text-weecomi-orange">WEE</span>}
      backgroundClassName="bg-transparent"
      containerClassName="min-h-[300px] py-6 md:min-h-[340px]"
    />
  );
}
