'use client';

import BreadCrumbs, { BreadCrumbItem } from '@/components/Common/Breadcrumbs';
import HomeOwnerSection from '@/components/HomeOwner/HomeOwnerSection';

export default function HomeOwnerPage() {
    const breadcrumbItems: BreadCrumbItem[] = [
        { name: 'Home', href: '/beranda' },
        { name: 'Manage User', disabled: true },
        { name: 'Home Owner Data', disabled: true },
    ];

    return (
        <div className="space-y-6">
            <BreadCrumbs
                items={breadcrumbItems}
                title="Home Owner Management"
                description="View and manage all registered home owners in the Kunjung ecosystem."
            />

            <HomeOwnerSection />
        </div>
    );
}
