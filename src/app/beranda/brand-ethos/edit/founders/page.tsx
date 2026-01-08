'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import BreadCrumbs, { BreadCrumbItem } from '@/components/Common/Breadcrumbs';
import FoundersStoryEdit from '@/components/BrandEthos/Edit/FoundersStoryEdit';
import { brandEthosResponse } from '@/data/BrandEthos';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

export default function Page() {
    const router = useRouter();
    const data = brandEthosResponse.data;

    const [content, setContent] = useState(data.foundersStory.content.description);
    const [image, setImage] = useState(data.foundersStory.content.image);

    const breadcrumbItems: BreadCrumbItem[] = [
        { name: 'Home', href: '/beranda' },
        { name: 'Brand Ethos', href: '/beranda/brand-ethos' },
        { name: 'Edit Founders Story', disabled: true },
    ];

    const handleSave = () => {
        console.log('SAVING FOUNDERS STORY:', { content, image });
        router.push('/beranda/brand-ethos');
    };

    return (
        <div className="space-y-6">
            <BreadCrumbs
                items={breadcrumbItems}
                title="Edit Founders' Story"
                description="Update the detailed background and legacy story."
            />

            <FoundersStoryEdit
                content={content} setContent={setContent}
                image={image} setImage={setImage}
                onSave={handleSave}
                onCancel={() => router.push('/beranda/brand-ethos')}
            />
        </div>
    );
}
