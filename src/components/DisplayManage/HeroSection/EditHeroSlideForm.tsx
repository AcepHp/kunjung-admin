'use client';

import { FormEvent, useState, useEffect } from 'react';
import { HeroSlideApiResponse, updateHeroSlide } from '@/services/HeroSectionService';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type Props = {
    slide: HeroSlideApiResponse;
};

export default function EditHeroSlideForm({ slide }: Props) {
    const router = useRouter();
    const [title, setTitle] = useState(slide.title);
    const [subtitle, setSubtitle] = useState(slide.subtitle);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>(slide.imageUrl || '');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const fetchImageAsFile = async () => {
            if (!slide.imageUrl) return;
            try {
                const response = await fetch(slide.imageUrl);
                const blob = await response.blob();
                const fileName = slide.imageUrl.split('/').pop() || 'existing-image.jpg';
                const file = new File([blob], fileName, { type: blob.type });
                setImageFile(file);
            } catch (error) {
                console.error("Error converting existing image to file:", error);
            }
        };

        fetchImageAsFile();
    }, [slide.imageUrl]);

    useEffect(() => {
        if (!imageFile) return;
        const objectUrl = URL.createObjectURL(imageFile);
        setPreviewUrl(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
    }, [imageFile]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (title.trim() === '') {
            alert("Title is required.");
            return;
        }

        setIsSaving(true);
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('subtitle', subtitle);
            // Based on user's image, status should be exactly 'true' or 'false' (string)
            // Forced to 'true' per user request
            formData.append('status', 'true');

            if (imageFile) {
                formData.append('image', imageFile);
            }

            await updateHeroSlide(slide.id, formData);

            alert("Slide updated successfully!");
            window.location.assign('/beranda/display/hero');
        } catch (error) {
            console.error('Failed to update hero slide:', error);
            alert("Failed to update slide. Please try again.");
        } finally {
            setIsSaving(false);
        }
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
                {/* Status Hidden/Forced to true as per user request */}

                {/* Villa name */}
                <div>
                    <label className="block text-xs font-medium text-gray-600">
                        Villa Title
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
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
                        value={subtitle}
                        onChange={(e) => setSubtitle(e.target.value)}
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
                        <div className="relative h-48 w-full overflow-hidden rounded-lg border border-[#E0D4C6] bg-[#FAF4EC]">
                            {previewUrl ? (
                                <Image
                                    src={previewUrl}
                                    alt={title}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center text-xs text-gray-400">
                                    No image available
                                </div>
                            )}
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
                        onClick={() => router.back()}
                        disabled={isSaving}
                        className="rounded-full border border-[#E0D4C6] px-4 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 transition disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSaving}
                        className="rounded-full bg-[#7A3E2C] px-5 py-1.5 text-xs font-medium text-white hover:bg-[#5C2D20] transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {isSaving ? 'Saving Changes...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </section>
    );
}
