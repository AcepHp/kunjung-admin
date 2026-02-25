'use client';

import { useEffect, useState } from 'react';
import BreadCrumbs, {
    BreadCrumbItem,
} from '@/components/Common/Breadcrumbs';
import ServiceRecommendation from '@/components/DisplayManage/ServiceRecommendation/ServiceRecommendation';
import ServiceRecommendationSkeleton from '@/components/DisplayManage/ServiceRecommendation/ServiceRecommendationSkeleton';
import { getServiceRecommendations, ServiceRecommendationApiResponse } from '@/services/ServiceRecommendationService';

export default function Page() {
    const [data, setData] = useState<ServiceRecommendationApiResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getServiceRecommendations();
                setData(result);
            } catch (error) {
                console.error("Failed to load service recommendations:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const breadcrumbItems: BreadCrumbItem[] = [
        { name: 'Home', href: '/beranda' },
        { name: 'Service Recommendation', disabled: true },
    ];

    return (
        <div className="space-y-6">
            <BreadCrumbs
                items={breadcrumbItems}
                title="Service Recommendation"
                description="Manage recommended services displayed on the homepage."
            />

            {isLoading ? (
                <ServiceRecommendationSkeleton />
            ) : (
                <ServiceRecommendation data={data} />
            )}
        </div>
    );
}
