'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Editor } from '@tinymce/tinymce-react';
import BreadCrumbs, {
    BreadCrumbItem,
} from '@/components/Common/Breadcrumbs';
import { createBrandStory } from '@/services/BrandStoryService';

export default function AddBrandStoryPage() {
    const router = useRouter();
    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState({
        brandName: '',
        headlineStory: '',
        subHeadlineStory: '',
        descriptionStory: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleEditorChange = (content: string) => {
        setFormData((prev) => ({ ...prev, descriptionStory: content }));
    };

    const isFormValid = Object.values(formData).every(val => val.trim() !== '');

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid) return;

        setIsSaving(true);
        try {
            await createBrandStory(formData);
            router.push('/beranda/display/brand-story');
            router.refresh();
        } catch (error) {
            console.error("Failed to create brand story:", error);
            alert("Failed to create brand story. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    const breadcrumbItems: BreadCrumbItem[] = [
        { name: 'Home', href: '/beranda' },
        { name: 'Brand Story', href: '/beranda/display/brand-story' },
        { name: 'Add Story', disabled: true },
    ];

    return (
        <div className="space-y-8">
            <BreadCrumbs
                items={breadcrumbItems}
                title="Add Brand Story"
                description="Create the primary story and narrative for your brand."
            />

            <form onSubmit={handleSave} className="rounded-2xl border border-[#E9D6C6] bg-white p-8 shadow-sm space-y-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {/* BRAND NAME */}
                    <div className="space-y-2 md:col-span-2">
                        <label className="text-xs font-bold tracking-widest text-[#8B6F56] uppercase">
                            Brand Name / Identity
                        </label>
                        <input
                            type="text"
                            name="brandName"
                            value={formData.brandName}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-[#E0D4C6] px-4 py-3 text-sm focus:ring-2 focus:ring-[#7A3E2C] focus:border-transparent transition-all outline-none"
                            placeholder="e.g., Kunjung Family"
                            required
                        />
                    </div>

                    {/* HEADLINE */}
                    <div className="space-y-2 md:col-span-2">
                        <label className="text-xs font-bold tracking-widest text-[#8B6F56] uppercase">
                            Main Headline
                        </label>
                        <input
                            type="text"
                            name="headlineStory"
                            value={formData.headlineStory}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-[#E0D4C6] px-4 py-3 text-sm focus:ring-2 focus:ring-[#7A3E2C] focus:border-transparent transition-all outline-none"
                            placeholder="e.g., Crafting Memories, One Stay at a Time"
                            required
                        />
                    </div>

                    {/* SUB-HEADLINE */}
                    <div className="space-y-2 md:col-span-2">
                        <label className="text-xs font-bold tracking-widest text-[#8B6F56] uppercase">
                            Sub-Headline / Tagline
                        </label>
                        <input
                            type="text"
                            name="subHeadlineStory"
                            value={formData.subHeadlineStory}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-[#E0D4C6] px-4 py-3 text-sm focus:ring-2 focus:ring-[#7A3E2C] focus:border-transparent transition-all outline-none"
                            placeholder="e.g., Discover the soul of Bali through our curated retreats."
                            required
                        />
                    </div>

                    {/* DESCRIPTION */}
                    <div className="space-y-2 md:col-span-2">
                        <label className="text-xs font-bold tracking-widest text-[#8B6F56] uppercase">
                            Detailed Description (Rich Text Editor)
                        </label>
                        <Editor
                            apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                            value={formData.descriptionStory}
                            init={{
                                height: 350,
                                menubar: false,
                                plugins: [
                                    'lists',
                                    'link',
                                    'autolink',
                                    'preview',
                                ],
                                toolbar:
                                    'undo redo | bold italic | bullist numlist | link | preview',
                                content_style:
                                    'body { font-family: Inter, sans-serif; font-size:14px }',
                            }}
                            onEditorChange={handleEditorChange}
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-[#F0E0D1]">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        disabled={isSaving}
                        className="rounded-full border border-[#E0D4C6] px-8 py-2.5 text-xs font-bold text-gray-500 hover:bg-gray-50 transition-all uppercase tracking-widest disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSaving || !isFormValid}
                        className="rounded-full bg-[#7A3E2C] px-10 py-2.5 text-xs font-bold text-white shadow-lg shadow-[#7A3E2C]/20 hover:bg-[#5C2D20] transition-all uppercase tracking-widest disabled:opacity-50 disabled:bg-gray-400"
                    >
                        {isSaving ? 'Saving...' : 'Create Brand Story'}
                    </button>
                </div>
            </form>
        </div>
    );
}
