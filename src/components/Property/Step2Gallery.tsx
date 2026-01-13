'use client';

import React from 'react';
import { PhotoIcon } from '@heroicons/react/24/outline';

interface Step2GalleryProps {
    formData: any;
    mainPreview: string | null;
    descPreviews: (string | null)[];
    handleMainImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleDescImageChange: (index: number, e: React.ChangeEvent<HTMLInputElement>) => void;
    removeMainImage: () => void;
    removeDescImage: (index: number) => void;
    addDetail: () => void;
    removeDetail: (index: number) => void;
    handleDetailChange: (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleDetailImageChange: (detailIndex: number, e: React.ChangeEvent<HTMLInputElement>) => void;
    removeDetailImage: (detailIndex: number, imageIndex: number) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export default function Step2Gallery({
    formData,
    mainPreview,
    descPreviews,
    handleMainImageChange,
    handleDescImageChange,
    removeMainImage,
    removeDescImage,
    addDetail,
    removeDetail,
    handleDetailChange,
    handleDetailImageChange,
    removeDetailImage,
    handleChange
}: Step2GalleryProps) {
    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-serif font-bold text-[#1E1E1E]">Gallery & Story Details</h2>
                <p className="text-gray-500 mt-2">Upload visual assets and define additional property stories.</p>
            </div>

            {/* Main Image Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-[#FAF4EC]/20 p-8 rounded-3xl border border-[#E9D6C6]/40">
                <div className="space-y-6">
                    <h3 className="text-xl font-serif font-bold text-[#1E1E1E]">Main Cover Image</h3>
                    <p className="text-sm text-gray-500">Primary display image (16:9 ratio recommended).</p>
                    <div className="space-y-4 pt-4 border-t border-[#EFE3D7]">
                        <label className="block text-xs font-bold tracking-widest text-[#8B6F56] uppercase">
                            {mainPreview ? 'Change Image' : 'Select Hero Image'}
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleMainImageChange}
                            className="block w-full cursor-pointer rounded-xl border border-[#7A3E2C] bg-white px-3 py-2.5 text-sm"
                        />
                        {mainPreview && (
                            <button type="button" onClick={removeMainImage} className="text-xs font-bold text-red-500 uppercase tracking-widest hover:text-red-700">Remove Image</button>
                        )}
                    </div>
                </div>
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-[#7A3E2C] bg-white">
                    {mainPreview ? (
                        <img src={mainPreview} alt="Hero" className="h-full w-full object-cover" />
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-[#7A3E2C]/20 bg-[#FAF8F6]">
                            <PhotoIcon className="h-10 w-10" />
                            <span className="text-[10px] uppercase font-bold mt-2">No Image</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Description Gallery */}
            <div className="space-y-6">
                <div className="border-b border-[#EFE3D7] pb-2">
                    <h3 className="text-lg font-serif font-bold text-[#1E1E1E]">Description Gallery (3 Items)</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-auto md:h-[450px]">
                    <div className="md:col-span-2 relative">
                        {descPreviews[0] ? (
                            <div className="relative group h-full rounded-2xl overflow-hidden border border-[#7A3E2C]">
                                <img src={descPreviews[0]!} className="h-full w-full object-cover" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2">
                                    <label className="cursor-pointer bg-white text-[#7A3E2C] px-3 py-1.5 rounded-full text-xs font-bold">Change
                                        <input type="file" className="sr-only" onChange={(e) => handleDescImageChange(0, e)} accept="image/*" />
                                    </label>
                                    <button type="button" onClick={() => removeDescImage(0)} className="bg-red-500 text-white px-3 py-1.5 rounded-full text-xs font-bold">Remove</button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex h-full items-center justify-center rounded-2xl border-2 border-dashed border-[#7A3E2C] bg-white hover:bg-[#FAF4EC] transition-colors relative">
                                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleDescImageChange(0, e)} accept="image/*" />
                                <div className="text-center">
                                    <PhotoIcon className="h-8 w-8 text-[#7A3E2C] mx-auto" />
                                    <span className="text-xs font-bold text-[#7A3E2C] mt-2 block">Upload Image 1</span>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="grid grid-rows-2 gap-4">
                        {[1, 2].map(idx => (
                            <div key={idx} className="relative">
                                {descPreviews[idx] ? (
                                    <div className="relative group h-full rounded-xl overflow-hidden border border-[#7A3E2C]">
                                        <img src={descPreviews[idx]!} className="h-full w-full object-cover" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2">
                                            <label className="cursor-pointer bg-white text-[#7A3E2C] px-2 py-1 rounded-full text-[10px] font-bold">Change
                                                <input type="file" className="sr-only" onChange={(e) => handleDescImageChange(idx, e)} accept="image/*" />
                                            </label>
                                            <button type="button" onClick={() => removeDescImage(idx)} className="bg-red-500 text-white px-2 py-1 rounded-full text-[10px] font-bold">Remove</button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex h-full items-center justify-center rounded-xl border-2 border-dashed border-[#7A3E2C] bg-white hover:bg-[#FAF4EC] transition-colors relative">
                                        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleDescImageChange(idx, e)} accept="image/*" />
                                        <PhotoIcon className="h-6 w-6 text-[#7A3E2C]" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <hr className="border-[#EFE3D7]/60" />

            {/* Additional Story Details */}
            <div className="space-y-8">
                <div className="flex items-center justify-between border-b border-[#EFE3D7] pb-2">
                    <h3 className="text-xl font-serif font-bold text-[#1E1E1E]">Additional Story Details</h3>
                    <button type="button" onClick={addDetail} className="text-xs font-bold text-[#7A3E2C] uppercase tracking-widest bg-[#FAF4EC] px-4 py-2 rounded-full border border-[#E9D6C6]">+ Add Detail</button>
                </div>

                <div className="space-y-2">
                    <label className="block text-xs font-bold text-[#8B6F56] uppercase tracking-widest">Story Intro / Header</label>
                    <textarea
                        name="detailHeader"
                        rows={2}
                        value={formData.detailHeader}
                        onChange={handleChange}
                        placeholder="Provide a brief introduction or catchphrase for the story details below..."
                        className="mt-1 block w-full rounded-xl border border-[#7A3E2C] bg-white px-4 py-3 text-[#1E1E1E] sm:text-sm shadow-sm focus:ring-1 focus:ring-[#7A3E2C] outline-none transition-all placeholder:text-gray-400"
                    />
                </div>
                <div className="space-y-12">
                    {formData.details.map((detail: any, index: number) => (
                        <div key={index} className="relative bg-white border border-[#E9D6C6]/60 p-8 rounded-3xl space-y-8 group transition-all hover:border-[#7A3E2C]/30 shadow-sm">
                            {formData.details.length > 1 && (
                                <button type="button" onClick={() => removeDetail(index)} className="absolute -top-3 -right-3 h-8 w-8 flex items-center justify-center rounded-full bg-red-100 text-red-600 border border-red-200 opacity-0 group-hover:opacity-100 transition-opacity">×</button>
                            )}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <input type="text" name="title" value={detail.title} onChange={(e) => handleDetailChange(index, e)} placeholder="Detail Title" className="block w-full rounded-xl border border-[#7A3E2C] px-4 py-2 text-sm focus:ring-[#7A3E2C]" />
                                    <textarea name="description" rows={4} value={detail.description} onChange={(e) => handleDetailChange(index, e)} placeholder="Detail Description" className="block w-full rounded-xl border border-[#7A3E2C] px-4 py-2 text-sm focus:ring-[#7A3E2C]" />
                                </div>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-3 gap-2">
                                        <div className="aspect-square rounded-xl border-2 border-dashed border-[#7A3E2C]/30 bg-[#FAF8F6] flex items-center justify-center relative cursor-pointer">
                                            <input type="file" multiple accept="image/*" onChange={(e) => handleDetailImageChange(index, e)} className="absolute inset-0 opacity-0" />
                                            <PhotoIcon className="h-6 w-6 text-[#7A3E2C]" />
                                        </div>
                                        {detail.images.map((img: string, i: number) => (
                                            <div key={i} className="relative aspect-square rounded-xl border border-[#E9D6C6] overflow-hidden group/img">
                                                <img src={img} className="h-full w-full object-cover" />
                                                <button type="button" onClick={() => removeDetailImage(index, i)} className="absolute inset-0 bg-red-500/80 text-white opacity-0 group-hover/img:opacity-100 flex items-center justify-center font-bold">×</button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
