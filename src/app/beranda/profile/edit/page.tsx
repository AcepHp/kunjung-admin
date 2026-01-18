import React from "react";
import EditProfileForm from "@/components/Profile/EditProfileForm";
import BreadCrumbs, { BreadCrumbItem } from "@/components/Common/Breadcrumbs";

export default function EditProfilePage() {
    const breadcrumbItems: BreadCrumbItem[] = [
        { name: "Dashboard", href: "/beranda" },
        { name: "Edit Profile", disabled: true },
    ];

    return (
        <div className="max-w-9xl mx-auto">
            {/* Breadcrumbs */}
            <BreadCrumbs
                items={breadcrumbItems}
                title="Edit Profile"
                description="Update your personal information and manage your account settings"
            />

            {/* Profile Form */}
            <div className="mt-6">
                <EditProfileForm />
            </div>
        </div>
    );
}
