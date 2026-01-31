'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { createBrandImage } from '@/services/BrandImageService';

export default function BrandImageAddForm() {
    const router = useRouter();

    // State for Image 1
    const [imageFile1, setImageFile1] = useState<File | null>(null);
    const [previewUrl1, setPreviewUrl1] = useState<string>('');

    // State for Image 2
    const [imageFile2, setImageFile2] = useState<File | null>(null);
    const [previewUrl2, setPreviewUrl2] = useState<string>('');

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleImageChange = (file: File | null, index: 1 | 2) => {
        if (index === 1) {
            if (file) {
                setImageFile1(file);
                setPreviewUrl1(URL.createObjectURL(file));
            } else {
                setImageFile1(null);
                setPreviewUrl1('');
            }
        } else {
            if (file) {
                setImageFile2(file);
                setPreviewUrl2(URL.createObjectURL(file));
            } else {
                setImageFile2(null);
                setPreviewUrl2('');
            }
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!imageFile1 || !imageFile2) {
            alert("Please select both images.");
            return;
        }

        setIsSubmitting(true);
        try {
            // Prepare both requests
            const uploadImage = async (file: File) => {
                const formData = new FormData();
                formData.append('image', file);
                formData.append('status', '1'); // Default active
                return createBrandImage(formData);
            };

            await Promise.all([
                uploadImage(imageFile1),
                uploadImage(imageFile2)
            ]);

            alert("Brand images added successfully!");
            router.push('/beranda/display/brand-story');
            router.refresh();
        } catch (error) {
            console.error("Failed to add brand images:", error);
            alert("Failed to add brand images. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="rounded-2xl border border-[#E9D6C6] bg-white p-6 shadow-sm w-full">
            <form onSubmit={handleSubmit} className="space-y-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Image 1 Upload */}
                    <div className="flex flex-col h-full">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Brand Image 1 (Required)
                        </label>
                        <div className="flex flex-col gap-4 flex-grow">
                            <div className="relative h-[350px] w-full overflow-hidden rounded-xl border border-dashed border-[#E0D4C6] bg-gray-50 flex items-center justify-center">
                                {previewUrl1 ? (
                                    <Image
                                        src={previewUrl1}
                                        alt="Preview 1"
                                        fill
                                        className="object-cover"
                                        unoptimized
                                    />
                                ) : (
                                    <span className="text-gray-400 text-sm">No image selected</span>
                                )}
                            </div>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageChange(e.target.files?.[0] ?? null, 1)}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#7A3E2C] file:text-white hover:file:bg-[#5C2D20] transition cursor-pointer"
                            />
                        </div>
                    </div>

                    {/* Image 2 Upload */}
                    <div className="flex flex-col h-full">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Brand Image 2 (Required)
                        </label>
                        <div className="flex flex-col gap-4 flex-grow">
                            <div className="relative h-[350px] w-full overflow-hidden rounded-xl border border-dashed border-[#E0D4C6] bg-gray-50 flex items-center justify-center">
                                {previewUrl2 ? (
                                    <Image
                                        src={previewUrl2}
                                        alt="Preview 2"
                                        fill
                                        className="object-cover"
                                        unoptimized
                                    />
                                ) : (
                                    <span className="text-gray-400 text-sm">No image selected</span>
                                )}
                            </div>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageChange(e.target.files?.[0] ?? null, 2)}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#7A3E2C] file:text-white hover:file:bg-[#5C2D20] transition cursor-pointer"
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-2">
                    <p className="text-[11px] text-gray-400 text-center">
                        Recommended format: JPG, PNG. Max size: 2MB per image.
                    </p>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-4 border-t border-[#EFE3D7]">
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
                        className="rounded-full bg-[#7A3E2C] px-8 py-2 text-sm font-bold text-white shadow-md hover:bg-[#5C2D20] transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Saving...' : 'Save Images'}
                    </button>
                </div>
            </form>
        </section>
    );
}
