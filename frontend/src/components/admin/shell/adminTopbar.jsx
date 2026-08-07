"use client";

import { LogOut, Menu } from "lucide-react";

export default function AdminTopbar({ user, onMenuClick, onLogout, isLoggingOut }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur lg:px-8">
      <button type="button" className="rounded-lg border border-slate-200 p-2 lg:hidden" onClick={onMenuClick}>
        <Menu size={18} />
      </button>
      <div className="ml-auto flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-semibold text-slate-700">{user?.name}</p>
          <p className="text-xs text-slate-500">{user?.role}</p>
        </div>
        <button
          type="button"
          onClick={onLogout}
          disabled={isLoggingOut}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600"
        >
          <LogOut size={16} />
          Çıkış
        </button>
      </div>
    </header>
  );
}
