'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { PhotoIcon } from '@heroicons/react/24/outline';

type Props = {
    content: string;
    setContent: (val: string) => void;
    image: { url: string; alt: string };
    setImage: (val: { url: string; alt: string }) => void;
    onSave: () => void;
    onCancel: () => void;
};

export default function FoundersStoryEdit({ content, setContent, image, setImage, onSave, onCancel }: Props) {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage({ ...image, url: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div id="founders" className="mx-auto max-w-9xl bg-white rounded-3xl border border-[#E9D6C6] overflow-hidden shadow-sm">
            <div className="px-8 py-5 bg-[#FAF4EC] border-b border-[#E9D6C6] flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#7A3E2C] flex items-center justify-center text-white font-bold text-xs">03</div>
                    <h3 className="font-serif font-bold text-[#1E1E1E]">Founders' Legacy</h3>
                </div>
            </div>
            <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* LEFT: Forms */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold tracking-widest text-[#8B6F56] uppercase">Detailed Background Story</label>
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="w-full rounded-xl border border-[#E0D4C6] px-4 py-3 text-sm h-64 resize-none focus:ring-2 focus:ring-[#7A3E2C] focus:border-transparent transition-all outline-none leading-relaxed"
                                placeholder="Tell the founders' story..."
                            />
                        </div>

                        <div className="space-y-2 pt-2">
                            <label className="block text-xs font-bold tracking-widest text-[#8B6F56] uppercase">
                                Replace Legacy Image
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="block w-full cursor-pointer rounded-xl border border-[#E0D4C6] bg-white px-3 py-2 text-sm text-gray-700 file:mr-4 file:rounded-lg file:border-0 file:bg-[#7A3E2C] file:px-4 file:py-2 file:text-xs file:font-bold file:uppercase file:tracking-widest file:text-white hover:file:bg-[#5C2D20] transition-all"
                            />
                            <p className="mt-1 text-[11px] text-gray-400">
                                Best with portrait orientation. JPG or PNG allowed.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="text-xs font-bold tracking-widest text-[#8B6F56] uppercase">Legacy Image Preview</label>
                        <div className="relative aspect-video w-full max-w-full mx-auto overflow-hidden rounded-2xl border border-[#E9D6C6] bg-[#FAF4EC] shadow-inner group">
                            {image.url ? (
                                <>
                                    <Image
                                        src={image.url}
                                        alt={image.alt}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        unoptimized={image.url.startsWith('data:')}
                                    />
                                    <div className="absolute inset-0 bg-black/10 group-hover:opacity-0 transition-opacity" />
                                </>
                            ) : (
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-[#7A3E2C]/30 gap-3">
                                    <PhotoIcon className="h-16 w-16" />
                                    <span className="text-xs font-bold uppercase tracking-[0.2em]">No Vision</span>
                                </div>
                            )}
                        </div>
                        <p className="text-[11px] text-gray-400 italic text-center text-balance">
                            Preview reflects the legacy presentation on the live site.
                        </p>
                    </div>
                </div>

                {/* Integrated Buttons - Matching Dashboard Standard */}
                <div className="flex items-center justify-end gap-3 border-t border-[#FAF4EC] mt-12 pt-10">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="rounded-full border border-[#E0D4C6] px-6 py-2.5 text-xs font-bold text-gray-500 hover:bg-gray-50 transition-all uppercase tracking-widest"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={onSave}
                        className="rounded-full bg-[#7A3E2C] px-8 py-2.5 text-xs font-bold text-white shadow-lg shadow-[#7A3E2C]/20 hover:bg-[#5C2D20] transition-all uppercase tracking-widest"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}
