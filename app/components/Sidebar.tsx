"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Percent,
  ShoppingBag,
  LogOut,
} from "lucide-react";

import Logo from "../../public/logo3.png";

const menuItems = [
  { name: "Dashboard", icon: <LayoutDashboard size={20} />, href: "/dashboard" },
  { name: "Products", icon: <Package size={20} />, href: "/products" },
  { name: "Markup", icon: <Percent size={20} />, href: "/markup" },
  { name: "Orders", icon: <ShoppingBag size={20} />, href: "/orders" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div>
        <div className="sidebar-logo">
          <img src={Logo.src} alt="Logo" className="h-8 w-auto" />
        </div>

        {/* Menu Links */}
        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`sidebar-link ${isActive ? "active" : ""}`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout Button */}
      <div className="sidebar-footer">
        <button className="logout-btn">
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
