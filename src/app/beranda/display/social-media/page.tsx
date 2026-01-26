'use client';

import { useEffect, useState } from 'react';
import BreadCrumbs, {
    BreadCrumbItem,
} from '@/components/Common/Breadcrumbs';
import SocialMediaSection from '@/components/DisplayManage/SocialMedia/SocialMediaSection';
import type { SocialMediaData } from '@/data/SocialMediaData';
import { getSocialMediaList } from '@/services/SocialMediaService';
import { getPlatformFromUrl } from '@/data/utils';

import SocialMediaSkeleton from '@/components/DisplayManage/SocialMedia/SocialMediaSkeleton';

export default function SocialMediaPage() {
    const [data, setData] = useState<SocialMediaData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const breadcrumbItems: BreadCrumbItem[] = [
        { name: 'Home', href: '/beranda' },
        { name: 'Social Media', disabled: true },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiData = await getSocialMediaList();
                const mappedData: SocialMediaData[] = apiData.map((item) => ({
                    id: item.id,
                    name: item.title, // User requested title to be platform (name)
                    url: item.url,
                }));
                setData(mappedData);
            } catch (error) {
                console.error('Failed to fetch social media data:', error);
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
                title="Social Media"
                description="Manage social media information for Kunjung website."
            />

            {isLoading ? (
                <SocialMediaSkeleton />
            ) : (
                <SocialMediaSection data={data} />
            )}
        </div>
    );
}
