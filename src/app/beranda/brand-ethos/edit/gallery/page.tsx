'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import BreadCrumbs, { BreadCrumbItem } from '@/components/Common/Breadcrumbs';
import GalleryEdit from '@/components/BrandEthos/Edit/GalleryEdit';
import { brandEthosResponse } from '@/data/BrandEthos';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

export default function Page() {
    const router = useRouter();

    const data = brandEthosResponse.data;
    const [images, setImages] = useState(data.gallery.images);

    const breadcrumbItems: BreadCrumbItem[] = [
        { name: 'Home', href: '/beranda' },
        { name: 'Brand Ethos', href: '/beranda/brand-ethos' },
        { name: 'Edit Gallery', disabled: true },
    ];

    const handleSave = () => {
        console.log('SAVING GALLERY:', images);
        router.push('/beranda/brand-ethos');
    };

    return (
        <div className="space-y-6">
            <BreadCrumbs
                items={breadcrumbItems}
                title="Edit Immersive Gallery"
                description="Manage the visual gallery display."
            />

            <GalleryEdit
                images={images}
                setImages={setImages}
                onSave={handleSave}
                onCancel={() => router.push('/beranda/brand-ethos')}
            />
        </div>
    );
}
