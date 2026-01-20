'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import BreadCrumbs, {
    BreadCrumbItem,
} from '@/components/Common/Breadcrumbs';
import BrandStoryEditSection from '@/components/DisplayManage/BrandStory/BrandStoryEditSection';
import BrandStoryEditSkeleton from '@/components/DisplayManage/BrandStory/BrandStoryEditSkeleton';
import { getBrandStory, updateBrandStory, BrandStoryApiResponse } from '@/services/BrandStoryService';

export default function Page() {
    const router = useRouter();
    const [data, setData] = useState<BrandStoryApiResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiData = await getBrandStory();
                setData(apiData);
            } catch (error) {
                console.error('Failed to fetch brand story:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleSave = async (updatedData: any) => {
        if (!data) return;
        setIsSaving(true);
        try {
            await updateBrandStory(data.id, updatedData);
            router.push('/beranda/display/brand-story');
            router.refresh();
        } catch (error) {
            console.error('Failed to save brand story:', error);
            alert('Failed to save changes. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    const breadcrumbItems: BreadCrumbItem[] = [
        { name: 'Home', href: '/beranda' },
        {
            name: 'Brand Story',
            href: '/beranda/display/brand-story',
        },
        { name: 'Edit', disabled: true },
    ];

    if (isLoading) {
        return (
            <div className="space-y-6">
                <BreadCrumbs
                    items={breadcrumbItems}
                    title="Edit Brand Story"
                    description="Update brand story content displayed on the homepage."
                />
                <BrandStoryEditSkeleton />
            </div>
        );
    }

    if (!data) {
        return <div className="p-6 text-red-500">Failed to load data.</div>;
    }

    return (
        <div className="space-y-6">
            {/* ===== HEADER ===== */}
            <BreadCrumbs
                items={breadcrumbItems}
                title="Edit Brand Story"
                description="Update brand story content displayed on the homepage."
            />

            {/* ===== EDIT FORM ===== */}
            <BrandStoryEditSection
                initialData={data}
                onCancel={() => router.push('/beranda/display/brand-story')}
                onSave={handleSave}
            />
        </div>
    );
}
