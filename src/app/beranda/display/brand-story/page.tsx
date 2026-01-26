'use client';

import { useEffect, useState } from 'react';
import BreadCrumbs, {
    BreadCrumbItem,
} from '@/components/Common/Breadcrumbs';
import { brandStoryData } from '@/data/BrandStoryData';
import BrandStorySection from '@/components/DisplayManage/BrandStory/BrandStorySection';
import BrandStorySkeleton from '@/components/DisplayManage/BrandStory/BrandStorySkeleton';
import { getBrandStory, BrandStoryApiResponse } from '@/services/BrandStoryService';

export default function Page() {
    const [data, setData] = useState<BrandStoryApiResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const breadcrumbItems: BreadCrumbItem[] = [
        { name: 'Home', href: '/beranda' },
        { name: 'Brand Story', disabled: true },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiData = await getBrandStory();
                setData(apiData);
            } catch (error) {
                console.warn('Failed to fetch brand story from API:', error);
                setData(null);
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

            {isLoading ? (
                <BrandStorySkeleton />
            ) : (
                <BrandStorySection data={data} images={brandStoryData.images} />
            )}
        </div>
    );
}
