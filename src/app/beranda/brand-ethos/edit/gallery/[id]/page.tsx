'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect, use } from 'react';
import BreadCrumbs, { BreadCrumbItem } from '@/components/Common/Breadcrumbs';
import { getImmersiveGallery, updateImmersiveGalleryImage, deleteImmersiveGalleryImage } from '@/services/BrandEthosService';
import Image from 'next/image';
import { ArrowPathIcon, TrashIcon } from '@heroicons/react/24/outline';
import BrandEthosFormSkeleton from '@/components/BrandEthos/BrandEthosFormSkeleton';

type ImageItem = { id: string; url: string; alt?: string };

export default function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [image, setImage] = useState<ImageItem | null>(null);
    const [newFile, setNewFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const galleryData = await getImmersiveGallery();
                const targetImage = galleryData.find(img => img.id === id);
                if (targetImage) {
                    setImage({ id: targetImage.id!, url: targetImage.imageUrl, alt: 'Gallery Image' });
                } else {
                    alert('Image not found');
                    router.push('/beranda/brand-ethos');
                }
            } catch (error) {
                console.error('Failed to fetch gallery:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id, router]);

    const breadcrumbItems: BreadCrumbItem[] = [
        { name: 'Home', href: '/beranda' },
        { name: 'Brand Ethos', href: '/beranda/brand-ethos' },
        { name: 'Edit Moment', disabled: true },
    ];

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
                setNewFile(file);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async () => {
        if (!image) return;
        setSaving(true);

        try {
            if (newFile) {
                await updateImmersiveGalleryImage(image.id, newFile);
            }
            router.push('/beranda/brand-ethos');
        } catch (error) {
            console.error('Failed to update image:', error);
            alert('Failed to update image');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!image) return;
        if (!confirm('Are you sure you want to delete this moment?')) return;
        setSaving(true);
        try {
            await deleteImmersiveGalleryImage(image.id);
            router.push('/beranda/brand-ethos');
        } catch (error) {
            console.error('Failed to delete image:', error);
            alert('Failed to delete image');
            setSaving(false);
        }
    };

    if (loading) return <BrandEthosFormSkeleton />;
    if (!image) return null;

    return (
        <div className="space-y-6">
            <BreadCrumbs
                items={breadcrumbItems}
                title="Edit Moment"
                description="Update or remove this specific moment from your gallery."
            />

            <div className="mx-auto max-w-9xl space-y-8">
                <div className="bg-white rounded-3xl border border-[#E9D6C6] overflow-hidden shadow-sm">
                    <div className="px-8 py-5 bg-[#FAF4EC] border-b border-[#E9D6C6] flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <h3 className="font-serif font-bold text-[#1E1E1E]">Selected Moment</h3>
                        </div>
                        {/* Integrated Delete Button in Header for clean UI */}
                        
                    </div>

                    <div className="p-12 flex flex-col items-center gap-8">
                        <div className="relative aspect-[4/3] w-full max-w-3xl rounded-2xl overflow-hidden border border-[#E9D6C6] bg-[#FAF4EC] shadow-sm group">
                            <Image
                                src={previewUrl || image.url}
                                alt="Gallery image"
                                fill
                                className="object-cover"
                                unoptimized={(previewUrl || image.url).startsWith('data:')}
                            />

                            {/* Overlay */}
                            <div className={`absolute inset-0 bg-black/40 ${saving ? 'opacity-100 bg-black/60' : 'opacity-0 group-hover:opacity-100'} transition-all flex items-center justify-center backdrop-blur-[2px]`}>
                                {saving ? (
                                    <div className="flex flex-col items-center gap-3 text-white">
                                        <svg className="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span className="text-sm font-bold tracking-widest uppercase">Processing...</span>
                                    </div>
                                ) : (
                                    <label className="cursor-pointer flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-[#7A3E2C] shadow-lg hover:bg-[#7A3E2C] hover:text-white transition-all transform translate-y-2 group-hover:translate-y-0">
                                        <ArrowPathIcon className="h-5 w-5" />
                                        REPLACE IMAGE
                                        <input
                                            type="file"
                                            onChange={handleFileChange}
                                            accept="image/*"
                                            className="hidden"
                                        />
                                    </label>
                                )}
                            </div>
                        </div>

                        <div className="text-center max-w-md">
                            <p className="text-sm text-gray-500">
                                Hover over the image to replace it. Changes will be reflected immediately after saving.
                            </p>
                        </div>
                    </div>

                    <div className="p-8 bg-gray-50 border-t border-[#E9D6C6] flex items-center justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => router.push('/beranda/brand-ethos')}
                            disabled={saving}
                            className="rounded-full border border-[#E0D4C6] px-6 py-2.5 text-xs font-bold text-gray-500 hover:bg-white transition-all uppercase tracking-widest disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleSave}
                            disabled={!newFile || saving}
                            className={`rounded-full px-8 py-2.5 text-xs font-bold text-white shadow-lg transition-all uppercase tracking-widest flex items-center gap-2 ${newFile && !saving
                                ? 'bg-[#7A3E2C] shadow-[#7A3E2C]/20 hover:bg-[#5C2D20]'
                                : 'bg-gray-300 cursor-not-allowed'
                                }`}
                        >
                            {saving ? (
                                <>
                                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Saving...
                                </>
                            ) : (
                                'Save Changes'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
