'use client';

import { FormEvent, useState, useEffect } from 'react';
import type { HeroSlide } from '@/data/HeroSectionData';
import Image from 'next/image';

type Props = {
    slide: HeroSlide;
};

export default function EditHeroSlideForm({ slide }: Props) {
    const [villaName, setVillaName] = useState(slide.villaName);
    const [villaSubtitle, setVillaSubtitle] = useState(slide.villaSubtitle);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>(slide.image.url);
    const [status, setStatus] = useState<'active' | 'inactive'>(
        slide.isActive ? 'active' : 'inactive'
    );

    useEffect(() => {
        if (!imageFile) return;
        const objectUrl = URL.createObjectURL(imageFile);
        setPreviewUrl(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
    }, [imageFile]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // Placeholder: no real save logic yet
        console.log('Update hero slide:', {
            id: slide.id,
            villaName,
            villaSubtitle,
            imageFile,
            status,
        });
    };

    return (
        <section className="rounded-2xl border border-[#E9D6C6] bg-white p-5 sm:p-6 shadow-sm">
            {/* Header */}
            <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                    <h2 className="text-base sm:text-lg font-semibold text-[#2E2620]">
                        Edit Hero Slide
                    </h2>
                    <p className="mt-1 text-xs sm:text-sm text-gray-500">
                        Update the hero slide content for the homepage.
                    </p>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Status */}
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <label className="text-xs font-medium text-gray-600">
                        Status
                    </label>
                    <div className="inline-flex rounded-full bg-[#F6EAE0] p-1">
                        <button
                            type="button"
                            onClick={() => setStatus('active')}
                            className={[
                                'px-3 py-1 text-xs font-medium rounded-full transition',
                                status === 'active'
                                    ? 'bg-white text-[#7A3E2C] shadow-sm'
                                    : 'text-gray-500',
                            ].join(' ')}
                        >
                            Active
                        </button>
                        <button
                            type="button"
                            onClick={() => setStatus('inactive')}
                            className={[
                                'px-3 py-1 text-xs font-medium rounded-full transition',
                                status === 'inactive'
                                    ? 'bg-white text-[#7A3E2C] shadow-sm'
                                    : 'text-gray-500',
                            ].join(' ')}
                        >
                            Inactive
                        </button>
                    </div>
                </div>

                {/* Villa name */}
                <div>
                    <label className="block text-xs font-medium text-gray-600">
                        Villa Name
                    </label>
                    <input
                        type="text"
                        value={villaName}
                        onChange={(e) => setVillaName(e.target.value)}
                        className="mt-1 block w-full rounded-md border border-[#E0D4C6] px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#7A3E2C] focus:outline-none focus:ring-1 focus:ring-[#7A3E2C]"
                        placeholder="e.g. Silas House"
                    />
                </div>

                {/* Villa subtitle */}
                <div>
                    <label className="block text-xs font-medium text-gray-600">
                        Villa Subtitle
                    </label>
                    <input
                        type="text"
                        value={villaSubtitle}
                        onChange={(e) => setVillaSubtitle(e.target.value)}
                        className="mt-1 block w-full rounded-md border border-[#E0D4C6] px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#7A3E2C] focus:outline-none focus:ring-1 focus:ring-[#7A3E2C]"
                        placeholder="Short tagline for the villa"
                    />
                </div>

                {/* Current image + upload */}
                <div className="grid gap-3 sm:grid-cols-[minmax(0,1.3fr)_minmax(0,2fr)] sm:items-start">
                    <div>
                        <p className="block text-xs font-medium text-gray-600 mb-1">
                            Current Preview
                        </p>
                        <div className="relative h-50 w-full overflow-hidden rounded-lg border border-[#E0D4C6] bg-[#FAF4EC]">
                            <Image
                                src={previewUrl}
                                alt={slide.image.alt}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <p className="mt-1 text-[11px] text-gray-400">
                            If you upload a new image, the preview will update.
                        </p>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-gray-600">
                            Replace Hero Image (Optional)
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                setImageFile(e.target.files?.[0] ?? null)
                            }
                            className="mt-1 block w-full cursor-pointer rounded-md border border-[#E0D4C6] bg-white px-3 py-2 text-xs sm:text-sm text-gray-700 file:mr-3 file:rounded-md file:border-0 file:bg-[#7A3E2C] file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-white hover:file:bg-[#5C2D20]"
                        />
                        <p className="mt-1 text-[11px] text-gray-400">
                            Recommended ratio 16:9. JPG or PNG.
                        </p>
                    </div>
                </div>

                {/* Buttons */}
                <div className="mt-4 flex items-center justify-end gap-2">
                    <button
                        type="button"
                        className="rounded-full border border-[#E0D4C6] px-4 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded-full bg-[#7A3E2C] px-5 py-1.5 text-xs font-medium text-white hover:bg-[#5C2D20] transition"
                    >
                        Save Changes
                    </button>
                </div>
            </form>
        </section>
    );
}
