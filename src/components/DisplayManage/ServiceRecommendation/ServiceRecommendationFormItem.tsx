'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { PhotoIcon } from '@heroicons/react/24/outline';

type Props = {
    index: number;
    initialTitle?: string;
    initialSubtitle?: string;
    initialImageUrl?: string;
    onChange: (data: { title: string; subtitle: string; imageFile: File | null }) => void;
};

export default function ServiceRecommendationFormItem({ index, initialTitle = '', initialSubtitle = '', initialImageUrl = '', onChange }: Props) {
    const [title, setTitle] = useState(initialTitle);
    const [subtitle, setSubtitle] = useState(initialSubtitle);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>(
        initialImageUrl ? (initialImageUrl.startsWith('http') ? initialImageUrl : `/${initialImageUrl}`) : ''
    );

    useEffect(() => {
        onChange({ title, subtitle, imageFile });
    }, [title, subtitle, imageFile]);

    const handleFileChange = (file?: File) => {
        if (!file) return;
        setImageFile(file);
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
    };

    return (
        <div className="rounded-2xl border border-[#E9D6C6] bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-[#7A3E2C] flex items-center justify-center text-white font-bold text-xs">
                    {String(index).padStart(2, '0')}
                </div>
                <h3 className="font-serif font-bold text-[#1E1E1E]">Service Recommendation {index}</h3>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {/* LEFT: FORM */}
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold tracking-widest text-[#8B6F56] uppercase">
                            Service Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full rounded-xl border border-[#E0D4C6] px-4 py-3 text-sm focus:ring-2 focus:ring-[#7A3E2C] focus:border-transparent transition-all outline-none"
                            placeholder="e.g., Stays, Events, Shoots"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold tracking-widest text-[#8B6F56] uppercase">
                            Service Subtitle
                        </label>
                        <input
                            type="text"
                            value={subtitle}
                            onChange={(e) => setSubtitle(e.target.value)}
                            className="w-full rounded-xl border border-[#E0D4C6] px-4 py-3 text-sm focus:ring-2 focus:ring-[#7A3E2C] focus:border-transparent transition-all outline-none"
                            placeholder="e.g., Silas House, Pool Area"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold tracking-widest text-[#8B6F56] uppercase">
                            Recommendation Image
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileChange(e.target.files?.[0])}
                            className="block w-full cursor-pointer rounded-xl border border-[#E0D4C6] bg-white px-3 py-2 text-sm text-gray-700 file:mr-4 file:rounded-lg file:border-0 file:bg-[#F7EBE1] file:px-4 file:py-2 file:text-xs file:font-bold file:uppercase file:tracking-widest file:text-[#7A3E2C] hover:file:bg-[#EBD9CA] transition-all"
                            required={!initialImageUrl}
                        />
                    </div>
                </div>

                {/* RIGHT: PREVIEW */}
                <div className="space-y-3">
                    <label className="text-xs font-bold tracking-widest text-[#8B6F56] uppercase">Preview</label>
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-[#E9D6C6] bg-[#FAF4EC] shadow-inner group">
                        {preview ? (
                            <Image
                                src={preview}
                                alt={title || 'Preview'}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="flex h-full flex-col items-center justify-center text-[#7A3E2C]/30 gap-2">
                                <PhotoIcon className="h-10 w-10 text-[#7A3E2C]/20" />
                                <span className="text-[10px] font-bold uppercase tracking-widest">No Image</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
