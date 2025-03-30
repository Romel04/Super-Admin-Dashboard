// components/dashboard/Sidebar.jsx
"use client";

import { useState } from "react"; // Import useState
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  School,
  Settings,
  Users,
  FileText,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const mainNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "School Subscriptions",
    href: "/dashboard/school-subscriptions",
    icon: School,
  },
  {
    title: "Users",
    href: "/dashboard/users",
    icon: Users,
  },
  {
    title: "Reports",
    href: "/dashboard/reports",
    icon: FileText,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function Sidebar({ isCollapsed }) { // Accept isCollapsed as prop
  const pathname = usePathname();
  
  return (
    <div className={`w-${isCollapsed ? '16' : '64'} border-r bg-background flex-shrink-0 h-[calc(100vh-4rem)] overflow-y-auto`}>
      <div className="py-4 space-y-2">
        <div className="px-3 pb-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Menu</h2>
          <div className="space-y-1">
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center px-4 py-2 text-sm font-medium rounded-md",
                  pathname === item.href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                )}
              >
                {!isCollapsed && <item.icon className="h-5 w-5 mr-2" />}
                {!isCollapsed && item.title}
              </Link>
            ))}
          </div>
        </div>
      {/* <div className="py-4 space-y-2">
        <div className="px-3 pb-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Menu
          </h2>
          <div className="space-y-1">
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center px-4 py-2 text-sm font-medium rounded-md",
                  pathname === item.href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                )}
              >
                <item.icon className="h-5 w-5 mr-2" />
                {item.title}
              </Link>
            ))}
          </div>
        </div>

        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Advanced
          </h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="reports" className="border-0">
              <AccordionTrigger className="py-2 px-4 hover:no-underline hover:bg-primary/5 rounded-md">
                <div className="flex items-center text-sm text-muted-foreground">
                  <FileText className="h-5 w-5 mr-2" />
                  <span>Reports</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="pl-9 space-y-1">
                  <Link
                    href="/dashboard/reports/subscriptions"
                    className="block py-2 px-4 text-sm rounded-md hover:bg-primary/5"
                  >
                    Subscription Reports
                  </Link>
                  <Link
                    href="/dashboard/reports/revenue"
                    className="block py-2 px-4 text-sm rounded-md hover:bg-primary/5"
                  >
                    Revenue Reports
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div> */}
    </div>
    </div>
  );
}