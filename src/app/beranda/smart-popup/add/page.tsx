'use client';

import BreadCrumbs, { BreadCrumbItem } from '@/components/Common/Breadcrumbs';
import SmartPopupForm from '@/components/SmartPopup/SmartPopupForm';

export default function SmartPopupAddPage() {
    const breadcrumbItems: BreadCrumbItem[] = [
        { name: 'Home', href: '/beranda' },
        { name: 'Smart Pop Up', href: '/beranda/smart-popup' },
        { name: 'Add New', disabled: true },
    ];

    return (
        <div className="space-y-12 pb-20">
            <BreadCrumbs
                items={breadcrumbItems}
                title="Create Smart Pop Up"
                description="Design and publish a new marketing popup for your platform."
            />

            <SmartPopupForm />
        </div>
    );
}
