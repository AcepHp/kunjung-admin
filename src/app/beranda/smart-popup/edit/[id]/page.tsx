'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import BreadCrumbs, { BreadCrumbItem } from '@/components/Common/Breadcrumbs';
import SmartPopupForm from '@/components/SmartPopup/SmartPopupForm';

export default function SmartPopupEditPage() {
    const params = useParams();
    const id = params.id as string;

    const breadcrumbItems: BreadCrumbItem[] = [
        { name: 'Home', href: '/beranda' },
        { name: 'Smart Pop Up', href: '/beranda/smart-popup' },
        { name: 'Edit Popup', disabled: true },
    ];

    return (
        <div className="space-y-12 pb-20">
            <BreadCrumbs
                items={breadcrumbItems}
                title="Edit Smart Pop Up"
                description="Update the visual content and behavior of your global promotional popup."
            />

            <SmartPopupForm />
        </div>
    );
}
