import { Images, LayoutDashboard, Mail, Newspaper, ImageIcon } from "lucide-react";

export const adminNavItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/gallery", label: "Galeri", icon: Images },
  { href: "/admin/news", label: "Haberler", icon: Newspaper },
  { href: "/admin/contact", label: "İletişim", icon: Mail },
  { href: "/admin/media", label: "Medya", icon: ImageIcon },
];
