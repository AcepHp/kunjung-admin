'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import BreadCrumbs, { BreadCrumbItem } from '@/components/Common/Breadcrumbs';
import FoundersStoryEdit from '@/components/BrandEthos/Edit/FoundersStoryEdit';
import { getBrandEthos, updateFounderLegacy } from '@/services/BrandEthosService';
import BrandEthosFormSkeleton from '@/components/BrandEthos/BrandEthosFormSkeleton';

export default function Page() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [content, setContent] = useState('');
    const [image, setImage] = useState<{ url: string; alt: string; file?: File }>({ url: '', alt: 'Founders Image' });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getBrandEthos();
                if (data) {
                    setContent(data.founderStory || '');
                    setImage({ url: data.founderLegacyImage || '', alt: 'Founders Image' });
                }
            } catch (error) {
                console.error('Failed to fetch founder story:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const breadcrumbItems: BreadCrumbItem[] = [
        { name: 'Home', href: '/beranda' },
        { name: 'Brand Ethos', href: '/beranda/brand-ethos' },
        { name: 'Edit Founders Story', disabled: true },
    ];

    const handleSave = async () => {
        setSaving(true);
        try {
            await updateFounderLegacy({
                founderStory: content,
                founderLegacyImage: image.url,
                file: image.file
            });
            router.push('/beranda/brand-ethos');
        } catch (error) {
            console.error('Failed to update founder story:', error);
            alert('Failed to save changes');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <BrandEthosFormSkeleton />;

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
                isSubmitting={saving}
            />
        </div>
    );
}
