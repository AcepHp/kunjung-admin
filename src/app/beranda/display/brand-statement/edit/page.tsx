'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BreadCrumbs, {
    BreadCrumbItem,
} from '@/components/Common/Breadcrumbs';
import { brandStatementData } from '@/data/BrandStatementData';
import BrandStatementEditSection from '@/components/DisplayManage/BrandStatement/BrandStatementEditSection';
import BrandStatementEditSkeleton from '@/components/DisplayManage/BrandStatement/BrandStatementEditSkeleton';
import { getBrandStatement, updateBrandStatement, BrandStatementApiResponse, UpdateBrandStatementPayload } from '@/services/BrandStatementService';

export default function Page() {
    const router = useRouter();
    const [data, setData] = useState<BrandStatementApiResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiData = await getBrandStatement();
                setData(apiData);
            } catch (error) {
                console.warn('Failed to fetch brand statement from API, using fallback data:', error);
                const fallbackData: BrandStatementApiResponse = {
                    id: 'fallback-id',
                    titleStatement: brandStatementData.title,
                    subTitleStatement: brandStatementData.subtitle,
                    locationStatementLeft: brandStatementData.locationLeft,
                    locationStatementRight: brandStatementData.locationRight,
                };
                setData(fallbackData);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSave = async (updatedData: UpdateBrandStatementPayload) => {
        if (!data) return;
        setIsSaving(true);
        try {
            await updateBrandStatement(data.id, updatedData);
            router.push('/beranda/display/brand-statement');
            router.refresh();
        } catch (error) {
            console.error('Failed to save brand statement:', error);
            alert('Failed to save changes. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const breadcrumbItems: BreadCrumbItem[] = [
        { name: 'Home', href: '/beranda' },
        {
            name: 'Brand Statement',
            href: '/beranda/display/brand-statement',
        },
        { name: 'Edit', disabled: true },
    ];

    if (isLoading) {
        return (
            <div className="space-y-6">
                <BreadCrumbs
                    items={breadcrumbItems}
                    title="Edit Brand Statement"
                    description="Update the brand statement content on homepage."
                    isLoading={true}
                />
                <BrandStatementEditSkeleton />
            </div>
        );
    }

    if (!data) {
        return <div className="p-6 text-red-500">Failed to load data.</div>;
    }

    return (
        <div className="space-y-6">
            <BreadCrumbs
                items={breadcrumbItems}
                title="Edit Brand Statement"
                description="Update the brand statement content on homepage."
            />

            <BrandStatementEditSection
                initialData={data}
                onCancel={() =>
                    router.push('/beranda/display/brand-statement')
                }
                onSave={handleSave}
            />
        </div>
    );
}
