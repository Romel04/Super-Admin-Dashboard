// components/LayoutProvider.jsx
"use client";

import { useAuth } from "@/lib/auth";
import { usePathname } from "next/navigation";
import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

export function LayoutProvider({ children }) {
  const { user } = useAuth();
  const pathname = usePathname();
  const [isSidebarVisible, setSidebarVisible] = useState(false); // State for sidebar visibility
  const [isCollapsed, setCollapsed] = useState(false); // State for collapsing

  const toggleSidebar = () => setSidebarVisible(!isSidebarVisible); // Toggle function
  const toggleCollapse = () => setCollapsed(!isCollapsed); // Collapse function

  if (pathname === "/") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {user && (
        <>
          <Header toggleSidebar={toggleSidebar} />
          <div className="flex flex-1">
            {isSidebarVisible && (
              <>
                <Sidebar isCollapsed={isCollapsed} /> {/* Pass isCollapsed prop */}
                <button onClick={toggleCollapse} className="absolute top-0 right-0 m-2">
                  {isCollapsed ? <ChevronRight /> : <ChevronDown />}
                </button>
              </>
            )}
            <main className="flex-1 p-6 overflow-auto bg-background">
              {children}
            </main>
          </div>
        </>
      )}
      {!user && <>{children}</>}
    </div>
  );
}
