'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { heroSectionDummy } from '@/data/HeroSectionData';
import BreadCrumbs, {
    BreadCrumbItem,
} from '@/components/Common/Breadcrumbs';
import HeroCopywritingEdit from '@/components/DisplayManage/HeroSection/HeroCopyWritingEdit';
import HeroCopywritingEditSkeleton from '@/components/DisplayManage/HeroSection/HeroCopywritingEditSkeleton';
import { getHeroSection, updateHeroSection, HeroSectionApiResponse, UpdateHeroSectionPayload } from '@/services/HeroSectionService';

export default function EditHeroPage() {
    const router = useRouter();
    const [heroData, setHeroData] = useState<HeroSectionApiResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getHeroSection();
                if (!data) {
                    throw new Error("No data found");
                }
                setHeroData(data);
            } catch (error) {
                console.warn("Failed to fetch hero data from API, using fallback data:", error);
                const fallbackData: HeroSectionApiResponse = {
                    id: 'fallback-id',
                    headline: heroSectionDummy.data.heroSection.copywriting.headline,
                    description: heroSectionDummy.data.heroSection.copywriting.description,
                    signature: heroSectionDummy.data.heroSection.copywriting.signature,
                };
                setHeroData(fallbackData);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleSave = async (payload: UpdateHeroSectionPayload) => {
        if (!heroData) return;
        setIsSaving(true);
        try {
            await updateHeroSection(heroData.id, payload);
            router.push('/beranda/display/hero');
            router.refresh(); // Ensure the list page updates
        } catch (error) {
            console.error("Failed to update hero section:", error);
            alert("Failed to update. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    const breadcrumbItems: BreadCrumbItem[] = [
        { name: 'Home', href: '/beranda' },
        { name: 'Hero Section', href: '/beranda/display/hero' },
        { name: 'Edit Hero-Section', disabled: true },
    ];

    if (isLoading) {
        return (
            <div className="space-y-8">
                <BreadCrumbs
                    items={breadcrumbItems}
                    title="Edit Hero Copywriting"
                    description="Update the headline, description, and signature of your hero section."
                />
                <HeroCopywritingEditSkeleton />
            </div>
        );
    }

    if (!heroData) {
        return <div className="p-6 text-red-500">Failed to load data.</div>;
    }

    return (
        <div className="space-y-8">
            {/* Breadcrumb + Title */}
            <BreadCrumbs
                items={breadcrumbItems}
                title="Edit Hero Copywriting"
                description="Update the headline, description, and signature of your hero section."
            />

            {/* Edit Form Component (UI Only) */}
            <HeroCopywritingEdit
                data={heroData}
                onCancel={() => router.back()}
                onSave={handleSave}
            />

            {isSaving && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
                    <div className="rounded-xl bg-white p-6 shadow-xl">
                        <p className="text-sm font-semibold text-[#7A3E2C]">Saving...</p>
                    </div>
                </div>
            )}
        </div>
    );
}
