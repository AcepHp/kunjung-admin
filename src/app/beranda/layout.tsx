import SidebarLayout from "@/components/Sidebar/SidebarLayout";
import type { ReactNode } from "react";

export default function DashboardGroupLayout({
    children,
}: {
    children: ReactNode;
}) {
    return <SidebarLayout>{children}</SidebarLayout>;
}
