import React from 'react';
import BreadCrumbs, {
    BreadCrumbItem,
} from '@/components/Common/Breadcrumbs';
import VillaSection from "@/components/Property/VillaSection";
import { villas } from '@/data/villas';

export default function ManageVillaPage() {
    const breadcrumbItems: BreadCrumbItem[] = [
        { name: 'Home', href: '/beranda' },
        { name: 'Properties', disabled: true },
    ];

    const totalProperties = villas.length;
    // Calculate average rating safely
    const averageRating = villas.length > 0
        ? (villas.reduce((acc, v) => acc + v.rating, 0) / villas.length).toFixed(1)
        : "0.0";

    return (
        <div className="space-y-8">
            {/* Breadcrumb */}
            <BreadCrumbs
                items={breadcrumbItems}
                title="Manage Properties"
                description="Manage your property listings, prices, and availability"
            />

            <VillaSection />
        </div>
    );
}
