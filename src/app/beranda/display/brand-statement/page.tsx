'use client';

import { useEffect, useState } from 'react';
import BreadCrumbs, {
    BreadCrumbItem,
} from '@/components/Common/Breadcrumbs';
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
                console.error('Failed to fetch brand statement:', error);
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
            />

            {isLoading ? (
                <BrandStatementSkeleton />
            ) : data ? (
                <BrandStatementSection data={data} />
            ) : (
                <div className="text-red-500">Failed to load brand statement.</div>
            )}
        </div>
    );
}
