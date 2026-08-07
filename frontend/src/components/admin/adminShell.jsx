"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAdminMe, logoutAdmin } from "@/lib/api/auth";
import AdminLoadingState from "./shell/adminLoadingState";
import AdminSidebar from "./shell/adminSidebar";
import AdminTopbar from "./shell/adminTopbar";

export default function AdminShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    getAdminMe()
      .then(setUser)
      .catch(() => {
        router.replace("/admin/login");
      })
      .finally(() => setIsLoading(false));
  }, [router]);

  async function handleLogout() {
    setIsLoggingOut(true);
    await logoutAdmin().catch(() => {});
    router.replace("/admin/login");
  }

  if (isLoading) return <AdminLoadingState />;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#eef4f8] text-slate-800">
      <AdminSidebar
        isLoggingOut={isLoggingOut}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onLogout={handleLogout}
        pathname={pathname}
        user={user}
      />
      <div className="lg:pl-72">
        <AdminTopbar
          isLoggingOut={isLoggingOut}
          onLogout={handleLogout}
          onMenuClick={() => setIsSidebarOpen(true)}
          user={user}
        />
        <main className="px-4 py-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
