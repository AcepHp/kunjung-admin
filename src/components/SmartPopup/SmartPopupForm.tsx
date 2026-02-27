'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { PhotoIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

export default function SmartPopupForm() {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        title: 'Special Stay Offer',
        label: 'PROMO',
        subtitle: 'LIMITED TIME ONLY',
        description: 'Nikmati pengalaman menginap premium dengan harga spesial. Berlaku untuk pemesanan hari ini.',
        buttonText: 'View Offer',
        linkTo: '/offers/special-stay',
        imageSrc: '/images/villa-1.jpg'
    });

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, imageSrc: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        setSubmitting(true);
        // Simulation
        setTimeout(() => {
            setSubmitting(false);
            router.push('/beranda/smart-popup');
        }, 1000);
    };

    return (
        <div className="max-w-9xl mx-auto">
            {/* Form Section */}
            <section className="rounded-2xl border border-[#E9D6C6] bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-start justify-between gap-3">
                    <div>
                        <h2 className="text-lg font-semibold text-[#2E2620]">
                            Configure Smart Pop Up
                        </h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Update the global promotional popup content and behavior.
                        </p>
                    </div>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-gray-600">Badge Label</label>
                            <input
                                type="text"
                                value={formData.label}
                                onChange={(e) => handleChange('label', e.target.value)}
                                className="mt-1 block w-full rounded-md border border-[#E0D4C6] px-3 py-2 text-sm text-gray-900 focus:border-[#7A3E2C] focus:outline-none focus:ring-1 focus:ring-[#7A3E2C]"
                                placeholder="PROMO"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-600">Subtitle</label>
                            <input
                                type="text"
                                value={formData.subtitle}
                                onChange={(e) => handleChange('subtitle', e.target.value)}
                                className="mt-1 block w-full rounded-md border border-[#E0D4C6] px-3 py-2 text-sm text-gray-900 focus:border-[#7A3E2C] focus:outline-none focus:ring-1 focus:ring-[#7A3E2C]"
                                placeholder="LIMITED TIME ONLY"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-600">Main Title</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => handleChange('title', e.target.value)}
                            className="mt-1 block w-full rounded-md border border-[#E0D4C6] px-3 py-2 text-sm text-gray-900 focus:border-[#7A3E2C] focus:outline-none focus:ring-1 focus:ring-[#7A3E2C]"
                            placeholder="Special Stay Offer"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-600">Description</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => handleChange('description', e.target.value)}
                            className="mt-1 block w-full rounded-md border border-[#E0D4C6] px-3 py-2 text-sm text-gray-900 h-24 resize-none focus:border-[#7A3E2C] focus:outline-none focus:ring-1 focus:ring-[#7A3E2C]"
                            placeholder="Promo description..."
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-gray-600">Button Text</label>
                            <input
                                type="text"
                                value={formData.buttonText}
                                onChange={(e) => handleChange('buttonText', e.target.value)}
                                className="mt-1 block w-full rounded-md border border-[#E0D4C6] px-3 py-2 text-sm text-gray-900 focus:border-[#7A3E2C] focus:outline-none focus:ring-1 focus:ring-[#7A3E2C]"
                                placeholder="View Offer"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-600">Link To (URL)</label>
                            <input
                                type="text"
                                value={formData.linkTo}
                                onChange={(e) => handleChange('linkTo', e.target.value)}
                                className="mt-1 block w-full rounded-md border border-[#E0D4C6] px-3 py-2 text-sm text-gray-900 focus:border-[#7A3E2C] focus:outline-none focus:ring-1 focus:ring-[#7A3E2C]"
                                placeholder="/offers/special"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start border-t border-[#FAF4EC] pt-5">
                        <div className="space-y-2">
                            <label className="block text-xs font-medium text-gray-600">Pop Up Image</label>
                            <div className="mt-1 flex items-center gap-3">
                                <label className="flex-1 cursor-pointer rounded-md border border-[#E0D4C6] bg-white px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2">
                                    <PhotoIcon className="h-4 w-4" />
                                    Choose File
                                    <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                                </label>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-2">Image Preview</label>
                            <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-[#E0D4C6] bg-[#FAF4EC]">
                                {formData.imageSrc && (
                                    <Image src={formData.imageSrc} alt="Preview" fill className="object-cover" />
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-6">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="rounded-full border border-[#E0D4C6] px-5 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="rounded-full bg-[#7A3E2C] px-6 py-2 text-xs font-medium text-white hover:bg-[#5C2D20] transition disabled:bg-gray-400"
                        >
                            {submitting ? 'Saving Changes...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </section>



        </div>
    );
}
