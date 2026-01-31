'use client';

import { useEffect, useState } from 'react';
import BreadCrumbs, {
    BreadCrumbItem,
} from '@/components/Common/Breadcrumbs';
import BrandStorySection from '@/components/DisplayManage/BrandStory/BrandStorySection';
import BrandStoryImageSection from '@/components/DisplayManage/BrandStory/BrandStoryImageSection';
import BrandStorySectionSkeleton from '@/components/DisplayManage/BrandStory/BrandStorySectionSkeleton';
import BrandStoryImageSectionSkeleton from '@/components/DisplayManage/BrandStory/BrandStoryImageSectionSkeleton';
import { getBrandStory, BrandStoryApiResponse } from '@/services/BrandStoryService';
import { getBrandImages, BrandImageApiResponse } from '@/services/BrandImageService';

export default function Page() {
    const [data, setData] = useState<BrandStoryApiResponse | null>(null);
    const [images, setImages] = useState<BrandImageApiResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const breadcrumbItems: BreadCrumbItem[] = [
        { name: 'Home', href: '/beranda' },
        { name: 'Display Management', href: '/beranda/display', disabled: true },
        { name: 'Brand Story', disabled: true },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const storyData = await getBrandStory();
                setData(storyData);
            } catch (error) {
                console.warn('Failed to fetch brand story data:', error);
            }

            try {
                const imagesData = await getBrandImages();
                setImages(imagesData);
            } catch (error) {
                console.warn('Failed to fetch brand images data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="space-y-6">
            <BreadCrumbs
                items={breadcrumbItems}
                title="Brand Story"
                description="Preview and manage the brand story section displayed on the homepage."
            />

            <div className="space-y-8">
                {isLoading ? (
                    <>
                        <BrandStorySectionSkeleton />
                        <BrandStoryImageSectionSkeleton />
                    </>
                ) : (
                    <>
                        <BrandStorySection data={data} />
                        <BrandStoryImageSection images={images} />
                    </>
                )}
            </div>
        </div>
    );
}
