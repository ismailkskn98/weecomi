"use client";

import Link from "next/link";
import { LogOut, X } from "lucide-react";
import { adminNavItems } from "./navItems";
import { cn } from "@/lib/utils";

export default function AdminSidebar({ isOpen, onClose, pathname, user, onLogout, isLoggingOut }) {
  return (
    <>
      <div
        className={cn("fixed inset-0 z-40 bg-black/40 lg:hidden", isOpen ? "block" : "hidden")}
        onClick={onClose}
      />
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200 bg-white transition-transform lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <p className="text-xs font-bold uppercase text-[#346C92]">WeeComi</p>
            <p className="text-sm font-semibold text-slate-700">Admin Panel</p>
          </div>
          <button type="button" className="rounded-lg p-1 lg:hidden" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 p-3">
          {adminNavItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition",
                  active ? "bg-[#346C92] text-white" : "text-slate-600 hover:bg-slate-100",
                )}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-slate-200 p-4">
          <p className="text-sm font-semibold text-slate-700">{user?.name}</p>
          <p className="text-xs text-slate-500">{user?.email}</p>
          <button
            type="button"
            onClick={onLogout}
            disabled={isLoggingOut}
            className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-red-600"
          >
            <LogOut size={16} />
            {isLoggingOut ? "Çıkış..." : "Çıkış yap"}
          </button>
        </div>
      </aside>
    </>
  );
}
