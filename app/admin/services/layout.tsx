import type React from "react";
import { AdminSidebar } from "@/components/admin-sidebar";

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#0E0E0E]">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto pt-16 md:pt-0">
        <div className="container mx-auto p-4 sm:p-8">{children}</div>
      </main>
    </div>
  );
}
