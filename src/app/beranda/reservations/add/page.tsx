'use client';

import BreadCrumbs from '@/components/Common/Breadcrumbs';
import AddReservationForm from '@/components/Reservations/AddReservationForm';

export default function AddManualBookingPage() {
    return (
        <div className="space-y-8 pb-20 max-w-full mx-auto">
            <BreadCrumbs
                items={[
                    { name: 'Dashboard', href: '/beranda' },
                    { name: 'Reservations', href: '/beranda/reservations' },
                    { name: 'Add Manual Booking', disabled: true },
                ]}
                title="Add Manual Booking"
                description="Manually record a booking from external sources or walk-ins."
            />

            <AddReservationForm />
        </div>
    );
}
