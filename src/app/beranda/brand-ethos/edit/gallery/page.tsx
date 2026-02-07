'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import BreadCrumbs, { BreadCrumbItem } from '@/components/Common/Breadcrumbs';
import GalleryEdit from '@/components/BrandEthos/Edit/GalleryEdit';
import { getImmersiveGallery, addImmersiveGalleryImages, updateImmersiveGalleryImage } from '@/services/BrandEthosService';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

export default function Page() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState<{ id?: string; url: string; alt?: string; file?: File }[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const galleryData = await getImmersiveGallery();
                if (galleryData) {
                    setImages(galleryData.map(img => ({
                        id: img.id,
                        url: img.imageUrl,
                        alt: 'Gallery Image'
                    })));
                }
            } catch (error) {
                console.error('Failed to fetch gallery:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const breadcrumbItems: BreadCrumbItem[] = [
        { name: 'Home', href: '/beranda' },
        { name: 'Brand Ethos', href: '/beranda/brand-ethos' },
        { name: 'Edit Gallery', disabled: true },
    ];

    const handleSave = async () => {
        try {
            // 1. Handle New Images (No ID)
            const newImages = images
                .filter(img => !img.id && img.url.startsWith('data:'))
                .map(img => ({ imageUrl: img.url }));

            if (newImages.length > 0) {
                await addImmersiveGalleryImages(newImages);
            }

            // 2. Handle Updated Images (Has ID + File)
            const updatedImages = images.filter(img => img.id && img.file);

            // Execute updates in parallel
            if (updatedImages.length > 0) {
                await Promise.all(updatedImages.map(img =>
                    updateImmersiveGalleryImage(img.id!, img.file!)
                ));
            }

            router.push('/beranda/brand-ethos');
        } catch (error) {
            console.error('Failed to save gallery:', error);
            alert('Failed to save gallery changes');
        }
    };

    if (loading) return <div>Loading...</div>;

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
