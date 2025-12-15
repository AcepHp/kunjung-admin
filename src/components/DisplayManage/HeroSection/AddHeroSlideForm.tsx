'use client';

import { FormEvent, useState } from 'react';

export default function AddHeroSlideForm() {
    const [villaName, setVillaName] = useState('');
    const [villaSubtitle, setVillaSubtitle] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [status, setStatus] = useState<'active' | 'inactive'>('active');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // Placeholder, belum ada logic simpan beneran
        console.log({
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
                        Add Hero Slide
                    </h2>
                    <p className="mt-1 text-xs sm:text-sm text-gray-500">
                        Create a new hero slide for the homepage.
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

                {/* Image upload (full width, tanpa alt text) */}
                <div>
                    <label className="block text-xs font-medium text-gray-600">
                        Hero Image (Upload)
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
                        Save Slide
                    </button>
                </div>
            </form>
        </section>
    );
}
