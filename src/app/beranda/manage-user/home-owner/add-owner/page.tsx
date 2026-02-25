'use client';

import BreadCrumbs, { BreadCrumbItem } from '@/components/Common/Breadcrumbs';
import AddHomeOwnerForm from '@/components/HomeOwner/AddHomeOwnerForm';

export default function AddHomeOwnerPage() {
    const breadcrumbItems: BreadCrumbItem[] = [
        { name: 'Home', href: '/beranda' },
        { name: 'Manage User', disabled: true },
        { name: 'Home Owner', href: '/beranda/manage-user/home-owner' },
        { name: 'Add Owner', disabled: true },
    ];

    const handleAddOwner = (owner: any) => {
        // In a real application, this would save to a database
        // For now, we'll just navigate back after the form handles it
        console.log('New owner added:', owner);
    };

    return (
        <div className="space-y-6">
            <BreadCrumbs
                items={breadcrumbItems}
                title="Add Home Owner"
                description="Register a new property owner in the Kunjung ecosystem."
            />

            <AddHomeOwnerForm onAdd={handleAddOwner} />
        </div>
    );
}
