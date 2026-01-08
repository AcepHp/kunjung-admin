'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import BreadCrumbs, { BreadCrumbItem } from '@/components/Common/Breadcrumbs';
import HeroEdit from '@/components/BrandEthos/Edit/HeroEdit';
import { brandEthosResponse } from '@/data/BrandEthos';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

export default function Page() {
    const router = useRouter();
    const data = brandEthosResponse.data;

    const [title, setTitle] = useState(data.hero.title);
    const [subtitle, setSubtitle] = useState(data.hero.subtitle);
    const [image, setImage] = useState(data.hero.image);

    const breadcrumbItems: BreadCrumbItem[] = [
        { name: 'Home', href: '/beranda' },
        { name: 'Brand Ethos', href: '/beranda/brand-ethos' },
        { name: 'Edit Hero', disabled: true },
    ];

    const handleSave = () => {
        console.log('SAVING HERO:', { title, subtitle, image });
        router.push('/beranda/brand-ethos');
    };

    return (
        <div className="space-y-6">
            <BreadCrumbs
                items={breadcrumbItems}
                title="Edit Hero Identity"
                description="Update the visual identity and core philosophy of the Brand Ethos."
            />

            <HeroEdit
                title={title} setTitle={setTitle}
                subtitle={subtitle} setSubtitle={setSubtitle}
                image={image} setImage={setImage}
                onSave={handleSave}
                onCancel={() => router.push('/beranda/brand-ethos')}
            />
        </div>
    );
}
