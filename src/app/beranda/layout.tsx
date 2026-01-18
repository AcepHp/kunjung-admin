"use client";

import SidebarLayout from "@/components/Sidebar/SidebarLayout";
import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";

export default function DashboardGroupLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <SessionProvider>
            <SidebarLayout>{children}</SidebarLayout>
        </SessionProvider>
    );
}
