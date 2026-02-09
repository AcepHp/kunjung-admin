'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    EnvelopeIcon,
} from '@heroicons/react/24/outline';
import {
    Instagram,
    Youtube,
    Link as LinkIcon,
} from 'lucide-react';

import BreadCrumbs, {
    BreadCrumbItem,
} from '@/components/Common/Breadcrumbs';
import { createSocialMedia } from '@/services/SocialMediaService';

const PLATFORMS = [
    { name: 'Email', icon: <EnvelopeIcon className="h-5 w-5" />, placeholder: 'mailto:info@example.com' },
    { name: 'Instagram', icon: <Instagram className="h-5 w-5" />, placeholder: 'https://instagram.com/username' },
    { name: 'TikTok', icon: <LinkIcon className="h-5 w-5" />, placeholder: 'https://tiktok.com/@username' },
    { name: 'YouTube', icon: <Youtube className="h-5 w-5" />, placeholder: 'https://youtube.com/@channel' },
];

export default function AddSocialMediaPage() {
    const router = useRouter();
    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState<Record<string, string>>({
        Email: '',
        Instagram: '',
        TikTok: '',
        YouTube: '',
    });

    const handleInputChange = (platform: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [platform]: value,
        }));
    };

    const isFormValid = Object.values(formData).every((val) => val.trim() !== '');

    const handleSave = async () => {
        if (!isFormValid) return;

        setIsSaving(true);
        try {
            // Upload sequentially
            for (const platform of PLATFORMS) {
                await createSocialMedia({
                    title: platform.name,
                    url: formData[platform.name],
                });
            }

            router.push('/beranda/display/social-media');
            router.refresh();
        } catch (error) {
            console.error("Failed to create social media links:", error);
            alert("Failed to save social media links. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    const breadcrumbItems: BreadCrumbItem[] = [
        { name: 'Home', href: '/beranda' },
        { name: 'Social Media', href: '/beranda/display/social-media' },
        { name: 'Batch Add', disabled: true },
    ];

    return (
        <div className="space-y-8 pb-20">
            <BreadCrumbs
                items={breadcrumbItems}
                title="Add Social Media Links"
                description="Populate your social media information for the website."
            />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {PLATFORMS.map((platform) => (
                    <div
                        key={platform.name}
                        className="rounded-2xl border border-[#E9D6C6] bg-white p-6 shadow-sm transition-all hover:border-[#7A3E2C]/30"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F7EBE1] text-[#7A3E2C]">
                                {platform.icon}
                            </div>
                            <h3 className="font-serif font-bold text-[#1E1E1E]">{platform.name}</h3>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold tracking-widest text-[#8B6F56] uppercase">
                                {platform.name} URL / Link
                            </label>
                            <input
                                type="text"
                                value={formData[platform.name]}
                                onChange={(e) => handleInputChange(platform.name, e.target.value)}
                                className="w-full rounded-xl border border-[#E0D4C6] px-4 py-3 text-sm focus:ring-2 focus:ring-[#7A3E2C] focus:border-transparent transition-all outline-none"
                                placeholder={platform.placeholder}
                                required
                            />
                        </div>
                    </div>
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
                    {isSaving ? 'Saving...' : 'Save All Social Media'}
                </button>
            </div>

            {isSaving && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-[2px]">
                    <div className="rounded-2xl bg-white p-8 shadow-2xl border border-[#E9D6C6] flex flex-col items-center gap-4">
                        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#7A3E2C] border-t-transparent" />
                        <p className="text-sm font-bold text-[#7A3E2C] uppercase tracking-widest">Saving Social Media...</p>
                    </div>
                </div>
            )}
        </div>
    );
}
