'use client';

import BreadCrumbs, { BreadCrumbItem } from '@/components/Common/Breadcrumbs';
import ReservationSection from '@/components/Reservations/ReservationSection';

export default function ReservationsPage() {
    const breadcrumbItems: BreadCrumbItem[] = [
        { name: 'Home', href: '/beranda' },
        { name: 'Reservations', disabled: true },
    ];

    return (
        <div className="space-y-6">
            <BreadCrumbs
                items={breadcrumbItems}
                title="Reservations Management"
                description="View and manage all villa bookings and guest stays."
            />

            <ReservationSection />
        </div>
    );
}
