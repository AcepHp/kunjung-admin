'use client';

import BreadCrumbs, { BreadCrumbItem } from '@/components/Common/Breadcrumbs';
import BrandImageAddForm from '@/components/DisplayManage/BrandStory/BrandImageAddForm';

export default function AddBrandImagePage() {
    const breadcrumbItems: BreadCrumbItem[] = [
        { name: 'Home', href: '/beranda' },
        { name: 'Brand Story', href: '/beranda/display/brand-story' },
        { name: 'Add Images', disabled: true },
    ];

    return (
        <div className="space-y-6">
            <BreadCrumbs
                items={breadcrumbItems}
                title="Add Brand Images"
                description="Upload two images for the brand story section."
            />

            <div className="max-w-[1600px]">
                <BrandImageAddForm />
            </div>
        </div>
    );
}
