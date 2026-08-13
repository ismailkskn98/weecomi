"use client";

import { useState } from "react";
import { useReducedMotion } from "motion/react";
import FaqCard from "./faq-card";

export default function FaqList({ items = [] }) {
  const reduceMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState(0);
  const faqItems = Array.isArray(items) ? items : [];

  return (
    <div className="grid items-start gap-3 md:grid-cols-2 md:gap-4">
      {faqItems.map((item, index) => (
        <FaqCard
          key={item.q}
          item={item}
          open={openIndex === index}
          onToggle={() => setOpenIndex((current) => (current === index ? null : index))}
          reduceMotion={reduceMotion}
        />
      ))}
    </div>
  );
}
