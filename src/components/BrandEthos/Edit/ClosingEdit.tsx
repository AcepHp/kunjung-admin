'use client';

import React from 'react';

type Props = {
    label: string;
    setLabel: (val: string) => void;
    text: string;
    setText: (val: string) => void;
    onSave: () => void;
    onCancel: () => void;
    isSubmitting?: boolean;
};

export default function ClosingEdit({ label, setLabel, text, setText, onSave, onCancel, isSubmitting = false }: Props) {
    return (
        <div id="closing" className="mx-auto max-w-9xl space-y-8">
            <div className="bg-white rounded-3xl border border-[#E9D6C6] overflow-hidden shadow-sm">
                <div className="px-8 py-5 bg-[#FAF4EC] border-b border-[#E9D6C6] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#7A3E2C] flex items-center justify-center text-white font-bold text-xs">07</div>
                        <h3 className="font-serif font-bold text-[#1E1E1E]">Closing Statement</h3>
                    </div>
                </div>
                <div className="p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold tracking-widest text-[#8B6F56] uppercase">Label</label>
                            <input
                                value={label}
                                onChange={(e) => setLabel(e.target.value)}
                                className="w-full rounded-xl border border-[#E0D4C6] px-4 py-3 text-sm focus:ring-2 focus:ring-[#7A3E2C] outline-none"
                                placeholder="e.g. Attentive Services"
                                disabled={isSubmitting}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold tracking-widest text-[#8B6F56] uppercase">Statement Text</label>
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                className="w-full rounded-xl border border-[#E0D4C6] px-4 py-3 text-sm h-24 resize-none focus:ring-2 focus:ring-[#7A3E2C] outline-none"
                                placeholder="The final message..."
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>
                </div>
                <div className="p-8 flex items-center justify-end gap-3">
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
