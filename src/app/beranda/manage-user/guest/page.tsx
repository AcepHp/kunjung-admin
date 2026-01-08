'use client';

import BreadCrumbs, { BreadCrumbItem } from '@/components/Common/Breadcrumbs';
import UserGuestSection from '@/components/UserGuest/UserGuestSection';

export default function GuestPage() {
    const breadcrumbItems: BreadCrumbItem[] = [
        { name: 'Home', href: '/beranda' },
        { name: 'Manage User', disabled: true },
        { name: 'Guest Data', disabled: true },
    ];

    return (
        <div className="space-y-6">
            <BreadCrumbs
                items={breadcrumbItems}
                title="Guest Management"
                description="View and manage all registered guests in the Kunjung ecosystem."
            />

            <UserGuestSection />
        </div>
    );
}
