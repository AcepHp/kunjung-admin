'use client';

import React from 'react';

type Props = {
    label: string;
    setLabel: (val: string) => void;
    title: string;
    setTitle: (val: string) => void;
    subtitle: string;
    setSubtitle: (val: string) => void;
    description: string;
    setDescription: (val: string) => void;
    corePrinciples: string[];
    setCorePrinciples: (val: string[]) => void;
    onSave: () => void;
    onCancel: () => void;
    isSubmitting?: boolean;
};

export default function IntroductionEdit({
    label, setLabel,
    title, setTitle,
    subtitle, setSubtitle,
    description, setDescription,
    corePrinciples, setCorePrinciples,
    onSave, onCancel,
    isSubmitting = false
}: Props) {
    const handlePrincipleChange = (index: number, value: string) => {
        const newPrinciples = [...corePrinciples];
        newPrinciples[index] = value;
        setCorePrinciples(newPrinciples);
    };

    return (
        <div id="introduction" className="mx-auto max-w-9xl bg-white rounded-3xl border border-[#E9D6C6] overflow-hidden shadow-sm">
            <div className="px-8 py-5 bg-[#FAF4EC] border-b border-[#E9D6C6] flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#7A3E2C] flex items-center justify-center text-white font-bold text-xs">02</div>
                    <h3 className="font-serif font-bold text-[#1E1E1E]">Brand Introduction</h3>
                </div>
            </div>
            <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                    {/* Column 1 */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold tracking-widest text-[#8B6F56] uppercase">Introduction Label</label>
                            <input
                                value={label}
                                onChange={(e) => setLabel(e.target.value)}
                                className="w-full rounded-xl border border-[#E0D4C6] px-4 py-3 text-sm focus:ring-2 focus:ring-[#7A3E2C] focus:border-transparent transition-all outline-none"
                                placeholder="e.g. KUNJUNG Family"
                                disabled={isSubmitting}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold tracking-widest text-[#8B6F56] uppercase">Main Title</label>
                            <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full rounded-xl border border-[#E0D4C6] px-4 py-3 text-sm focus:ring-2 focus:ring-[#7A3E2C] focus:border-transparent transition-all outline-none font-bold"
                                placeholder="Enter headline..."
                                disabled={isSubmitting}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold tracking-widest text-[#8B6F56] uppercase">Supporting Subtitle</label>
                            <input
                                value={subtitle}
                                onChange={(e) => setSubtitle(e.target.value)}
                                className="w-full rounded-xl border border-[#E0D4C6] px-4 py-3 text-sm focus:ring-2 focus:ring-[#7A3E2C] focus:border-transparent transition-all outline-none italic"
                                placeholder="Enter subtitle..."
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>

                    {/* Column 2 */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold tracking-widest text-[#8B6F56] uppercase">Detailed Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full rounded-xl border border-[#E0D4C6] px-4 py-3 text-sm h-40 resize-none focus:ring-2 focus:ring-[#7A3E2C] focus:border-transparent transition-all outline-none leading-relaxed"
                                placeholder="Enter description..."
                                disabled={isSubmitting}
                            />
                        </div>
                        <div className="space-y-3 pt-2">
                            <label className="block text-xs font-bold tracking-widest text-[#8B6F56] uppercase">Core Principles</label>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {corePrinciples.map((principle, idx) => (
                                    <input
                                        key={idx}
                                        value={principle}
                                        onChange={(e) => handlePrincipleChange(idx, e.target.value)}
                                        className="w-full rounded-xl border border-[#E0D4C6] px-4 py-2.5 text-xs focus:ring-2 focus:ring-[#7A3E2C] focus:border-transparent transition-all outline-none italic font-serif"
                                        placeholder={`Principle ${idx + 1}`}
                                        disabled={isSubmitting}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Integrated Buttons - Matching HeroEdit style */}
                <div className="flex items-center justify-end gap-3 border-t border-[#FAF4EC] mt-12 pt-10">
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={isSubmitting}
                        className="rounded-full border border-[#E0D4C6] px-6 py-2.5 text-xs font-bold text-gray-500 hover:bg-gray-50 transition-all uppercase tracking-widest disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={onSave}
                        disabled={isSubmitting}
                        className="rounded-full bg-[#7A3E2C] px-8 py-2.5 text-xs font-bold text-white shadow-lg shadow-[#7A3E2C]/20 hover:bg-[#5C2D20] transition-all uppercase tracking-widest disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isSubmitting ? (
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
    );
}
