'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import BreadCrumbs, {
    BreadCrumbItem,
} from '@/components/Common/Breadcrumbs';
import ServiceRecommendationFormItem from '@/components/DisplayManage/ServiceRecommendation/ServiceRecommendationFormItem';
import { createServiceRecommendation } from '@/services/ServiceRecommendationService';

export default function AddServicePage() {
    const router = useRouter();
    const [isSaving, setIsSaving] = useState(false);
    const [items, setItems] = useState([
        { title: '', subtitle: '', imageFile: null as File | null },
        { title: '', subtitle: '', imageFile: null as File | null },
        { title: '', subtitle: '', imageFile: null as File | null },
    ]);

    const handleItemChange = (index: number, data: { title: string; subtitle: string; imageFile: File | null }) => {
        const newItems = [...items];
        newItems[index] = data;
        setItems(newItems);
    };

    const isFormValid = items.every(item => item.title.trim() !== '' && item.subtitle.trim() !== '' && item.imageFile !== null);

    const handleSave = async () => {
        if (!isFormValid) return;

        setIsSaving(true);
        try {
            // Upload items one by one for better stability with Multipart/FormData
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                console.log(`Uploading service recommendation ${i + 1}/3: ${item.title}`);

                const formData = new FormData();
                formData.append('title', item.title);
                formData.append('subtitle', item.subtitle);
                if (item.imageFile) {
                    formData.append('image', item.imageFile);
                }

                await createServiceRecommendation(formData);
            }

            router.push('/beranda/display/service-section');
            router.refresh();
        } catch (error: any) {
            console.error("Failed to create service recommendations:", error);
            const errorMessage = error.response?.data?.message || error.message || "Unknown error";
            alert(`Failed to save. Server responded with: ${errorMessage}`);
        } finally {
            setIsSaving(false);
        }
    };

    const breadcrumbItems: BreadCrumbItem[] = [
        { name: 'Home', href: '/beranda' },
        { name: 'Service Recommendation', href: '/beranda/display/service-section' },
        { name: 'Batch Add', disabled: true },
    ];

    return (
        <div className="space-y-8 pb-20">
            <BreadCrumbs
                items={breadcrumbItems}
                title="Add Service Recommendations"
                description="Add 3 mandatory service recommendations for the homepage."
            />

            <div className="space-y-8">
                {items.map((_, index) => (
                    <ServiceRecommendationFormItem
                        key={index}
                        index={index + 1}
                        onChange={(data) => handleItemChange(index, data)}
                    />
                ))}
            </div>

            {/* STICKY ACTIONS */}
            <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-t border-[#E9D6C6] px-8 py-4 flex justify-end gap-3 sm:left-64">
                <button
                    type="button"
                    onClick={() => router.back()}
                    disabled={isSaving}
                    className="rounded-full border border-[#E0D4C6] px-8 py-2.5 text-xs font-bold text-gray-500 hover:bg-gray-50 transition-all uppercase tracking-widest disabled:opacity-50"
                >
                    Cancel
                </button>
                <button
                    type="button"
                    onClick={handleSave}
                    disabled={isSaving || !isFormValid}
                    className="rounded-full bg-[#7A3E2C] px-10 py-2.5 text-xs font-bold text-white shadow-xl shadow-[#7A3E2C]/20 hover:bg-[#5C2D20] transition-all uppercase tracking-widest disabled:opacity-50 disabled:bg-gray-400"
                >
                    {isSaving ? 'Processing...' : 'Save All 3 Recommendations'}
                </button>
            </div>

            {isSaving && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-[2px]">
                    <div className="rounded-2xl bg-white p-8 shadow-2xl border border-[#E9D6C6] flex flex-col items-center gap-4">
                        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#7A3E2C] border-t-transparent" />
                        <p className="text-sm font-bold text-[#7A3E2C] uppercase tracking-widest">Uploading Recommendations...</p>
                    </div>
                </div>
            )}
        </div>
    );
}
