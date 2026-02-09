'use client';

import { FormEvent, useState } from 'react';
import Image from 'next/image';
import { createHeroSlide } from '@/services/HeroSectionService';
import { useRouter } from 'next/navigation';

interface SlideData {
    title: string;
    subtitle: string;
    imageFile: File | null;
    imageUrl: string;
    status: boolean;
}

export default function AddHeroSlideForm() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [slides, setSlides] = useState<SlideData[]>(
        Array(4).fill(null).map(() => ({
            title: '',
            subtitle: '',
            imageFile: null,
            imageUrl: '',
            status: true,
        }))
    );

    const handleUpdateSlide = (index: number, updates: Partial<SlideData>) => {
        const newSlides = [...slides];
        newSlides[index] = { ...newSlides[index], ...updates };
        setSlides(newSlides);
    };

    const handleImageChange = (index: number, file: File | null) => {
        if (file) {
            const url = URL.createObjectURL(file);
            handleUpdateSlide(index, { imageFile: file, imageUrl: url });
        } else {
            handleUpdateSlide(index, { imageFile: null, imageUrl: '' });
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // Ensure each slide to save has both title and image
        const slidesToSave = slides.filter(s => s.title.trim() !== '' && s.imageFile !== null);

        if (slidesToSave.length === 0) {
            alert("Please fill in both Villa Title and Hero Image for at least one slide.");
            return;
        }

        setIsSubmitting(true);

        try {
            // Upload items one by one for better stability with Multipart/FormData
            for (let i = 0; i < slidesToSave.length; i++) {
                const slide = slidesToSave[i];
                const formData = new FormData();
                formData.append('title', slide.title);
                formData.append('subtitle', slide.subtitle);
                // Based on user's image, status should be exactly 'true' or 'false' (string)
                // Forced to 'true' per user request
                formData.append('status', 'true');
                if (slide.imageFile) {
                    formData.append('image', slide.imageFile);
                }
                await createHeroSlide(formData);
            }

            alert("All slides saved successfully!");
            // Using window.location to force a full refresh on navigation
            window.location.assign('/beranda/display/hero');
        } catch (error) {
            console.error("Failed to save slides:", error);
            alert("Failed to save some slides. Please ensure all mandatory fields are filled.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {slides.map((slide, index) => (
                    <section key={index} className="rounded-2xl border border-[#E9D6C6] bg-white p-5 shadow-sm space-y-4">
                        <div className="flex items-center justify-between border-b border-[#F6EAE0] pb-2">
                            <h3 className="text-sm font-bold text-[#7A3E2C]">Slide {index + 1}</h3>
                        </div>

                        <div className="space-y-3">
                            {/* Title */}
                            <div>
                                <label className="block text-[11px] font-semibold text-gray-600 mb-1">Villa Title</label>
                                <input
                                    type="text"
                                    value={slide.title}
                                    onChange={(e) => handleUpdateSlide(index, { title: e.target.value })}
                                    className="w-full rounded-lg border border-[#E0D4C6] px-3 py-2 text-sm focus:border-[#7A3E2C] focus:ring-1 focus:ring-[#7A3E2C] outline-none transition"
                                    placeholder="e.g. Elysium Retreat"
                                />
                            </div>

                            {/* Subtitle */}
                            <div>
                                <label className="block text-[11px] font-semibold text-gray-600 mb-1">Subtitle</label>
                                <input
                                    type="text"
                                    value={slide.subtitle}
                                    onChange={(e) => handleUpdateSlide(index, { subtitle: e.target.value })}
                                    className="w-full rounded-lg border border-[#E0D4C6] px-3 py-2 text-sm focus:border-[#7A3E2C] focus:ring-1 focus:ring-[#7A3E2C] outline-none transition"
                                    placeholder="e.g. Modern Comfort..."
                                />
                            </div>

                            {/* Image Upload */}
                            <div>
                                <label className="block text-[11px] font-semibold text-gray-600 mb-1">Hero Image</label>
                                <div className="flex items-center gap-3">
                                    <div className="relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg border border-[#E0D4C6] bg-[#FAF4EC]">
                                        {slide.imageUrl ? (
                                            <Image src={slide.imageUrl} alt={`Slide ${index + 1}`} fill className="object-cover" unoptimized />
                                        ) : (
                                            <div className="flex h-full items-center justify-center text-[10px] text-gray-400">No Image</div>
                                        )}
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleImageChange(index, e.target.files?.[0] ?? null)}
                                        className="text-xs file:mr-2 file:rounded-full file:border-0 file:bg-[#F6EAE0] file:px-3 file:py-1 file:text-[10px] file:font-semibold file:text-[#7A3E2C] hover:file:bg-[#E9D6C6] cursor-pointer"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                ))}
            </div>

            <div className="flex items-center justify-end gap-3 pt-4">
                <button
                    type="button"
                    onClick={() => router.back()}
                    disabled={isSubmitting}
                    className="rounded-full border border-[#E0D4C6] px-6 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 transition disabled:opacity-50"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-full bg-[#7A3E2C] px-8 py-2 text-sm font-bold text-white shadow-md hover:bg-[#5C2D20] transition active:scale-95 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? 'Saving...' : 'Save All 4 Slides'}
                </button>
            </div>
        </form>
    );
}
