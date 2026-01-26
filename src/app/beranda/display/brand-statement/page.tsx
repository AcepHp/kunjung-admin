'use client';

import { useEffect, useState } from 'react';
import BreadCrumbs, {
    BreadCrumbItem,
} from '@/components/Common/Breadcrumbs';
import { brandStatementData } from '@/data/BrandStatementData';
import BrandStatementSection from '@/components/DisplayManage/BrandStatement/BrandStatementSection';
import BrandStatementSkeleton from '@/components/DisplayManage/BrandStatement/BrandStatementSkeleton';
import { getBrandStatement, BrandStatementApiResponse } from '@/services/BrandStatementService';

export default function Page() {
    const [data, setData] = useState<BrandStatementApiResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const breadcrumbItems: BreadCrumbItem[] = [
        { name: 'Home', href: '/beranda' },
        { name: 'Brand Statement', disabled: true },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiData = await getBrandStatement();
                setData(apiData);
            } catch (error) {
                console.warn('Failed to fetch brand statement from API:', error);
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
                title="Brand Statement"
                description="Manage the brand statement section displayed on the homepage."
                isLoading={isLoading}
            />

            {isLoading ? (
                <BrandStatementSkeleton />
            ) : (
                <BrandStatementSection data={data} />
            )}
        </div>
    );
}
