"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "@/app/components/Sidebar";
import { isAuthenticated } from "@/app/lib/session";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const checkSession = () => {
      if (pathname === "/login") {
        setReady(true);
        return;
      }

      if (!isAuthenticated()) {
        router.replace("/login");
        return;
      }

      setReady(true);
    };

    checkSession();
  }, [pathname, router]);

  if (!ready) return null;

  const hideSidebarRoutes = ["/login"];
  const showSidebar = !hideSidebarRoutes.includes(pathname);

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        overflow: "hidden", // prevent sidebar from scrolling
      }}
    >
      {showSidebar && (
        <div
          style={{
            flexShrink: 0,
            width: "260px", // adjust width as per your Sidebar
            height: "100vh",
            overflow: "hidden", // Sidebar should never scroll
            position: "sticky",
            top: 0,
          }}
        >
          <Sidebar />
        </div>
      )}

      <main
        style={{
          flex: 1,
          height: "100vh",
          overflowY: "auto", // only main content scrolls
          padding: "1.5rem",
        }}
      >
        {children}
      </main>
    </div>
  );
}
