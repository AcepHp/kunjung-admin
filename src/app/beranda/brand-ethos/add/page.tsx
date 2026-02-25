'use client';

import BrandEthosAddForm from '@/components/BrandEthos/Add/BrandEthosAddForm';
import BreadCrumbs, { BreadCrumbItem } from '@/components/Common/Breadcrumbs';

export default function AddBrandEthosPage() {
    const breadcrumbItems: BreadCrumbItem[] = [
        { name: 'Home', href: '/beranda' },
        { name: 'Brand Ethos', href: '/beranda/brand-ethos' },
        { name: 'Add Content', disabled: true },
    ];

    return (
        <div className="space-y-12">
            <BreadCrumbs
                items={breadcrumbItems}
                title="Create Brand Ethos"
                description="Initialize your brand's core identity, story, and vision."
            />
            <BrandEthosAddForm />
        </div>
    );
}
