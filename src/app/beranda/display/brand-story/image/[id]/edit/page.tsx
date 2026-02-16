'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import BreadCrumbs, { BreadCrumbItem } from '@/components/Common/Breadcrumbs';
import { getBrandImageById, updateBrandImage, BrandImageApiResponse } from '@/services/BrandImageService';

export default function EditBrandImagePage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const [data, setData] = useState<BrandImageApiResponse | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const breadcrumbItems: BreadCrumbItem[] = [
        { name: 'Home', href: '/beranda' },
        { name: 'Brand Story', href: '/beranda/display/brand-story' },
        { name: 'Edit Image', disabled: true },
    ];

    // Fetch initial data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiData = await getBrandImageById(id);
                setData(apiData);
                setPreviewUrl(apiData.brandImageUrl);

                // Prefetch image as File to satisfy "Image is required" validation if user doesn't change it
                if (apiData.brandImageUrl) {
                    try {
                        const response = await fetch(apiData.brandImageUrl);
                        const blob = await response.blob();
                        const fileName = apiData.brandImageUrl.split('/').pop() || 'existing-image.jpg';
                        const file = new File([blob], fileName, { type: blob.type });
                        setImageFile(file);
                    } catch (err) {
                        console.error("Error hydrating existing image:", err);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch brand image:", error);
                router.push('/beranda/display/brand-story');
            } finally {
                setIsLoading(false);
            }
        };

        if (id) fetchData();
    }, [id, router]);

    const handleImageChange = (file: File | null) => {
        if (file) {
            setImageFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const formData = new FormData();
            // Ensure status is sent (using '1' for true)
            formData.append('status', '1');

            if (imageFile) {
                formData.append('image', imageFile);
            }

            await updateBrandImage(id, formData);
            alert("Brand image updated successfully!");
            router.push('/beranda/display/brand-story');
            router.refresh();
        } catch (error) {
            console.error("Failed to update brand image:", error);
            alert("Failed to update brand image. Please see console for details.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <p className="text-gray-500 animate-pulse text-xs uppercase tracking-widest">Loading...</p>
            </div>
        );
    }

    if (!data) return null;

    return (
        <div className="space-y-6">
            <BreadCrumbs
                items={breadcrumbItems}
                title="Edit Brand Image"
                description="Update the brand story image."
            />

            <section className="rounded-2xl border border-[#E9D6C6] bg-white p-6 shadow-sm max-w-9xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Brand Image
                        </label>
                        <div className="flex flex-col gap-4">
                            <div className="relative h-[450px] w-1/2 mx-auto overflow-hidden rounded-xl border border-dashed border-[#E0D4C6] bg-gray-50 flex items-center justify-center">
                                {previewUrl ? (
                                    <Image
                                        src={previewUrl}
                                        alt="Preview"
                                        fill
                                        className="object-cover"
                                        unoptimized
                                    />
                                ) : (
                                    <span className="text-gray-400 text-sm">No image available</span>
                                )}
                            </div>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageChange(e.target.files?.[0] ?? null)}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#7A3E2C] file:text-white hover:file:bg-[#5C2D20] transition cursor-pointer"
                            />
                            <p className="text-[11px] text-gray-400">
                                Upload a new image to replace the current one.
                            </p>
                        </div>
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
                            {isSubmitting ? 'Saving Changes...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
}
