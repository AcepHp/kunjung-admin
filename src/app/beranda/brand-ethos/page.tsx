'use client';

import BreadCrumbs, { BreadCrumbItem } from '@/components/Common/Breadcrumbs';
import BrandEthosSection from '@/components/BrandEthos/BrandEthosSection';

export default function Page() {
    const breadcrumbItems: BreadCrumbItem[] = [
        { name: 'Home', href: '/beranda' },
        { name: 'Brand Ethos', disabled: true },
    ];

    return (
        <div className="space-y-12">
            <BreadCrumbs
                items={breadcrumbItems}
                title="Brand Ethos"
                description="Preview and manage the brand ethos page content with high-fidelity visual fidelity."
            />

            <BrandEthosSection />
        </div>
    );
}
