'use client';

import BreadCrumbs, { BreadCrumbItem } from '@/components/Common/Breadcrumbs';
import SmartPopupSection from '@/components/SmartPopup/SmartPopupSection';

export default function SmartPopupPage() {
    const breadcrumbItems: BreadCrumbItem[] = [
        { name: 'Home', href: '/beranda' },
        { name: 'Smart Pop Up', disabled: true },
    ];

    return (
        <div className="space-y-12 pb-20">
            <BreadCrumbs
                items={breadcrumbItems}
                title="Smart Pop Up Management"
                description="Create and manage eye-catching popups for your visitors with high-fidelity visual preview."
            />

            <SmartPopupSection />
        </div>
    );
}
