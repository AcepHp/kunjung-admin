'use client';

import VillaForm from '@/components/Property/VillaForm';
import BreadCrumbs from '@/components/Common/Breadcrumbs';

export default function AddVillaPage() {
    const defaultCategory = { id: 'stay', name: 'Stay', subCategory: '', item: null };

    return (
        <div className="space-y-8 w-full max-w-full mx-auto pb-20">
            <BreadCrumbs
                items={[
                    { name: 'Dashboard', href: '/beranda' },
                    { name: 'Manage Property', href: '/beranda/manage-property' },
                    { name: 'Add Property', disabled: true },
                ]}
                title="Add New Property"
                description="Fill in the details for your new listing."
            />

            <VillaForm
                initialCategory={defaultCategory}
            />
        </div>
    );
}
