'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import BreadCrumbs, {
    BreadCrumbItem,
} from '@/components/Common/Breadcrumbs';
import { createBrandStatement } from '@/services/BrandStatementService';

export default function AddBrandStatementPage() {
    const router = useRouter();
    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState({
        titleStatement: '',
        subTitleStatement: '',
        locationStatementLeft: '',
        locationStatementRight: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const isFormValid = Object.values(formData).every(val => val.trim() !== '');

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid) return;

        setIsSaving(true);
        try {
            await createBrandStatement(formData);
            router.push('/beranda/display/brand-statement');
            router.refresh();
        } catch (error) {
            console.error("Failed to create brand statement:", error);
            alert("Failed to create brand statement. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    const breadcrumbItems: BreadCrumbItem[] = [
        { name: 'Home', href: '/beranda' },
        { name: 'Brand Statement', href: '/beranda/display/brand-statement' },
        { name: 'Add Statement', disabled: true },
    ];

    return (
        <div className="space-y-8">
            <BreadCrumbs
                items={breadcrumbItems}
                title="Add Brand Statement"
                description="Create your brand statement to be displayed on the homepage."
            />

            <form onSubmit={handleSave} className="rounded-2xl border border-[#E9D6C6] bg-white p-8 shadow-sm space-y-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {/* TITLE */}
                    <div className="space-y-2 md:col-span-2">
                        <label className="text-xs font-bold tracking-widest text-[#8B6F56] uppercase">
                            Main Statement Title
                        </label>
                        <input
                            type="text"
                            name="titleStatement"
                            value={formData.titleStatement}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-[#E0D4C6] px-4 py-3 text-sm focus:ring-2 focus:ring-[#7A3E2C] focus:border-transparent transition-all outline-none"
                            placeholder="e.g., Elegance in Every Detail"
                            required
                        />
                    </div>

                    {/* SUBTITLE */}
                    <div className="space-y-2 md:col-span-2">
                        <label className="text-xs font-bold tracking-widest text-[#8B6F56] uppercase">
                            Description / Subtitle
                        </label>
                        <textarea
                            name="subTitleStatement"
                            value={formData.subTitleStatement}
                            onChange={handleChange}
                            rows={4}
                            className="w-full rounded-xl border border-[#E0D4C6] px-4 py-3 text-sm focus:ring-2 focus:ring-[#7A3E2C] focus:border-transparent transition-all outline-none"
                            placeholder="Provide a short description of your brand..."
                            required
                        />
                    </div>

                    {/* LOCATION LEFT */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold tracking-widest text-[#8B6F56] uppercase">
                            Footer Text (Left)
                        </label>
                        <input
                            type="text"
                            name="locationStatementLeft"
                            value={formData.locationStatementLeft}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-[#E0D4C6] px-4 py-3 text-sm focus:ring-2 focus:ring-[#7A3E2C] focus:border-transparent transition-all outline-none"
                            placeholder="e.g., Kunjung Family"
                            required
                        />
                    </div>

                    {/* LOCATION RIGHT */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold tracking-widest text-[#8B6F56] uppercase">
                            Footer Text (Right)
                        </label>
                        <input
                            type="text"
                            name="locationStatementRight"
                            value={formData.locationStatementRight}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-[#E0D4C6] px-4 py-3 text-sm focus:ring-2 focus:ring-[#7A3E2C] focus:border-transparent transition-all outline-none"
                            placeholder="e.g., Bali, Indonesia"
                            required
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
                        {isSaving ? 'Saving...' : 'Create Brand Statement'}
                    </button>
                </div>
            </form>
        </div>
    );
}
